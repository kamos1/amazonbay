exports.up = function(knex, Promise){
  return Promise.all([

    knex.schema.createTable('inventory', (table) => {
      table.increments('id').primary();
      table.string('title').unique();
      table.string('description');
      table.string('image');
      table.decimal('price', 8, 2)

      table.timestamps(true, true);
    }),

    knex.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.decimal('total', 8, 2);

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise){
  return Promise.all([
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('inventory')
  ]);
};

