const Product = require('../models/product');
const { knex } = require('../config/bookshelf');
const _ = require('underscore');

exports.getAll = (req, res) => {
    Product.getAll().then(
        function(allProducts) {
            console.log(allProducts);
            res.json(allProducts);
        }
    );
    //res.json(products);
};

exports.getById = (req, res) => {
    Product.getById(req.params.id).then(
        function(product) {
            res.json(product);
        }
    );
    
    //res.json(_.find(products,function(product) { return product.id == req.params.id}));
};

exports.store = (req, res) => {
    const newProduct = Product.create({
        'nazwa': req.body.nazwa,
        'opis': req.body.opis,
        'cena_jednostokowa': req.body.cena_jednostokowa,
        'waga_jednostokowa': req.body.waga_jednostokowa,
        'id_kategoria' : req.body.id_kategoria,
    }).then(function() {
        res.json({
            'status':'saved!',
            'product': newProduct,
        });
    });


    //products.push(newProduct);
    
};

exports.updateById = (req, res) => {
    if (!req.body.nazwa || !req.body.opis)
        throw Error('name or description are not defined')
    else if(!req.body.cena_jednostokowa || !req.body.waga_jednostokowa)
        throw Error('price or wage are not defined')
    else if(req.body.cena_jednostokowa <= 0 || req.body.waga_jednostokowa <= 0)
        throw Error('Product params are not correct')
    else if(!req.body.id_kategoria)
        throw Error('category is not defined')
    knex.select('id').from('kategoria').where('id', req.body.id_kategoria).then(
        function(category){
            if(!category.length)
                throw Error('Category dont exists')
        // Please note the API change!
            Product.update(req.params.id,req.body).then(
                function(product) {
                    res.json(product);
                }
            )
        }
    ).catch((error) => {
        res.status(400).json({'message': error.message});
    })
    // const currentProduct = _.find(products,function(product) { return product.id == req.params.id});
    // currentProduct.name = req.body.name;
    // currentProduct.description = req.body.description;
    // currentProduct.price = req.body.price;
    // currentProduct.amount = req.body.amount;
    // res.json({'updatedProduct':currentProduct});
}