const Orders = require('../models/order');
const _ = require('underscore');

exports.getAll = (req, res) => {
    Orders.getAll().then(
        function(allOrders) {
            console.log(allOrders);
            res.json(allOrders);
        }
    );
    //res.json(products);
};