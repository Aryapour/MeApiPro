import { Router } from 'express';
import { getData } from '../database.js';
let router = Router();
let data = getData()

router.get('/', (req, res) => {
    res.json(data);
});


router.get('/:id', (req, res) => {
    const record = data.find(item => item.id === req.params.id);
    if (record) {
        res.json(record);
    } else {
        res.status(404).json({ "error": "Record not found" });
    }
});

router.post('/', (req, res) => {
    const { id, Firstname, Surname, Email } = req.body;
    if (!id || !Firstname || !Surname || !Email) {
        return res.status(400).json({ "error": "Missing required fields" });
    }

    if (data.find(item => item.id === id)) {
        return res.status(409).json({ "error": "Record already exists" });
    }

    const newRecord = { id, Firstname, Surname, Email };
    data.push(newRecord);
    res.status(201).json(newRecord);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Firstname, Surname, Email } = req.body;

    if (!Firstname || !Surname || !Email) {
        return res.status(400).json({ "error": "Missing required fields" });
    }

    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { id, Firstname, Surname, Email };
        res.status(200).json(data[index]);
    } else {
        const newRecord = { id, Firstname, Surname, Email };
        data.push(newRecord);
        res.status(201).json(newRecord);
    }
});

router.delete('/:id', (req, res) => {
    const index = data.findIndex(item => item.id === req.params.id);
    if (index !== -1) {
        data.splice(index, 1);
        res.status(204).json();
    } else {
        res.status(404).json({ "error": "Record not found" });
    }
});

export default router;
