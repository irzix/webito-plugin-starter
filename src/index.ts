import axios from 'axios';
import webito from 'webito-plugin-sdk'

const starter = new webito.WebitoPlugin('starter');

starter.registerHook(webito.hooks.messagesCreate, ({ target }) => 
    {
    // send otp
    axios.post('https://example.com/sendotp', { mobile: target.mobile })
});


starter.registerHook(webito.hooks.productsCreate, () => {

    // send message on products create
    starter.executeHook(webito.hooks.messagesCreate, {})
});