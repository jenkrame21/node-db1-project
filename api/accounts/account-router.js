const express = require("express");
const mw = require("../middleware/middleware.js");
const Account = require('./account-model.js');

const router = express.Router();

// GET - 'api/posts' - Get all accounts
router.get('/', async (req, res, next) => {
    try {
        const data = await Account.get();
        res.json(data);
    } catch(err) {
        next(err);
    }
});

// GET - 'api/posts/:id' - Get account by ID
router.get('/:id', mw.checkId, async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Account.getById(id);
        res.json(data);
    } catch(err) {
        next(err);
    }
});

// POST - 'api/posts' - Create new account
router.post('/', mw.checkPayload, async (req, res, next) => {
    try {
        const account = req.body;
        const data = await Account.create(account);
        res.json(data);
    } catch(err) {
        next(err);
    }
});

// PUT - 'api/posts/:id' - Update account
router.put('/:id', mw.checkPayload, mw.checkId, async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const data = await Account.update(id, changes);
        res.json(data);
    } catch(err) {
        next(err);
    }
});

// DELETE - 'api/posts/:id' - Delete account
router.delete('/:id', mw.checkId, async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Account.remove(id);
        res.json(data);
    } catch(err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
})

module.exports = router;