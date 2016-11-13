import * as HEADER_CONSTANTS from 'components/header/constants/header.constants'

export default class HeaderModel {
    constructor() {
        this.headers = Object.keys(HEADER_CONSTANTS).map((header) => HEADER_CONSTANTS[header]);
    }

    getHeaders() {
        return this.headers;
    }
}
