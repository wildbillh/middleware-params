# middleware-params
An easy mechanism for passing data to express middleware.

## Installation
```text
$ npm install middleware-params
```

## API
```text
const mwParams = require('middleware-params');
```
Or
```text
const {getData, setData} = require('middleware-params)';
```


The mwParams object exposes 2 functions. 

SetData can be used as router or application middleware to set values that can be
gleaned by later middleware in the chain. 

getData is a convenience function for getting the set data
from the request object.

__mwParams.setData(data, [options])__

Sets data in the request object that can be read from 
middleware further down the chain. 

_data_

The data to be set. This call will create or replace any data
using the the same name (see the options object).

_options_
 
An optional options object. Populate the options object if you
want to control the key that holds the data. If not defined, this defaults to
```json
{"name": "__PARAM"}
```
Using the default options argument, stores the data in _req.locals\["\_\_PARAM"\]_.

__mwParams.getData([options])__

Returns the stored data set in earlier middleware or undefined it none is found.
 
_options_

Same as the options object in the setData function. You should either default both
or provide the same options object to both setData and getDate.

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
  
  
