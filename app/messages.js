const express = require('express');
const router = express.Router();
const nanoid = require('nanoid');
const multer = require('multer');
const path = require('path');
const config = require('../config')
const fileDb = require('../fileDb');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage})

router.get('/', (req, res) => {
    res.send(fileDb.getItems())
});

router.post('/', upload.single('image'), (req, res) => {
    const message = req.body

    if (!message.title) {
        return res.status(404).send('Message should contain text')
    }

    if (req.file) {
        message.image = req.file.filename;
    }

    message.id = nanoid();

    fileDb.addItem(message)
    res.send('OK')
});

router.get('/:id', (req, res) => {
    res.send('Single message')
});

module.exports = router;
