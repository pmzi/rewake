const http = require('./services/http');
const logger = require('./services/logger');

module.exports = async function contentExtractor(urls){
    const contents = [];
    for(const url of urls){
        try {
            const res = await http(url);
            const resText = await res.text();
            contents.push({
                url,
                content: resText,
            });
        } catch(e) {
            logger.warn(`could not load source map from "${url}".`, e.message);
        }
    }
    return contents;
}