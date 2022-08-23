const express = require('express');
const customer = require('./routes/Customer');
const item = require('./routes/Item');
const order = require('./routes/Order');
const orderDetail = require('./routes/OrderDetails');

const app = express();

const port = 4000;

app.use(express.json());
app.use('/customers', customer);
app.use('/items', item);
app.use('/orders', order);

app.listen(port,()=>{
    console.log(`app starting on ${port}`);
});
