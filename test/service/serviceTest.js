var assert = require('assert');
var db = require("../../db/db");
var service = require("../../service/service");
var key;

describe('service', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init service', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_challenge_test", 5);
            setTimeout(function () {
                service.init(db);
                done();
            }, 1000);
        });
    });


    describe('#getChallenge()', function () {
        it('should getChallenge', function (done) {
            setTimeout(function () {
                var req = {};
                req.params = {};
                req.params.languageCode = "en_us";
                var res = {};
                res.send = function (result) {
                    if (result.question && result.key) {
                        key = result.key;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                service.getChallenge(req, res);
            }, 1000);
        });
    });


    describe('#getChallenge()', function () {
        it('should getChallenge', function (done) {
            setTimeout(function () {
                var req = {};
                req.body = {
                    answer: "6+3",
                    key: key
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (result) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (result.success) {
                        assert(true);                        
                    } else {
                        assert(false);
                    }
                    done();
                };
                service.validateChallenge(req, res);
            }, 1000);
        });
    });
    
    
    describe('#getChallenge()', function () {
        it('should getChallenge and fail because of wrong answer', function (done) {
            setTimeout(function () {
                var req = {};
                req.body = {
                    answer: "6+4",
                    key: key
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (result) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (result.success) {
                        assert(false);                        
                    } else {
                        assert(true);
                    }
                    done();
                };
                service.validateChallenge(req, res);
            }, 1000);
        });
    });
});


