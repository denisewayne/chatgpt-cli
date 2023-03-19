#!/usr/bin/env node

const http = require('http');
const https = require('https');
const url = require('url');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_TOKEN,
});

const argv = yargs(hideBin(process.argv))
    .command(
        '$0 [prompt]',
        'Ask a question to chat gpt!',
        (yargs) => {
            yargs.positional('prompt', {
                describe: 'The prompt to ask',
                type: 'string',
                default: 'Greet the user',
            });
        },
        async (argv) => {
            const openai = new OpenAIApi(configuration);

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: argv.prompt,
                max_tokens: 500,
                temperature: 0,
            });

            console.log(response.data.choices[0].text)
        }
    )
    .demandCommand()
    .help()
    .argv;
