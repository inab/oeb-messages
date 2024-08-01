# OEB messages

**oeb-message** is a javascript component for add custom messages from external URL ans show it as a notification in a webpage.

## Installation

* To use NPM package version:
```
npm i @inb/oeb_messages
```

* CDN version


* Javascript directly module

_Just import CustomMessage.js file in your component_


## How to use

#### Import

Import depend on installation type:

* NPM version
_To use NPM version, node recomended version is at least 18.x.x (recommended 20.x.x)_
```
import oeb-messages from 'oeb-messages':
```

* CDN version
```
<script src="CDN/oeb-messages.js"></script>
```

* Javascript directly module use:
```
import CustomMessage from './CustomMessage.js'
```

### On web usage 

To use OEB messages component declare the component:
```
<custom-message url="YOUR_JSON_URL_HERE"></custom-message>
```

## Component styles

By default OEB messages component include OEB styles. To customize others styles, declare it on component:
```
<custom-message 
border="1px solid lightsteelblue"
backgroundColor="azure"
textColor="gray"
url="YOUR_JSON_URL_HERE"
>
</custom-message>
```