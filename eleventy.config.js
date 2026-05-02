import htmlmin from "html-minifier-terser";
import { minify } from "terser";
import path from "node:path";
import * as sass from "sass";

export default function (eleventyConfig) {
    const isBuildMode = process.env.ELEVENTY_RUN_MODE === "build";

    eleventyConfig.setInputDirectory("src");
    eleventyConfig.setIncludesDirectory("markup");
    eleventyConfig.setOutputDirectory("dist");
    eleventyConfig.setTemplateFormats(["html", "scss", "js"]);

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
            compile: async function (inputContent) {
                const result = await minify(inputContent);

                return async () => result.code;
            },
        });
    }

    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        useLayouts: false,
        compile: async function (inputContent, inputPath) {
            const parsed = path.parse(inputPath);

            if (parsed.name.startsWith("_")) return;

            const result = sass.compileString(inputContent, {
                loadPaths: [parsed.dir],
                style: isBuildMode ? "compressed" : "expanded",
            });

            this.addDependencies(inputPath, result.loadedUrls);

            return async () => result.css;
        },
    });
}
