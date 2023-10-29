const { connect, connection } = require('mongoose');

//connection between database and mongoose
connect('mongodb://127.0.0.1:27017/socialNetworkDB');

module.exports = connection;