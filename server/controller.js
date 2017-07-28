const database = require('../db/knex');

const getInventory = (request, response) => {
  database('inventory').select()
  .then((items) => {
    if (items.length) {
      response.status(200).json(items);
    } else {
      response.status(404).json({error: 'nothing was found in the inventory'});
    }
  })
  .catch(error => response.status(500).json({ error }));
};

const addOrder = (request, response) => {
  const order = request.body.total;

  database('orders').insert({total: order}, 'id')
  .then(total => {
    const id = total[0]
    response.status(201).json({id: total[0]})
  })
  .catch(error => response.status(500).json({ error }))
}

const getOrder = (request, response) => {
  database('orders').select()
  .then((order) => {
    if(order.length) {
      response.status(200).json(order);
    } else {
      response.status(404).json({error:`Could not find folder with id of ${request.params.id}`});
    }
  })
  .catch( error => response.status(500).json({error}))
}

module.exports = {
  getInventory,
  addOrder,
  getOrder
};