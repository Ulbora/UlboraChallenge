/*     
 Copyright (C) 2016 Ulbora Labs Inc. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
var mysqlHost = process.env.MYSQL_DB_HOST || 'localhost';
var mysqlPort = process.env.MYSQL_DB_PORT || 3306;
var mysqlDB = process.env.MYSQL_DB_NAME || 'ulbora_challenge_test';
var mysqlUserName = process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'admin';
var mysqlPW = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'admin';


var mysql = require('mysql');
var pool = mysql.createPool({
    host: mysqlHost,
    port: mysqlPort,
    database: mysqlDB,
    user: mysqlUserName,
    password: mysqlPW

});
*/


var mysql = require('mysql');
var pool;
exports.connect = function (host, user, pw, db, cpnum) {
    pool = mysql.createPool({
        connectionLimit: cpnum,
        host: host,
        user: user,
        password: pw,
        database: db
    });
};

exports.testConnection = function (callback) {
    var rtn = false;
    pool.getConnection(function (err, connection) {
        if (!err && connection) {
            connection.release();
            rtn = true;
        }
        callback(rtn);
    });
};

var crypto = require('crypto');



exports.getChallenge = function (req, res) {
    getChallengeRow(req, res);
};

exports.validateChallenge = function (req, res) {
    var success = false;
    var challengeBody = req.body;
    console.log('challengeBody= ' + JSON.stringify(challengeBody));
    if (challengeBody !== null && challengeBody !== undefined) {
        var sentAnswer = challengeBody.answer;
        var sentKey = challengeBody.key;
        if (sentAnswer !== null && sentAnswer !== undefined && sentKey !== null && sentKey !== undefined) {
            var testSalt1 = getSalt(false);
            console.log('testSalt1= ' + testSalt1);
            var genTestKey1 = crypto.createHmac('sha512', testSalt1).update(sentAnswer).digest("base64");
            genTestKey1 = genTestKey1.toLowerCase();
            console.log('sentKey= ' + sentKey);
            console.log('genTestKey1= ' + genTestKey1);
            if (genTestKey1 === sentKey) {
                success = true;
            } else {
                var testSalt2 = getSalt(true);
                console.log('testSalt2= ' + testSalt2);
                var genTestKey2 = crypto.createHmac('sha512', testSalt2).update(sentAnswer).digest("base64");
                genTestKey2 = genTestKey2.toLowerCase();
                console.log('sentKey= ' + sentKey);
                console.log('genTestKey2= ' + genTestKey2);
                if (genTestKey2 === sentKey) {
                    success = true;
                }
            }

        } else {
            res.status(415);
        }
    }
    var validateRtn = {
        "success": success
    };
    res.send(validateRtn);

};


function getChallengeRow(req, res) {
    var queryStr = " select c.id, c.question, c.answer, l.code " +
            " from captcha_not c inner join language l " +
            " on c.language_id = l.id " +
            " where l.code = ? ";
    var languageCode = req.params.languageCode;

    if (languageCode !== null && languageCode !== undefined && languageCode !== "") {
        console.log('languageCode = ' + languageCode);
        var challengeJson;
        console.log('query= ' + queryStr);
        pool.getConnection(function (err, connection) {
            console.log('connection = ' + connection);
            console.log('connection err= ' + err);
            // Use the connection            
            connection.query(queryStr, [languageCode], function (err, rows) {
                //var challenge;
                console.log('query err= ' + err);
                console.log('rows= ' + rows);
                var challengeSize = rows.length;

                if (challengeSize > 0) {
                    console.log('size= ' + challengeSize);
                    var ind = Math.floor((Math.random() * challengeSize));
                    console.log('index= ' + ind);
                    var challengeRow = rows[ind];
                    console.log('challengeRow= ' + JSON.stringify(challengeRow));

                    var newKey = generateChallengeKey(challengeRow.answer).toLowerCase();
                    console.log('genKey2= ' + newKey);

                    challengeJson = {
                        "question": challengeRow.question,
                        "key": newKey
                    };
                    console.log('challengeJson1= ' + JSON.stringify(challengeJson));
                    connection.release();
                    res.send(challengeJson);
                    // Don't use the connection here, it has been returned to the pool.
                } else {
                    challengeJson = {
                        "question": "",
                        "key": ""
                    };
                    res.send(challengeJson);
                }


            });
        });
    } else {
        challengeJson = {
            "question": "",
            "key": ""
        };
        res.send(challengeJson);
    }

}

function generateChallengeKey(answer) {
    var salt = getSalt(false);
    console.log('salt= ' + salt);
    var genKey = crypto.createHmac('sha512', salt).update(answer).digest("base64");
    console.log('genKey= ' + genKey);
    return genKey;
}

function getSalt(shiftDown) {
    var returnVal;
    var oneHourMilli = 3600000;
    var month;
    var day;
    var year;
    var hour;
    var sead = "k44hhy3";
    if (shiftDown === true) {
        var today1 = new Date();
        var newTimeMilli = today1 - oneHourMilli;
        var newDate = new Date(newTimeMilli);
        month = newDate.getMonth() + 1;
        day = newDate.getDate() + 1;
        year = newDate.getFullYear();
        hour = newDate.getHours() + 1;

        /*
         Calendar cal = Calendar.getInstance();
         cal.add(Calendar.HOUR, -1);
         month = cal.get(Calendar.MONTH);
         day = cal.get(Calendar.DAY_OF_MONTH);
         year = cal.get(Calendar.YEAR);
         hour = cal.get(Calendar.HOUR);
         */
    } else {
        var today2 = new Date();
        month = today2.getMonth() + 1;
        day = today2.getDate() + 1;
        year = today2.getFullYear();
        hour = today2.getHours() + 1;
        /*
         Calendar cal = Calendar.getInstance();
         month = cal.get(Calendar.MONTH);
         day = cal.get(Calendar.DAY_OF_MONTH);
         year = cal.get(Calendar.YEAR);
         hour = cal.get(Calendar.HOUR);
         */
    }
    returnVal = sead + month + day + year + hour;

    return returnVal;
}
