const chai = require('chai');
const assert = chai.assert;

const {getData, setData} = require('../index');

describe("middleware-param tests", function() {
    describe("setData()", function() {
        const next = () => {};

        it("Defaults the key name if not supplied", function () {
            const res = {};
            setData("hello")(res, {}, next);
            assert.equal(res.locals["__PARAM"], "hello");

        });

        it("Uses key name from options object", function () {
            const res = {};
            setData("hello", {"name": "custom"})(res, {}, next);
            assert.equal(res.locals["custom"], "hello");
        });

        it("Defaults key name if options does not have name property", function () {
            const res = {};
            setData("hello", {"nameish": "custom"})(res, {}, next);
            assert.equal(res.locals["__PARAM"], "hello");
        });

        it("Defaults key name if options is not an object", function () {
            const res = {};
            setData("hello", "someString")(res, {}, next);
            assert.equal(res.locals["__PARAM"], "hello");
        });

        it("Operates correctly if res.locals is already defined", function () {
            const res = {locals: {"somekey": "someval"}};
            setData("hello")(res, {}, next);
            assert.equal(res.locals["__PARAM"], "hello");
        });

    });

    describe("setData()", function() {
        it("Returns undefined if default object property not found", function () {
            const res = {};
            assert.isUndefined(getData(res));
        });
        it("Returns undefined if custom object property not found", function () {
            const res = {};
            assert.isUndefined(getData(res), {"name": "custom"});
        });
    });


});


