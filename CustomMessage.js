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
            if(data && data !== "") {
                let response = JSON.parse(data);
                let actualDate = new Date();
                if(response.isActive) {
                    let messageResponse = "";
                    if(response.icon && response.icon !== "") {
                        messageResponse += response.icon;
                    }
                    messageResponse += response.message;

                    let start_date = new Date(response.start_date + "Z");
                    let start_day = this.getDateOrdinals(start_date.getDate());
                    let end_date = new Date(response.end_date + "Z");
                    let end_day = this.getDateOrdinals(end_date.getDate());
                    let end_month = end_date.toLocaleString('en-EN', { month: 'long' });

                    messageResponse = messageResponse.replace("##end_month", end_month);
                    messageResponse = messageResponse.replace("##start_date", start_day);
                    messageResponse = messageResponse.replace("##end_date", end_day);
                    return messageResponse;
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
            xhr.send()
            return xhr.responseText;
        } catch (error) {
            console.log("Error fetching " + url);
            return "";
        }
    }

    getDateOrdinals(day) {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
            case 1:  return `${day}st`;
            case 2:  return `${day}nd`;
            case 3:  return `${day}rd`;
            default: return `${day}th`;
        }
    }

    connectedCallback() {
        // The URL of the JSON file
        // It is mandatory to normal use
        this.url = this.getAttribute('url');

        // The color of the text message
        if(this.hasAttribute('textColor')) {
            this.textColor = this.getAttribute('textColor');
        }

        // The border color of the message box
        if(this.hasAttribute('borderColor')) {
            this.borderColor = this.getAttribute('borderColor');
        }

        // The background color of the message box
        if(this.hasAttribute('backgroundColor')) {
            this.backgroundColor = this.getAttribute('backgroundColor');
        }

        this.createMessage().then(message => {
            this.innerHTML = message;
        });
    }
}

customElements.define("custom-message", CustomMessage);