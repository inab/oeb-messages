# OEB messages

**OEB Messages** is a lightweight Web Component that displays customizable messages fetched from a remote JSON file. It's designed for the OpenEBench web ecosystem but can be used anywhere.


## 🚀 Installation

You can use the component in three different ways:



### 📦 Option 1: Via NPM

```bash
npm install @inb/oeb-messages
```

```javascript
import oeb-messages from 'oeb-messages':
```

Requires Node.js ≥ 18.x (recommended: 20.x)



### 🌐 Option 2: Via CDN

```html
<script src="https://cdn.jsdelivr.net/gh/inab/oeb-messages@main/dist/oeb-messages.umd.js"></script>
```

_Just import CustomMessage.js file in your component_



### 🧩 Option 3: Direct JS Module

```javascript
import CustomMessage from './CustomMessage.js';
```



### 💡 Basic Usage

Add the component to your HTML:

```html
<custom-message url="https://example.com/message.json"></custom-message>
```



### 🎨 Custom Styling

You can customize the visual appearance using HTML attributes:

```html
<custom-message 
  url="https://example.com/message.json"
  borderColor="lightsteelblue"
  backgroundColor="azure"
  textColor="gray">
</custom-message>
```



### 📄 Expected JSON Format

The external JSON file must follow this structure:

```json
{
  "isActive": true,
  "start_date": "2025-08-05",
  "end_date": "2025-08-07",
  "start_show": "2025-08-01",
  "end_show": "2025-08-07",
  "icon": "<svg>...</svg>",
  "message": "Maintenance from <b>##end_month ##start_date</b> to <b>##end_date</b>."
}
```


##### Notes:

- start_show and end_show are optional — if omitted, the message will only display if isActive is true.

- Tokens like ##start_date, ##end_date, and ##end_month will be dynamically replaced.

- All date comparisons are done in UTC.



### 🧪 Example (with GitHub raw JSON)

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/inab/oeb-messages@main/dist/oeb-messages.umd.js"></script>

<custom-message
  url="https://raw.githubusercontent.com/inab/oeb-messages/main/demo/message-advanced.json"
  backgroundColor="#f0f8ff"
  borderColor="#1e90ff"
  textColor="#000">
</custom-message>
```



### 🛠 Local Development

```bash
npm install
npm run dev       # Run Vite dev server
npm run build     # Build the final bundle into /dist
```



### 📝 License

```yaml
---
Let me know if you want this saved directly as a file, or want it committed to your repo.
```