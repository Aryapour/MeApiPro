import { Router } from 'express';
let router = Router();

let data = [
    { "id": "1", "Firstname": "Jyri", "Surname": "Kemppainen" },
    { "id": "2", "Firstname": "Petri", "Surname": "Laitinen" }
];

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

function isValidUser(user) {
    const requiredFields = ['id', 'Firstname', 'Surname'];
    const hasRequiredFieldsOnly = Object.keys(user).every(
        key => requiredFields.includes(key) && typeof user[key] === 'string'
    ) && Object.keys(user).length === requiredFields.length;

    return hasRequiredFieldsOnly;
}

router.post('/', (req, res) => {
    if (data.find(b => b.id === req.body.id)) {
        res.status(409).json({ "Error": "Record already exists" });
    } else if (!isValidUser(req.body)) {
        res.status(400).json({ "Error": "Invalid data format" });
    } else {
        data = [...data, req.body];
        res.status(201).json(req.body);  
    }
});

export default router;
