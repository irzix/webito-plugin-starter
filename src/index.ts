// plugin.ts

import axios from 'axios';
import process from 'process';
import webito from 'webito-plugin-sdk'

const starter = new webito.WebitoPlugin('starter');

starter.registerHook('messagesCreate', ({ target }: { target: { mobile: number } }) => {
    return axios.post('https://example.com/sendotp', { mobile: target.mobile })
        .then(response => {
            console.log('OTP sent:', response.data);
        })
        .catch(error => {
            console.error('Error sending OTP:', error);
        });
});

starter.registerHook('productsCreate', (data) => {
    console.log('Product created:', data);

    return starter.executeHook('messagesCreate', { target: { mobile: data.mobile } });
});

const runPlugin = (inputData: { hook: string; data: any }) => {
    return starter.executeHook(inputData.hook, inputData.data);
};


process.on('message', async (msg: any) => {
    return await runPlugin(msg);
});