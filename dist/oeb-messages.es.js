class h extends HTMLElement {
  constructor() {
    super(), this.url = null, this.borderColor = "#c6d8e9", this.backgroundColor = "#f8f8f8", this.textColor = "#000000";
  }
  async createMessage() {
    let e = document.createElement("div");
    e.style.border = `1px solid ${this.borderColor}`, e.style.backgroundColor = this.backgroundColor, e.style.color = this.textColor, e.style.padding = "10px 20px", console.log(this);
    let s = await this.getJSON(this.url).then((o) => {
      if (o && o !== "") {
        let t = JSON.parse(o), n = /* @__PURE__ */ new Date();
        if (t.isActive && n >= new Date(t.start_date) && n <= new Date(t.end_date)) {
          let r = "";
          t.icon && t.icon !== "" && (r += t.icon), r += t.message;
          let l = /* @__PURE__ */ new Date(t.start_date + "Z"), i = this.getDateOrdinals(l.getDate()), a = /* @__PURE__ */ new Date(t.end_date + "Z"), c = this.getDateOrdinals(a.getDate()), u = a.toLocaleString("en-EN", { month: "long" });
          return r = r.replace("##end_month", u), r = r.replace("##start_date", i), r = r.replace("##end_date", c), r;
        } else
          return "";
      }
      return "";
    });
    return s != "" ? (e.innerHTML = s, e.outerHTML) : "";
  }
  async getJSON(e) {
    var s = new XMLHttpRequest();
    s.open("GET", e, !1);
    try {
      return s.send(), s.responseText;
    } catch {
      return console.log("Error fetching " + e), "";
    }
  }
  getDateOrdinals(e) {
    if (e > 3 && e < 21) return `${e}th`;
    switch (e % 10) {
      case 1:
        return `${e}st`;
      case 2:
        return `${e}nd`;
      case 3:
        return `${e}rd`;
      default:
        return `${e}th`;
    }
  }
  connectedCallback() {
    this.url = this.getAttribute("url"), this.hasAttribute("textColor") && (this.textColor = this.getAttribute("textColor")), this.hasAttribute("borderColor") && (this.borderColor = this.getAttribute("borderColor")), this.hasAttribute("backgroundColor") && (this.backgroundColor = this.getAttribute("backgroundColor")), this.createMessage().then((e) => {
      this.innerHTML = e;
    });
  }
}
customElements.define("custom-message", h);
document.querySelector("#oeb-message").innerHTML = `
    <custom-message 
    textColor="pink"
    url="https://raw.githubusercontent.com/inab/oeb-messages/main/demo/message.json">
    </custom-message>
  `;
