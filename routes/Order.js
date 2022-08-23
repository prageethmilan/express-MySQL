/*
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../configs/db.configs');

const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
    if (err){
        console.log(err);
    } else {
        console.log("Connected to the MySQL Server");
        var orderTableQuery = "CREATE TABLE IF NOT EXISTS `Orders`(oid VARCHAR(15),date VARCHAR(255),cId VARCHAR(15),total DOUBLE,CONSTRAINT PRIMARY KEY (oid),CONSTRAINT FOREIGN KEY (cId) REFERENCES Customers(id) ON DELETE CASCADE ON UPDATE CASCADE)";
        connection.query(orderTableQuery,function (err, result) {
            console.log(result);
        })
    }
})


module.exports = router*/
