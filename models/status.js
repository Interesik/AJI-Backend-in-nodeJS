const bookshelf= require('../config/bookshelf');

const Status = bookshelf.Model.extend({
    tableName: 'stan_zamowienia'
})

module.exports.getAll = () => {
    return Status.fetchAll();
}