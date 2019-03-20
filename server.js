const express = require('express');
const cors = require('cors');

const fileDb = require('./fileDb');
fileDb.init();

const app = express();
app.use(express.json());
app.use(express.static('public'))

app.use(cors());

const port = 8000;

const messages = require('./app/messages');

app.use('/messages', messages);

app.listen(port, () => {
    console.log('Server started on  port')
});
