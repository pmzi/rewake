module.exports = function urlPathWithoutFile(urlString){
    const url = new URL(urlString);
    const urlPathnameSlashSplitted = url.pathname.split('/');
    urlPathnameSlashSplitted.pop();
    return urlPathnameSlashSplitted.join('/');
}