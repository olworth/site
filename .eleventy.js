const path = require("path");
const prettier = require("prettier");

module.exports = function(eleventyConfig) {
    eleventyConfig.setNunjucksEnvironmentOptions({
    // Set Nunjucks options if wanted
        trimBlocks: false,
        lstripBlocks: false,
    });
    eleventyConfig.addTransform("prettier", function(content, outputPath) {
    // Prettify output HTML with prettier. 
    // I like pretty things more than fast things.
        const extension = path.extname(outputPath);
        switch (extension) {
            case ".html":
                const parser = "html"
                return prettier.format(content, { parser });
            default:
                return content;
        }
    });
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
