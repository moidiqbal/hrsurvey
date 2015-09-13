/**
 * Created by Maizy on 9/12/2015.
 */

var mysql = require("mysql");

/**
 * Creating Pool for MySql
 */
var pool = mysql.createPool({
    "user":"root",
    "password":"",
    "host":"localhost",
    "database":"hrsurvey"
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
            $this.CRUD._read = function (callback,query) {
            /*    var query = "SELECT ";
                for(var field in fields){
                    query += fields[field];
                }
                query += " from "+table;
                // set where if where
                if(where || where.length >0){
                    query += " WHERE ";
                    for(var wh in where){
                        query += Object.keys(where[wh])+" = '"+ where[wh]
                    }
                }*/
                $this.connection.query(query,function(err,data){
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
                               data:data,
                               query:query
                           });
                       }
                });
                return $this.CRUD;
            };
            $this.CRUD._add = function (callback,options) {
                $this.connection.query(query,function(err,data){
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
                            data:data,
                            query:query
                        });
                    }
                });
                return $this.CRUD;
            };
            $this.CRUD._delete = function (callback,options) {

                return $this;
            };
            return $this.CRUD;
        }
    }
}











