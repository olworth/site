const puncRe = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
const emailRe = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
const httpHttpsRe = /^https?:\/\/.*$/;
const wwwRe = /^www\./;
const tldRe = /\.(?:org|net|com|pdf)(?:\:|\/|$)/;
const internalRe = /^\/.*$/; 
const shortRe = /\[(.*?)\]\((https?:\/\/[^\s]+|\/[^\s]+)\)([.,;!?]?)$/; 
// Gallery of Old Regexes:
    // /\[(.*?)\]\((https?:\/\/[^\s]+)\)([.,;!?]?)$/
    // /\[(.*?)\]\((https?:\/\/[^\s]+)\)$/
    // /\[(.*?)\](https?:\/\/[^\s]+)/g

function shortUrlize(str, length, nofollow) {
// An altered version of the default Nunjucks urlize filter made for ohepworth.com; it works more effectively with .json files, .md frontmatter, etc.
// Permits a pre-defined shortUrl if url is in the format [shortUrl](https://www.example.com)
// Also allows punctuation to trail this url, as in [shortUrl](https://www.example.com).
// Also allows internal urls, as well as internal urls in the shortUrl format
    if (isNaN(length)) {
        length = Infinity;
    }

    const noFollowAttr = (nofollow === true ? ' rel="nofollow"' : '');
  
    const segments = str.match(/(?:\[[^\]]+\]\s*\(https?:\/\/[^\s]+\)(?:[.,;!?]?)|(?:\[[^\]]+\]\s*\(\/[^\s]+\)(?:[.,;!?]?)|[^\s]+))/g) || [];
    // Gallery of Old Regexes:
        // /(?:\[[^\]]+\]\s*\(https?:\/\/[^\s]+\)(?:[.,;!?]?)|[^\s]+)/g
        // /(?:\[[^\]]+\]\s*\(https?:\/\/[^\s]+\)|[^\s]+)/g
        // /(?:\[[^\]]+\]\s*https?:\/\/[^\s]+|[^\s]+)/g

    const words = segments.map((word) => {
        var matches = word.match(puncRe);
        var possibleUrl = (matches) ? matches[1] : word;
        var shortUrl = possibleUrl.substr(0, length);
        var shortMatches = shortRe.exec(word);

        if (shortMatches) {
            shortUrl = shortMatches[1];
            possibleUrl = shortMatches[2];
            trailingPunctuation = shortMatches[3] || '';
        }

        // URL that starts with http or https
        if (httpHttpsRe.test(possibleUrl)) {
            return `<a href="${possibleUrl}"${noFollowAttr}>${shortUrl}</a>${trailingPunctuation}`;
        }

        // URL that starts with www.
        if (wwwRe.test(possibleUrl)) {
            return `<a href="http://${possibleUrl}"${noFollowAttr}>${shortUrl}</a>${trailingPunctuation}`;
        }

        // An email address of the form username@domain.tld
        if (emailRe.test(possibleUrl)) {
            return `<a href="mailto:${possibleUrl}">${possibleUrl}</a>${trailingPunctuation}`;
        }

        // URL that ends in .com, .org, or .net that is not an email address
        // Also added .pdf
        if (tldRe.test(possibleUrl)) {
            return `<a href="http://${possibleUrl}"${noFollowAttr}>${shortUrl}</a>${trailingPunctuation}`;
        }

        // Internal URL, as in /projects/site/index.html
        if (internalRe.test(possibleUrl)) {
            return `<a href="${possibleUrl}"${noFollowAttr}>${shortUrl}</a>${trailingPunctuation}`;
        }

        return word;
    });

    return words.join(' ');
}

module.exports = shortUrlize;