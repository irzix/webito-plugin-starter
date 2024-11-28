// plugin.ts

import axios from 'axios';
import process from 'process';
import webito from 'webito-plugin-sdk'

const starter = new webito.WebitoPlugin('starter');

starter.registerHook('messagesCreate', async ({ vars, data }: any) => {
    const send = await axios.post('https://api.limosms.com/api/sendsms', {
        "Message": data.message,
        "SenderNumber": vars.sender,
        "MobileNumber": [data.phone]
    }, {
        headers: {
            ApiKey: vars.apitoken
        }
    });
    return { status: (send.status == 200) }
});

starter.registerHook('productsCreate', async (data) => {
    console.log('Product created:', data);
    return { status: true }
});

const runPlugin = async (inputData: { hook: string; data: any }) => {
    const result = await starter.executeHook(inputData.hook, inputData.data);
    return result;
};


process.stdin.on('data', async (input) => {
    const msg = JSON.parse(input.toString());
    const result: any = await runPlugin(msg);
    starter.response({ status: result.status, data: result.data })
});