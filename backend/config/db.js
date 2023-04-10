const mysql = require('mysql2');

const databaseName = 'test';
const values = [
    ['11111111111', 'test test', '+90512345678', 'test@mail.com', '1997-12-03', 'ANTALYA', 'KUMLUCA', 100000, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec velit in metus commodo tempus. Nam finibus blandit tempus. Suspendisse tincidunt dui non ultricies congue. Lorem ipsum dolo', 'Nunc viverra egestas turpis ac vulputate. Nunc malesuada turpis nec consequat sagittis. Sed imperdiet nulla eu eros lacinia, eu lobortis tellus elementum'],
    ['22222222222', 'name surname', '+90512345698', 'test1@mail.com', '2001-02-13', 'EDİRNE', 'MERKEZ', 65479.99, 0, 'Aliquam ut massa eget nulla interdum pulvinar. Donec vulputate mattis ullamcorper. Pellentesque feugiat pulvinar vestibulum. Nunc eros dolor, luctus sed diam suscipit', 'Pellentesque accumsan a lacus at mattis. Nulla et nulla ipsum. Nulla bibendum iaculis libero'],
    ['33333333333', 'test2 test2', '+90512345679', 'test2@mail.com', '1991-09-29', 'TEKİRDAĞ', 'ÇORLU', 500000, 1, 'Sed accumsan aliquam elit et egestas. Aenean lacus mi, dapibus nec magna eu, lacinia euismod tellus. Sed aliquam ut sem quis vestibulum', 'Ut porttitor ex ac augue faucibus congue. Proin velit nulla, blandit ac ornare tempus, sollicitudin ac turpis. Sed lorem leo, elementum eget'],
]

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    typeCast: function (field, next) {
        if (field.type == 'BINARY') {
            return field.string();
        }
        return next();
    }
})

db.connect(err => {
    if (err) {
        console.error('Database Connection Failed', err);
    } else {
        console.log('Connected To Database');
    }
});

db.query(`DROP DATABASE IF EXISTS ${ databaseName }`);

db.query(`CREATE DATABASE ${ databaseName }`, err => {
    if (err) {
        console.error('Database Creation Failed', err);
    } else {
        console.log(`Database Created: ${ databaseName }`);

        db.query(`USE ${ databaseName }`, err => {
            if (err) {
                console.error('Database Connection Failed', err);
            } else {
                console.log(`Using ${ databaseName } Database`);

                db.query(`CREATE TABLE answers(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    tcn VARCHAR(11) NOT NULL,
                    address VARCHAR(255) NOT NULL,
                    phone VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    birthday DATE NOT NULL,
                    experience TINYINT NOT NULL,
                    reason TEXT(1000),
                    city VARCHAR(255) NOT NULL,
                    province VARCHAR(255) NOT NULL,
                    district VARCHAR(255),
                    investment DECIMAL(10,2) NOT NULL,
                    extra TEXT(1000),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) CHARACTER SET utf8mb4`, err => {
                    if (err) {
                        console.error('Table Creation Failed', err);
                    } else {
                        console.log('Table Created: answers');

                        db.query('INSERT INTO answers(tcn, name, phone, email, birthday, city, province, investment, experience, address, reason) VALUES ?', [values]);
                    }
                });
            }
        })
    }
});

module.exports = db;