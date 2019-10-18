[![Build Status](https://travis-ci.org/wildbillh/middleware-params.svg?branch=master)](https://travis-ci.org/wildbillh/middleware-params)[![npm version](https://badge.fury.io/js/middleware-params.svg)](https://badge.fury.io/js/middleware-params)

# middleware-params
_An easy mechanism for passing data to express middleware_


## Installation
```text
$ npm install middleware-params
```


## API
```text
const {getData, setData} = require('middleware-params');
```

The middleware-params module exports two functions. 

_setData()_ can be applied as router or application middleware to set values that can be
used by later middleware in the chain. 

_getData()_ is a convenience function for getting the set data
from the request object.

---

#### mwParams.setData(data, [options])

Sets data in the request object that can be read from 
middleware further down the chain. 

##### data

The data to be set. This call will create or replace any data
using the the same name (see the options object).

##### options
 
An optional options object. Populate the options object if you
want to control the key that holds the data. If not defined, this defaults to
```json
{"name": "__PARAM"}
```
Using the default options argument, stores the data in
```
req.locals["__PARAM"]
```


---

#### mwParams.getData([options])

Returns the stored data set in earlier middleware or undefined if none is found.
 
##### options

Same as the options object in the setData function. You should either default both
or provide the same options object to both _setData()_ and _getData()_.

---

## Examples

### Usage in application middleware
```js
const express = require('express');
const {getData, setData} = require('middleware-params');

const app = express();
let myData = {"somekey": "someval"};

// Set some data that will available for all subsequent middleware
app.use(setData(myData));

// Define more application middleware
app.use((req, res) => {
  // Use the convenience function to get the data.
  console.log(getData());
  // Get the data manually from the request object
  console.log(req.locals["__PARAM"]);
});

// Get the data from a route
app.get("/", (req, res) => {
  // Use the convenience function to get the data.
    console.log(getData());    
});
```

### Usage in routes
```js
const express = require('express');
const {getData, setData} = require('middleware-params');

const app = express();
let myData = {"somekey": "someval"};

// Set the data in middleware of a route
app.get("/", [setData(myData)], (req, res) => {
  // Use the convenience function to get the data.
    console.log(getData());    
});
```
  
### Using custom key names
```js
const express = require('express');
const {getData, setData} = require('middleware-params');

const app = express();
let myData = {"somekey": "someval"};

// Set the data in middleware of a route
app.get("/", [setData(myData, {"name": "custom"})], (req, res) => {
  // Use the convenience function to get the data.
  console.log(getData({"name": "custom"}));
  // This would get the same results
  console.log(req.locals.custom);      
});
```


### Test cases and code coverage
```text
npm test
npm run coverage
``` 

### License
MIT 
  
  
