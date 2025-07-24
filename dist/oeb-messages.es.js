class b extends HTMLElement {
  constructor() {
    super(), this.url = null, this.borderColor = "#c6d8e9", this.backgroundColor = "#f8f8f8", this.textColor = "#000000";
  }
  async createMessage() {
    let t = document.createElement("div");
    t.style.border = `1px solid ${this.borderColor}`, t.style.backgroundColor = this.backgroundColor, t.style.color = this.textColor, t.style.padding = "10px 20px";
    let r = `
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
        `, o = await this.getJSON(this.url).then((n) => {
      if (n && n !== "") {
        let e = JSON.parse(n), i = /* @__PURE__ */ new Date();
        if (e.isActive) {
          const a = e.start_show ? /* @__PURE__ */ new Date(e.start_show + "T00:00:00Z") : null, l = e.end_show ? /* @__PURE__ */ new Date(e.end_show + "T23:59:59Z") : null;
          if (!((!a || i >= a) && (!l || i <= l)))
            return "";
          let s = r;
          s += '<div class="custom-message-box">', e.icon && e.icon !== "" && (s += e.icon), s += e.message, s += "</div>";
          const h = /* @__PURE__ */ new Date(e.start_date + "Z"), u = this.getDateOrdinals(h.getDate()), c = /* @__PURE__ */ new Date(e.end_date + "Z"), d = this.getDateOrdinals(c.getDate()), g = c.toLocaleString("en-EN", { month: "long" });
          return s = s.replace("##end_month", g), s = s.replace("##start_date", u), s = s.replace("##end_date", d), s;
        }
      }
      return "";
    });
    return o != "" ? (t.innerHTML = o, t.outerHTML) : "";
  }
  async getJSON(t) {
    var r = new XMLHttpRequest();
    r.open("GET", t, !1);
    try {
      return r.send(), r.responseText;
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
customElements.define("custom-message", b);
