const bookshelf= require('../config/bookshelf');

const Order = bookshelf.Model.extend({
    tableName: 'zamowienie',
    products() {
        return this.hasMany(OrderProducts,'id_zamowienia')
    }
    // hasMany
})
const OrderProducts = bookshelf.Model.extend({
    tableName: 'produkt_zamowienie'
})

module.exports.getAll = () => {
    return Order.fetchAll({
        withRelated: ['products']
    });
}

module.exports.createProducts = (orderProducts) => {
    return new OrderProducts({
        liczba_produkow: orderProducts.liczba_produkow,
        id_zamowienia:  orderProducts.id_zamowienia,
        id_produktu: orderProducts.id_produktu
    }).save();
}


module.exports.save = (order) => {
    return new Order({
        data_zatwierdzenia: order.data_zatwierdzenia,
        id_stan_zamowienia: order.id_stan_zamowienia,
        nazwa_uzytkownika: order.nazwa_uzytkownika,
        email: order.email,
        numer_telefonu : order.numer_telefonu
    }).save();
};
module.exports.update = (id,order) => {
    return new Order({
        id: id
    }).save( {
        nazwa: order.data_zatwierdzenia,
        id_stan_zamowienia: order.id_stan_zamowienia,
        nazwa_uzytkowania: order.nazwa_uzytkowania,
        email: order.email,
        numer_telefonu : order.numer_telefonu
        }, 
        {patch: true}
    );
}

module.exports.updateStatus = (id,status) => {
    return new Order({
        id: id
    }).save( {
        id_stan_zamowienia: status,
        },
        {patch: true}
    );
}
module.exports.getStatusOrders = (status) => {
    return new Order().query(qb => {
        qb.where('id_stan_zamowienia', status)
    }).fetchAll({
        withRelated: ['products']
    })
}
