class HeaderModel {
    constructor() {
        this.headers = Object.keys(HEADER_TYPES).map((header) => HEADER_TYPES[header]);
    }

    getHeaders() {
        return this.headers;
    }
}
