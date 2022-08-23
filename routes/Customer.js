const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../configs/db.configs');
const {query} = require("express");

const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the MySQL Server");
        var customerTableQuery = "CREATE TABLE IF NOT EXISTS Customers (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), salary DOUBLE )";
        connection.query(customerTableQuery, function (err, result) {
            if (result.warningCount === 0) {
                console.log("Customer table created");
            }
        })
    }
})

router.get('/', (req, res) => {
    var getAllCustomersQuery = "SELECT * FROM Customers";
    connection.query(getAllCustomersQuery, (err, rows) => {
        if (err) console.log(err)
        res.send(rows);
    })
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const salary = req.body.salary;

    var query = "INSERT INTO Customers (id,name,address,salary) VALUES (?,?,?,?)";

    connection.query(query, [id, name, address, salary], (err) => {
        if (err) {
            res.send({'message': 'duplicate entry'})
        } else {
            res.send({'message': 'Customer Saved'})
        }
    })
})

router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const salary = req.body.salary;

    var query = "UPDATE Customers SET name=?,address=?,salary=? WHERE id=?";

    connection.query(query,[name,address,salary,id],(err,rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0 ){
            res.send({'message': 'Customer Updated'})
        } else {
            res.send({'message': 'Customer Not Updated'})
        }
    })
})

router.get('/:id',(req,res) => {
    const id = req.params.id;

    var query = "SELECT * FROM Customers WHERE id=?"

    connection.query(query,[id],(err,row) => {
        if (err) console.log(err)
        res.send(row)
    })
})

router.delete('/:id',(req,res) => {
    const id = req.params.id;

    var query = "DELETE FROM Customers WHERE id=?"

    connection.query(query,[id],(err,row) => {
        if (err) console.log(err);

        if (row.affectedRows > 0) {
            res.send({ "message": "customer is deleted" })
        } else {
            res.send({ "message": "customer is not found. try again" })
        }
    })
})

module.exports = router