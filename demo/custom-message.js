class d extends HTMLElement {
  constructor() {
    super(), this.url = null, this.borderColor = "#c6d8e9", this.backgroundColor = "#f8f8f8", this.textColor = "#000000";
  }
  async createMessage() {
    let e = document.createElement("div");
    e.style.border = `1px solid ${this.borderColor}`, e.style.backgroundColor = this.backgroundColor, e.style.color = this.textColor, e.style.padding = "10px 20px";
    let r = await this.getJSON(this.url).then((n) => {
      if (n && n !== "") {
        let t = JSON.parse(n), o = /* @__PURE__ */ new Date();
        if (t.isActive && o >= new Date(t.start_date) && o <= new Date(t.end_date)) {
          let s = "";
          t.icon && t.icon !== "" && (s += t.icon), s += t.message;
          let l = /* @__PURE__ */ new Date(t.start_date + "Z"), c = this.getDateOrdinals(l.getDate()), a = /* @__PURE__ */ new Date(t.end_date + "Z"), i = this.getDateOrdinals(a.getDate()), u = a.toLocaleString("en-EN", { month: "long" });
          return s = s.replace("##start_date", c), s = s.replace("##end_date", i), s = s.replace("##end_month", u), s;
        } else
          return "";
      }
      return "";
    });
    return r != "" ? (e.innerHTML = r, e.outerHTML) : "";
  }
  async getJSON(e) {
    var r = new XMLHttpRequest();
    r.open("GET", e, !1);
    try {
      return r.send(), r.responseText;
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
    this.url = this.getAttribute("url"), this.createMessage().then((e) => {
      this.innerHTML = e;
    });
  }
}
customElements.define("custom-message", d);
document.querySelector("#oeb-message").innerHTML = `
    <custom-message url="http://localhost:5173/demo/message.json"></custom-message>
  `;
