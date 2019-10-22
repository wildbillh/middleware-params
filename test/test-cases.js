const chai = require('chai');
const assert = chai.assert;

const {getData, setData} = require('../index');

describe("middleware-param tests", function() {
    describe("setData()", function() {
        const next = () => {};

        it("Defaults the key name if not supplied", function () {
            const req = {};
            setData("hello")(req, {}, next);
            assert.equal(req.locals["__PARAM"], "hello");

        });

        it("Uses key name from options object", function () {
            const req = {};
            setData("hello", {"name": "custom"})(req, {}, next);
            assert.equal(req.locals["custom"], "hello");
        });

        it("Defaults key name if options does not have name property", function () {
            const req = {};
            setData("hello", {"nameish": "custom"})(req, {}, next);
            assert.equal(req.locals["__PARAM"], "hello");
        });

        it("Defaults key name if options is not an object", function () {
            const req = {};
            setData("hello", "someString")(req, {}, next);
            assert.equal(req.locals["__PARAM"], "hello");
        });

        it("Operates correctly if req.locals is already defined", function () {
            const req = {locals: {"somekey": "someval"}};
            setData("hello")(req, {}, next);
            assert.equal(req.locals["__PARAM"], "hello");
        });

        it("Operates correctly if falsy boolean is sent", function () {
            const req = {};
            setData(false)(req, {}, next);
            assert.isBoolean(req.locals["__PARAM"]);
            assert.isFalse(req.locals["__PARAM"])
        });
    });

    describe("getData()", function() {

        it("Returns undefined if default object property not found", function () {
            const req = {};
            assert.isUndefined(getData(req));
        });
        it("Returns undefined if custom object property not found", function () {
            const req = {};
            assert.isUndefined(getData(req), {"name": "custom"});
        });

        it("Operates correctly if falsy boolean is sent", function () {
            const req = {locals: {"__PARAM": false}};
            assert.isBoolean(getData(req));
            assert.isFalse(getData(req))
        });

    });


});


