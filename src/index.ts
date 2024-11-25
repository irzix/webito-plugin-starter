import { hooks, Plugin } from 'webito-plugin-sdk';

const myPlugin = new Plugin('MyAwesomePlugin');

myPlugin.registerHook(hooks, async (userData) => {
});

myPlugin.registerHook(hooks, async (productData) => {
});