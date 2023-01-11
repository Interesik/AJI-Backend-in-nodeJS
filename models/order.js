const bookshelf= require('../config/bookshelf');

const Order = bookshelf.Model.extend({
    tableName: 'zamowienie'
    // products() {
    //     return this.hasMany('')
    // }
    // hasMany
})

module.exports.getAll = () => {
    return Order.forge().fetchAll();
}