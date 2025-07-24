class g extends HTMLElement {
  constructor() {
    super(), this.url = null, this.borderColor = "#c6d8e9", this.backgroundColor = "#f8f8f8", this.textColor = "#000000";
  }
  async createMessage() {
    let t = document.createElement("div");
    t.style.border = `1px solid ${this.borderColor}`, t.style.backgroundColor = this.backgroundColor, t.style.color = this.textColor, t.style.padding = "10px 20px";
    let s = await this.getJSON(this.url).then((o) => {
      if (o && o !== "") {
        let e = JSON.parse(o), n = /* @__PURE__ */ new Date();
        if (e.isActive) {
          const i = e.start_show ? /* @__PURE__ */ new Date(e.start_show + "T00:00:00Z") : null, a = e.end_show ? /* @__PURE__ */ new Date(e.end_show + "T23:59:59Z") : null;
          if (!((!i || n >= i) && (!a || n <= a)))
            return "";
          let r = "";
          e.icon && e.icon !== "" && (r += e.icon), r += e.message;
          const c = /* @__PURE__ */ new Date(e.start_date + "Z"), h = this.getDateOrdinals(c.getDate()), l = /* @__PURE__ */ new Date(e.end_date + "Z"), u = this.getDateOrdinals(l.getDate()), d = l.toLocaleString("en-EN", { month: "long" });
          return r = r.replace("##end_month", d), r = r.replace("##start_date", h), r = r.replace("##end_date", u), r;
        }
      }
      return "";
    });
    return s != "" ? (t.innerHTML = s, t.outerHTML) : "";
  }
  async getJSON(t) {
    var s = new XMLHttpRequest();
    s.open("GET", t, !1);
    try {
      return s.send(), s.responseText;
    } catch {
      return console.log("Error fetching " + t), "";
    }
  }
  getDateOrdinals(t) {
    if (t > 3 && t < 21) return `${t}th`;
    switch (t % 10) {
      case 1:
        return `${t}st`;
      case 2:
        return `${t}nd`;
      case 3:
        return `${t}rd`;
      default:
        return `${t}th`;
    }
  }
  connectedCallback() {
    this.url = this.getAttribute("url"), this.hasAttribute("textColor") && (this.textColor = this.getAttribute("textColor")), this.hasAttribute("borderColor") && (this.borderColor = this.getAttribute("borderColor")), this.hasAttribute("backgroundColor") && (this.backgroundColor = this.getAttribute("backgroundColor")), this.createMessage().then((t) => {
      this.innerHTML = t;
    });
  }
}
customElements.define("custom-message", g);
