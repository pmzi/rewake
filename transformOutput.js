const path = require('path');

const currentPath = process.cwd();

module.exports = function transformOutput({ url, output }) {
    const { hostname } = new URL(url)
    return path.join(currentPath, output || hostname)
}