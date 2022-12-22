var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '1234567890',
      database : 'apiusers'
    }
  });

module.exports = knex;