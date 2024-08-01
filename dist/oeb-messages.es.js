class u extends HTMLElement {
  constructor() {
    super(), this.url = null, this.borderColor = "#c6d8e9", this.backgroundColor = "#f8f8f8", this.textColor = "#000000";
  }
  async createMessage() {
    let e = document.createElement("div");
    e.style.border = `1px solid ${this.borderColor}`, e.style.backgroundColor = this.backgroundColor, e.style.color = this.textColor, e.style.padding = "10px 20px";
    let s = await this.getJSON(this.url).then((o) => {
      if (o && o !== "") {
        let r = JSON.parse(o);
        if (r.isActive) {
          let t = "";
          r.icon && r.icon !== "" && (t += r.icon), t += r.message;
          let i = /* @__PURE__ */ new Date(r.start_date + "Z"), l = this.getDateOrdinals(i.getDate()), n = /* @__PURE__ */ new Date(r.end_date + "Z"), a = this.getDateOrdinals(n.getDate()), c = n.toLocaleString("en-EN", { month: "long" });
          return t = t.replace("##end_month", c), t = t.replace("##start_date", l), t = t.replace("##end_date", a), t;
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
customElements.define("custom-message", u);
