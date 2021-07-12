const removeFirstAndLastSlashes = require('../utils/removeFirstAndLastSlashes');
const getPageHTMLContent = require('./getPageHTMLContent');

const scriptRegExp = /<\s*script[^>]*src\s*=("|')(.*?)(\1).*?>.*?<\s*?\/\s*?script\s*?>/gi
const linkRegExp = /<\s*link[^>]*href\s*=("|')(.*?)(\1).*?\/?>/gi
const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i

module.exports = function jsExtractor(address){
    return getPageHTMLContent(address).then((res)=>{
        const jsFileURLs = [];

        const matchResults = res.matchAll(scriptRegExp);
        const linkMatchResults = res.matchAll(linkRegExp);

        const allMatches = [...matchResults, ...linkMatchResults];

        for(const match of allMatches){
            const jsURL = match[2];

            if(urlRegExp.test(jsURL)) {
                jsFileURLs.push(jsURL);
            } else {
                const URLWithoutFirstSlash = removeFirstAndLastSlashes(jsURL);
                const URLWithDomainPrefix = `${address}/${URLWithoutFirstSlash}`;
                jsFileURLs.push(URLWithDomainPrefix);
            }
        }

        return jsFileURLs;
    });
}