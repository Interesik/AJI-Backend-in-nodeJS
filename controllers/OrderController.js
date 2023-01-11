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

exports.store = (req, res) => {
    const newOrder = Orders.save({
        'data_zatwierdzenia': req.body.data_zatwierdzenia,
        'id_stan_zamowienia': req.body.id_stan_zamowienia,
        'nazwa_uzytkownika': req.body.nazwa_uzytkownika,
        'email': req.body.email,
        'numer_telefonu': req.body.numer_telefonu,
    })
    newOrder.then(function(order) {
        let promises = []
        req.body.orderProducts.forEach(orderProducts => {
            promises.push(Orders.createProducts({
                'liczba_produkow': orderProducts.liczba_produkow,
                'id_zamowienia':  newOrder.id_zamowienia,
                'id_produktu': orderProducts.id_produktu
            }))
        })
        Promise.all(promises).then(function() {
            res.status(200).json({
                'message':'Order succesfully created'
            });
        });
    //products.push(newProduct);
    });
};