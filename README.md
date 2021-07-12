# Rewake

Rewake helps you to regenerate website's code if source maps are uploaded and available.

<p align="center"><img width="500" src="https://user-images.githubusercontent.com/11475858/103028794-b2e47300-456d-11eb-8db2-f522d0386746.png"></p>

## Installation

It can be installed using npm:

```bash
$ npm i -g rewake --unsafe-perm=true
```

**Note: "--unsafe-perm=true" is needed because puppeteer can not be installed globally without that permission.**

## Usage

After installation completed, you can use it with the following command:

```bash
$ rewake -u "website-url" -o "output-folder"
```
