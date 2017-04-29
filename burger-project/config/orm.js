// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);

    });
  },
  create: function(table, cols, vals, cb) {
    // var queryString = "INSERT INTO " + table+"("+cols.toString()+") VALUES ("+printQuestionMarks(vals.length)+") "
    // console.log(queryString);
  var queryString = "INSERT INTO " + table+"("+cols.toString()+") VALUES (?,?) "

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table +" SET "+ objToSql(objColVals)+ " WHERE " +condition;
//var queryString = "UPDATE " + table +" SET "+ objToSql(objColVals)+ " WHERE " +condition;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
 
  delete: function (table, condition, cb) {
   
    var queryString = 'DELETE FROM ' + table+ ' WHERE '+ condition;
console.log(queryString)
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};


 
module.exports = orm;
