import htmlmin from "html-minifier-terser";
import { minify } from "terser";
import path from "node:path";
import * as sass from "sass";
import { mkdir, writeFile, rm } from "node:fs/promises";

export default function (eleventyConfig) {
    const isBuildMode = process.env.ELEVENTY_RUN_MODE === "build";

    eleventyConfig.setInputDirectory("src");
    eleventyConfig.setDataDirectory("data");
    eleventyConfig.setLayoutsDirectory("layouts");
    eleventyConfig.setIncludesDirectory("markup");
    eleventyConfig.setOutputDirectory("dist");
    eleventyConfig.setTemplateFormats(["liquid", "scss", "js"]);

    eleventyConfig.setLiquidOptions({ extname: ".liquid" });

    eleventyConfig.ignores.add("src/libs");

    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/libs");
    eleventyConfig.addPassthroughCopy("src/media");
    eleventyConfig.addPassthroughCopy("src/favicon.*");

    if (isBuildMode) {
        eleventyConfig.addTransform("htmlmin", function (content) {
            if ((this.page.outputPath || "").endsWith(".html")) {
                const minified = htmlmin.minify(content, {
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                    useShortDoctype: true,
                });

                return minified;
            }

            return content;
        });

        eleventyConfig.addExtension("js", {
            outputFileExtension: "js",
            useLayouts: false,
            async compile(inputContent) {
                const result = await minify(inputContent);

                return async () => result.code;
            },
        });
    }

    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        useLayouts: false,
        async compile(inputContent, inputPath) {
            const parsed = path.parse(inputPath);

            if (parsed.name.startsWith("_")) return;

            const result = sass.compileString(inputContent, {
                loadPaths: [parsed.dir],
                style: isBuildMode ? "compressed" : "expanded",
                sourceMap: !isBuildMode,
                sourceMapIncludeSources: !isBuildMode,
            });

            this.addDependencies(inputPath, result.loadedUrls);

            const stylesFolder = path.join(
                this.config.directories.output,
                "styles"
            );
            const mapFile = `${parsed.name}.css.map`;
            const mapPath = path.join(stylesFolder, mapFile);

            return async () => {
                if (isBuildMode) {
                    await rm(mapPath, { force: true });

                    return result.css;
                }

                await mkdir(stylesFolder, { recursive: true });
                await writeFile(mapPath, JSON.stringify(result.sourceMap));

                return `${result.css}\n/*# sourceMappingURL=${mapFile} */`;
            };
        },
    });
}
