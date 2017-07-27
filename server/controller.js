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
  .catch(error => response.status(500).json({error}));
};



module.exports = {
  getInventory
};