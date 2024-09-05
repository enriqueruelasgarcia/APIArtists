const mysql = require('../node_modules/mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'singers'
});
mysqlConnection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Connection stablished')
    }
})
module.exports = mysqlConnection;