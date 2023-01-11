const bookshelf= require('../config/bookshelf');

const OrderProduct = bookshelf.Model.extend({
    tableName: 'produkt_zamowienie'
})

module.exports.getAll = () => {
    return OrderProduct.fetchAll();
}