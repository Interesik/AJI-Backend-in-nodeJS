const bookshelf= require('../config/bookshelf');
const Category = require('../models/category');
const Product = bookshelf.Model.extend({
    tableName: 'produkt',
    category() {
        return this.hasOne(Category.Category,'id_kategoria','id')
    }
})

module.exports.getAll = () => {
    return Product.fetchAll({withRelated: ['Category']});
}

module.exports.getById = (id) => {
    return new Product({'id':id}).fetch();
}

module.exports.create = (product) => {
    return new Product({
        nazwa: product.nazwa,
        opis: product.opis,
        cena_jednostkowa: product.cena_jednostkowa,
        waga_jednostkowa: product.waga_jednostkowa,
        id_kategoria : product.id_kategoria
    }).save();
};

module.exports.update = (product) => {
    return new Product({
        id: product.id
    }).save( {
        nazwa: product.nazwa,
        opis: product.opis,
        cena_jednostkowa: product.cena_jednostkowa,
        waga_jednostkowa: product.waga_jednostkowa,
        id_kategoria : product.id_kategoria
        }, 
        {patch: true}
    );
}