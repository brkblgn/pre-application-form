require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8800;
const app = express();

app.use(express.json());
app.use(cors());

const database = require('./config/db');

app.get('/', (req, res) => {
    res.json({response: 'backend here'});
});

app.get('/answers', (req, res) => {
    const q = 'SELECT id, name, phone, email, city, investment FROM answers ORDER BY id DESC';
    database.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    });
});

app.post('/answers', (req, res) => {
    const data = req.body;
    const q = `INSERT INTO answers(${ Object.keys(data).map(key => `\`${ key }\``) }) VALUES (?)`;
    database.query(q, [Object.values(data)], (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    });
});

app.get('/answers/:id', (req, res) => {
    const q = `SELECT * FROM answers WHERE id = ${ req.params.id }`;
    database.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    });
});

app.delete('/answers/:id', (req, res) => {
    const q = `DELETE FROM answers WHERE id = ${ req.params.id }`;
    database.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT:${ PORT }`)
});