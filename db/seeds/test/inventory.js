
exports.seed = function(knex, Promise) {
  return knex('inventory').del()
    .then(function () {
      return knex('inventory').insert([
        {id: 1, title: 'toothbrush', description: 'Toothbrush improves oral health', image: 'http://images.gumbrand.com/media/catalog/product/cache/1/image/600x600/9df78eab33525d08d6e5fb8d27136e95/4/3/430_us_r_1ct_12-14.png', price: 2.00},
        {id: 2, title: 'pencil', description: '#2 graphite core formula provides extra smooth performance', image: 'http://thefw.com/files/2017/03/Pencil.jpg?w=600&h=0&zc=1&s=0&a=t&q=89', price: 2.00},
        {id: 3, title: 'soap', description: 'Cleanses while leaving skin feeling healthy and strong', image: 'http://greglturnquist.com/wp-content/uploads/2016/05/soap.jpg', price: 2.00},
      ]);
    });
};
