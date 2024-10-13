const httpRe = /^(https?:\/\/)(.*)$/;
const mailRe = /^(mailto:)(.*)$/;

function clipUrlize(str) {
// A function for clipping URLs, for example "https://example.com" > "example.com"
// Currently only works with the prefixes "http(s)://" and "mailto:"
    var httpMatch = httpRe.exec(str);
    var mailMatch = mailRe.exec(str);
    if (httpMatch) {
        return httpMatch[2];
    }
    if (mailMatch) {
        return mailMatch[2];
    }
}

module.exports = clipUrlize;