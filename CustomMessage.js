export default class CustomMessage extends HTMLElement {
    constructor() {
        super();

        this.url = null;

        this.borderColor = '#c6d8e9';

        this.backgroundColor = '#f8f8f8';

        this.textColor = '#000000';
    }

    async createMessage() {
        let customElement = document.createElement('div');
        customElement.style.border = `1px solid ${this.borderColor}`;
        customElement.style.backgroundColor = this.backgroundColor;
        customElement.style.color = this.textColor;
        customElement.style.padding = '10px 20px';
        let message = await this.getJSON(this.url).then(data => {
            console.log("data: ", data);
            if(data && data !== "") {
                let response = JSON.parse(data);
                if(response.isActive){
                    return response.message;
                }
                else {
                    return '';
                }
            }
            return '';
        });
        if(message != "") {
            customElement.innerHTML = message;
            return customElement.outerHTML;
        } else {
            return '';
        }
    }

    async getJSON(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        try {
            xhr.setHeader("Access-Control-Allow-Origin", "*");
            xhr.setHeader("Access-Control-Allow-Credentials", "true");
            xhr.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            xhr.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            console.log("getting json from url: ", url);
            xhr.send()
            return xhr.responseText;
        } catch (error) {
            console.log("Error fetching " + url);
            return "";
        }
    }

    connectedCallback() {
        this.url = this.getAttribute('url');

        this.createMessage().then(message => {
            this.innerHTML = message;
        });
    }
}

customElements.define("custom-message", CustomMessage);