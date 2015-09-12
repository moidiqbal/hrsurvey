/**
 * Created by Maizy on 9/12/2015.
 */

var mysql = require("mysql");
var conf = require("./../utility/config.json");

/**
 * Creating Pool for MySql
 */
var pool = mysql.createPool({
    host: conf.mysql.host,
    user: conf.mysql.user,
    password: conf.mysql.password,
    database:conf.mysql.database
});

exports.MySql = function(){
    return {
        init:function(callback){
            console.log("Initializing mysql configurations");
            this.CRUD = {};
            this.connection = {};
            $this = this;
            pool.getConnection(function(err,connection){
                if(callback && typeof callback == "function") {
                    if (err) {
                        callback({
                            status: false,
                            msg: err,
                            connection: null
                        });
                    }
                    else {
                        $this.connection = connection;
                        callback({
                            status: true,
                            msg: "Mysql Connection Successfully",
                            connection: connection,
                            context: $this
                        });
                    }
                }
            });
            $this.CRUD._read = function (callback,table,fields,where) {
                var query = "SELECT ";
                for(var field in fields){
                    query += fields[field];
                }
                query += " from "+table;
                // set where if where
                if(where || where.length >0){
                    query += " WHERE "
                }
                $this.connection.query(query,function(err,roles){
                       if(err){
                           callback({
                               status:false,
                               err: err,
                               data:[],
                               query: query
                           });
                       }else{
                           callback({
                               status:true,
                               err: [],
                               data:roles,
                               query:query
                           });
                       }
                });
                return $this.CRUD;
            };
            $this.CRUD._add = function (callback,options) {

                return $this.CRUD;
            };
            $this.CRUD._delete = function (callback,options) {

                return $this;
            };
            return $this.CRUD;
        },
    }
}











