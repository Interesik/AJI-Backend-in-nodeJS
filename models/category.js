const bookshelf= require('../config/bookshelf');
const Category = bookshelf.Model.extend({
    tableName: 'kategoria',
    product() {
        return this.belongsTo(Product,'id_kategoria','id')
    }
})

module.exports.getAll = () => {
    return Category.fetchAll();
}
