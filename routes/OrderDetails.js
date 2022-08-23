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
        var orderDetailTableQuery = "CREATE TABLE IF NOT EXISTS `Order Detail`(orderId VARCHAR(255),itemCode VARCHAR(15),qty INT,unitPrice DOUBLE CONSTRAINT PRIMARY KEY (orderId,itemCode),CONSTRAINT FOREIGN KEY (orderId) REFERENCES Orders(oid) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT FOREIGN KEY (itemCode) REFERENCES Items(code) ON DELETE CASCADE ON UPDATE CASCADE)";
        connection.query(orderDetailTableQuery,function (err, result) {
            console.log(result);
        })
    }
})


module.exports = router*/
