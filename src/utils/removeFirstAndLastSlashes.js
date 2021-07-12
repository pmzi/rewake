module.exports = function removeFirstAndLastSlashes(str){
    return str.replace(/^\//, '').replace(/\/$/, '');
}