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
            let response = JSON.parse(data);
            if(response.isActive){
                return response.message;
            }
            return '';
        });
        customElement.innerHTML = message;
        return customElement.outerHTML;
    }

    async getJSON(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send()
        return xhr.responseText;
    }

    connectedCallback() {
        this.url = this.getAttribute('url');

        this.createMessage().then(message => {
            this.innerHTML = message;
        });
    }
}

customElements.define("custom-message", CustomMessage);

//export default CustomMessage;