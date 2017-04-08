var assert = require('assert');
var db = require("../../db/db");
var key;

describe('mysql DB', function () {
    this.timeout(20000);
    
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_challenge_test", 5);
            setTimeout(function () {
                done();
            }, 1000);
        });
    });
    
    describe('#getChallenge()', function () {
        it('should get Challenge in db', function (done) {
            
            setTimeout(function () {
                var req = {};
                req.params = {};
                req.params.languageCode = "en_us";
                res = {};
                res.send = function(result){
                    if(result.question && result.key){
                        key = result.key;
                        assert(true);
                    }else{
                        assert(false);
                    }
                     done();
                };
                db.getChallenge(req, res);                
            }, 1000);
        });
    });

      describe('#validateChallenge()', function () {
        it('should validate Challenge in db', function (done) {
            
            setTimeout(function () {
                var req = {};
                req.body = {
                    answer: "6+3",
                    key: key
                };                
                res = {};
                res.send = function(result){
                    if(result.success){                        
                        assert(true);
                    }else{
                        assert(false);
                    }
                     done();
                };
                res.status = function(result){
                    if(result === 415){                        
                        assert(false);
                    }else{
                        assert(true);
                    }
                     done();
                };
                db.validateChallenge(req, res);                
            }, 1000);
        });
    });
    
});

