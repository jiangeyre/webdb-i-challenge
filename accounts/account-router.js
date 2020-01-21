const router = require('express').Router();
const db = require('../data/dbConfig');

router.get('/api', (req, res) => {
    const { limit, sortby, sortdir } = req.query;

    db('accounts')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .then(accounts => res.status(200).json(accounts))
    .catch(err => res.status(500).json({ message: 'Failed to get accounts' }))
});

router.get('/api/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(accounts => res.status(200).json(accounts))
        .catch(err => res.status(500).json({ message: 'Failed to get account' }))
});

router.post('/api', (req, res) => {
    const acctData = req.body;

    (!acctData.name || !acctData.budget) ? res.status(400).json({ errorMessage: "Please provide name and budget for the account." }) :
    db('accounts')
        .insert(acctData, 'id')
        .then(([id]) => {
            db('accounts')
                .where({ id })
                .first()
                .then(act => {
                    res.status(200).json(act);
                });
        })
        .catch(err => res.status(500).json({ message: 'Error adding account' }))
});

router.put('/api/:id', (req, res) => { 
    const accountChanges = req.body;

    db('accounts')
        .where('id', req.params.id)
        .update(accountChanges)
        .then(res => res.status(200).json({ message: 'Account updated' }))
        .catch(err => res.status(500).json({ message: 'Error adding account' }))
});

router.delete('/api/:id', (req, res) => {
        db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => res.status(200).json({ message: `Deleted records: ${count}` }))
        .catch(err => res.status(500).json({ message: 'Failed to get account' }))
});

module.exports = router;