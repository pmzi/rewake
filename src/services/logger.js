const chalk = require('chalk');

exports.error = (message, details)=>{
    if(!details) console.log(chalk`\n{red.bold Error:} ${message}`);
    else console.log(chalk`\n{red.bold Error:} ${message}\n{magenta.bold Details:} ${details}`);
}

exports.success = (message, details)=>{
    if(!details) console.log(chalk`\n{green.bold Success:} ${message}`);
    else console.log(chalk`\n{green.bold Success:} ${message}\n{magenta.bold Details:} ${details}`);
}

exports.warn = (message, details)=>{
    if(!details) console.log(chalk`\n{yellow.bold Warning:} ${message}`);
    else console.log(chalk`\n{yellow.bold Warning:} ${message}\n{magenta.bold Details:} ${details}`);
}