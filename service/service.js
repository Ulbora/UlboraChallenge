/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
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


var db;

exports.init = function (database) {
    db = database;
};


exports.getChallenge = function (req, res) {
    var languageCode = req.params.languageCode;
    if (languageCode !== null && languageCode !== undefined) {
        db.getChallenge(req, res);
    } else {
        res.send({});
    }

};



exports.validateChallenge = function (req, res) {
    if (req.is('application/json')) {
        var reqBody = req.body;
        var bodyJson = JSON.stringify(reqBody);
        console.log("body: " + bodyJson);
        db.validateChallenge(req, res);
    } else {
        res.status(415);
        res.send({success: false});
    }
};