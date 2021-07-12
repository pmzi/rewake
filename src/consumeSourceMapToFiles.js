const fs = require('fs');
const path = require('path');
const logger = require('./services/logger');
const mkdirp = require('mkdirp');
const { SourceMapConsumer } = require('source-map');
const urlPathWithoutFile = require('./utils/urlPathWithoutFile');


module.exports = async function consumeSourceMapToFiles({ sourceMapContents, outputPath }){
    for(const { url, content } of sourceMapContents){
        const basePath = urlPathWithoutFile(url);
        
        try {
            await SourceMapConsumer.with(content, null, (consumer) => {
                for(const source of consumer.sources){
                    const partialPathToSource = path.join(basePath, source);
                    const pathToSource = path.join(outputPath, partialPathToSource);
                    mkdirp.sync(path.dirname(pathToSource));
                    fs.writeFileSync(pathToSource, consumer.sourceContentFor(source));
                }
            });
        }catch(e) {
            logger.warn(`could not parse ${url}`, e.message);
        }
    }
}