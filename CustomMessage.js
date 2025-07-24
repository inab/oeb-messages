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

        let style = `
        <style>
            .custom-message-box {
                background-color: ${this.backgroundColor};
                color: ${this.textColor};
                padding: 10px 20px;
                font-family: sans-serif;
                line-height: 1.6;
                text-align: center;
                border-radius: 6px;
            }

            .custom-message-box svg {
                padding-right: 5px;
            }
        </style>
        `;

        let message = await this.getJSON(this.url).then(data => {
            if (data && data !== "") {
                let response = JSON.parse(data);
                let now = new Date();

                if (response.isActive) {
                    const showStart = response.start_show ? new Date(response.start_show + "T00:00:00Z") : null;
                    const showEnd = response.end_show ? new Date(response.end_show + "T23:59:59Z") : null;

                    const isInRange =
                        (!showStart || now >= showStart) &&
                        (!showEnd || now <= showEnd);

                    if (!isInRange) {
                        return '';
                    }

                    let messageResponse = style;
                    messageResponse += `<div class="custom-message-box">`;

                    if (response.icon && response.icon !== "") {
                        messageResponse += response.icon;
                    }

                    messageResponse += response.message;
                    messageResponse += `</div>`;

                    const start_date = new Date(response.start_date + "Z");
                    const start_day = this.getDateOrdinals(start_date.getDate());

                    const end_date = new Date(response.end_date + "Z");
                    const end_day = this.getDateOrdinals(end_date.getDate());
                    const end_month = end_date.toLocaleString('en-EN', { month: 'long' });

                    messageResponse = messageResponse.replace("##end_month", end_month);
                    messageResponse = messageResponse.replace("##start_date", start_day);
                    messageResponse = messageResponse.replace("##end_date", end_day);

                    return messageResponse;
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