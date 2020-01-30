const DEBUG = true;
let BASE_URL = '';
let WS_BASE_URL = '';
if (DEBUG) {
    BASE_URL= 'http://localhost:9000';
    WS_BASE_URL= 'ws://localhost:9000';
} else {
    BASE_URL= 'http://api.freaks.group';
    WS_BASE_URL= 'ws://api.freaks.group'
}

export {
    DEBUG,
    BASE_URL,
    WS_BASE_URL
}