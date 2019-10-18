
const PARAM_OBJ = "__PARAM";
const DEFAULT_OBJ = {"name": PARAM_OBJ};

/**
 * Test for object
 * @param item
 * @returns {boolean} - true if passed an object
 */
const isObject = (item) => {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
};


/**
 * A middleware function to push data to the req.locals object
 * @param data - data to store
 * @param {{}} options - options
 * @returns {Function}
 */
module.exports.setData = (data, options) => {

    return (req, res, next) => {

        let _options = Object.assign({}, DEFAULT_OBJ);

        // If the user supplied an options object, merge it to the default
        if (options && isObject(options)) {
            _options = Object.assign(_options, options);
        }

        // If locals hasn't been defined, do so
        req.locals = req.locals ? req.locals : {};

        // Set the data on the req object
        req.locals[_options.name] = data;

        next();
    }
};

/**
 * Get the data the was previously added to req
 * @param {{}} req - request object
 * @param {{}} options - options object
 * @returns {* || undefined}
 */
module.exports.getData = (req, options) => {
    let _options = DEFAULT_OBJ;

    // If the user supplied an options object, merge it to the default
    if (options && isObject(options)) {
        _options = Object.assign(_options, options);
    }

    // If the object exists return it, else returned undefined
    return (req && req.locals && req.locals[_options.name]) ? req.locals[_options.name] : undefined;

};