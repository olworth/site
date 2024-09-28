const puncRe = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
const emailRe = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
const httpHttpsRe = /^https?:\/\/.*$/;
const wwwRe = /^www\./;
const tldRe = /\.(?:org|net|com)(?:\:|\/|$)/;
const shortRe = /\[(.*?)\]\((https?:\/\/[^\s]+)\)([.,;!?]?)$/;
// Gallery of Old Regexes:
  // /\[(.*?)\]\((https?:\/\/[^\s]+)\)$/
  // /\[(.*?)\](https?:\/\/[^\s]+)/g

function shortUrl_urlize(str, length, nofollow) {
// An altered version of the default Nunjucks urlize filter
// Permits a pre-defined shortUrl if url is in the format [shortUrl]https://www.example.com
  if (isNaN(length)) {
    length = Infinity;
  }

  const noFollowAttr = (nofollow === true ? ' rel="nofollow"' : '');
  
  const segments = str.match(/(?:\[[^\]]+\]\s*\(https?:\/\/[^\s]+\)(?:[.,;!?]?)|[^\s]+)/g) || [];
  // Gallery of Old Regexes:
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
    if (tldRe.test(possibleUrl)) {
      return `<a href="http://${possibleUrl}"${noFollowAttr}>${shortUrl}</a>${trailingPunctuation}`;
    }

    return word;
  });

  return words.join(' ');
}

module.exports = shortUrl_urlize;