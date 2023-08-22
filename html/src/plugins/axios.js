import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://glhf_clothes/',
    method: 'POST',
    timeout: 1000
});

export default {
    install: (app, config) => {
        Object.defineProperty(app.config.globalProperties, '$axios', { value: instance });
        app.provide('$axios', instance);
    }
}