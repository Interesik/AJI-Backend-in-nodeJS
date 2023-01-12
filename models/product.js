const bookshelf= require('../config/bookshelf');
const Product = bookshelf.Model.extend({
    tableName: 'produkt',
    category() {
        return this.hasOne(Category,'id','id_kategoria')
    }
})
const Category = bookshelf.Model.extend({
    tableName: 'kategoria',
})

module.exports.getAll = () => {
    return Product.fetchAll({withRelated: ['category']});
}

module.exports.getById = (id) => {
    return new Product({'id':id}).fetch({withRelated: ['category']});
}

module.exports.create = (pr) => {
    return new Product({
        nazwa: pr.nazwa,
        opis: pr.opis,
        cena_jednostokowa: pr.cena_jednostokowa,
        waga_jednostokowa: pr.waga_jednostokowa,
        id_kategoria: pr.id_kategoria
    }).save();
};

module.exports.update = (id,product) => {
    return new Product({
        id: id
    }).save( {
        nazwa: product.nazwa,
        opis: product.opis,
        cena_jednostokowa: product.cena_jednostokowa,
        waga_jednostokowa: product.waga_jednostokowa,
        }, 
        {patch: true}
    );
}