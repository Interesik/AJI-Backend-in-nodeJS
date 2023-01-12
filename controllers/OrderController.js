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
        if (!order.attributes.numer_telefonu || !/^\d+$/.test(order.attributes.phone_number)) {
            throw new Error("Wrong phone number")
        } else if (!order.attributes.email || !order.attributes.email.match(/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/)) {
            throw new Error("Wrong email address")
        } else if (!order.attributes.nazwa_uzytkownika) {
            throw new Error("Wrong username")
        }
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
        }).catch((error) => {
            res.status(400).json({'message': error.message});
        })
    //products.push(newProduct);
    });
};

exports.updateStatusById = (req, res) => {
    knex.select('id_stan_zamowienia').from('zamowienie').where('id', req.params.id).then(
        function(order) {
            if (!order.length) {
                throw new Error("Order with this id doesn't exist")
            } else if (JSON.parse(JSON.stringify(order))[0].id_stan_zamowienia >= req.params.status ||
            JSON.parse(JSON.stringify(order))[0].id_stan_zamowienia == 3) {
                throw new Error(`Can't change to this order status`)
            } 
            Orders.update(req.params.id, req.params.status).then(
                function() {
                    res.status(200).json({'message': "Order updated"});
                }
            ).catch((error) => {
                res.status(400).json({'message': error.message});
            })
        }
    ).catch((error) => {
        res.status(400).json({'message': error.message});
    })
 };

