const http = require('./services/http');
const logger = require('./services/logger');
const removeFirstAndLastSlashes = require('./utils/removeFirstAndLastSlashes');

const sourceMapRegExp = /\/\/\#\s*sourceMappingURL\s*=\s*(.+?\.map)/i;

module.exports = async function sourceMapExtractor(jsURLs){
    const sourceMapURLs = [];

    for(const url of jsURLs){
        try {
            const res = await http(url);
            const textRes = await res.text();
            
            if(!res.ok) {
                logger.warn(`could not retrieve ${url}`, textRes);
                continue;
            }

            const matchedSourceMap = textRes.match(sourceMapRegExp);

            if(matchedSourceMap) {
                const sourceMapUrl = matchedSourceMap[1];

                const urlSlashSplitted = url.split('/');
                urlSlashSplitted.pop();
                const urlWithoutFile = urlSlashSplitted.join('/');
                const fileNameWithoutFirstAndLastSlashes = removeFirstAndLastSlashes(sourceMapUrl);

                sourceMapURLs.push(`${urlWithoutFile}/${fileNameWithoutFirstAndLastSlashes}`);
            } else {
                sourceMapURLs.push(`${url}.map`);
            }
        } catch(e) {
            logger.warn(`could not load "${url}".`, e.message);
        }
    }

    return sourceMapURLs;
}