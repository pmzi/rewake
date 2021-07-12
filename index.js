#!/usr/bin/env node

const yargs = require('yargs');
const transformOutput = require('./transformOutput')
const extract = require('./src');

const argv = yargs
    .option('url', {
        alias: 'u',
        description: 'Website\'s URL',
        type: 'string',
    })
    .option('output', {
        alias: 'o',
        description: 'The output folder. Default is hostname if it\'s not specified.',
        type: 'string',
    })
    .demandOption(['url'], 'Please specify the url!')
    .help()
    .alias('help', 'h')
    .argv;


const outputPath = transformOutput({
    url: argv.url,
    output: argv.output
})

extract({
    url: argv.url,
    outputPath,
});