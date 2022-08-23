const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../configs/db.configs');

const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
    if (err){
        console.log(err);
    } else {
        var itemTableQuery = "CREATE TABLE IF NOT EXISTS Items (code VARCHAR(255) PRIMARY KEY, description VARCHAR(255), qtyOnHand VARCHAR(255), price DOUBLE)";
        connection.query(itemTableQuery,function (err, result) {
            if (result.warningCount === 0){
                console.log("Item table created");
            }
        })
    }
})

router.get('/', (req, res) => {
    var getAllItemsQuery = "SELECT * FROM Items";
    connection.query(getAllItemsQuery, (err, rows) => {
        if (err) console.log(err)
        res.send(rows);
    })
})

router.post('/', (req, res) => {
    const code = req.body.code;
    const description = req.body.description;
    const qtyOnHand = req.body.qtyOnHand;
    const price = req.body.price;

    var query = "INSERT INTO Items (code,description,qtyOnHand,price) VALUES (?,?,?,?)";

    connection.query(query, [code,description,qtyOnHand,price], (err) => {
        if (err) {
            res.send({'message': 'duplicate entry'})
        } else {
            res.send({'message': 'Item Saved'})
        }
    })
})

router.put('/', (req, res) => {
    const code = req.body.code;
    const description = req.body.description;
    const qtyOnHand = req.body.qtyOnHand;
    const price = req.body.price;

    var query = "UPDATE Items SET description=?,qtyOnHand=?,price=? WHERE code=?";

    connection.query(query,[description,qtyOnHand,price,code],(err,rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0 ){
            res.send({'message': 'Item Updated'})
        } else {
            res.send({'message': 'Item Not Updated'})
        }
    })
})

router.get('/:code',(req,res) => {
    const code = req.params.code;

    var query = "SELECT * FROM Items WHERE code=?"

    connection.query(query,[code],(err,row) => {
        if (err) console.log(err)
        res.send(row)
    })
})

router.delete('/:code',(req,res) => {
    const code = req.params.code;

    var query = "DELETE FROM Items WHERE code=?"

    connection.query(query,[code],(err,row) => {
        if (err) console.log(err);

        if (row.affectedRows > 0) {
            res.send({ "message": "Item is deleted" })
        } else {
            res.send({ "message": "Item is not found. try again" })
        }
    })
})




module.exports = router