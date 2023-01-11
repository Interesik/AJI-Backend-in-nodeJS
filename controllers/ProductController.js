const Product = require('../models/product');
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
    // Please note the API change!
    Product.update(req.body.product).then(
        function(product) {
            res.json(product);
        }
    )    
    // const currentProduct = _.find(products,function(product) { return product.id == req.params.id});
    // currentProduct.name = req.body.name;
    // currentProduct.description = req.body.description;
    // currentProduct.price = req.body.price;
    // currentProduct.amount = req.body.amount;
    // res.json({'updatedProduct':currentProduct});
}