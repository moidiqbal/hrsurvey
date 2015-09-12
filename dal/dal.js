/**
 * Created by Moid Iqbal on 9/12/2015.
 */
var express = require('express');
var mysql     =    require('mysql');
var router = express.Router();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'Diamonds1',
    database : 'hrsurvey',
    debug    :  false
});

function UserAuthentication(req,res) {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from user where username ='"+ req.body.username +"' and password ='"+ req.body.password +"'",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}
module.exports = router;
