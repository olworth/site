const path = require("path");
const prettier = require("prettier");
const shortUrlize = require('./src/filters/shortUrlize.js');
const initialCaps = require('./src/filters/initialCaps.js');

module.exports = function(eleventyConfig) {
    // Set Nunjucks options if wanted
    eleventyConfig.setNunjucksEnvironmentOptions({
        trimBlocks: false,
        lstripBlocks: false
    });
    // Add collections
    eleventyConfig.addCollection("projects", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/projects/*.md");
    });
    // Add passthrough copies
    eleventyConfig.addPassthroughCopy("./src/downloads/");
    // Add transforms
    eleventyConfig.addTransform("prettier", function(content, outputPath) {
    // Prettify output HTML with prettier 
    // I like pretty things more than fast things
        const extension = path.extname(outputPath);
        switch (extension) {
            case ".html":
                const parser = "html"
                return prettier.format(content, { parser });
            default:
                return content;
        }
    });
    // Add filters
    eleventyConfig.addFilter('shortUrlize', shortUrlize);
    eleventyConfig.addFilter('initialCaps', initialCaps);
    return {
        // Nunjucks
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',

        // I/O
        dir: {
            input: 'src',
            output: 'dist'
        }
    };
};
