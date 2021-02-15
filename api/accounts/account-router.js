const express = require("express");
const mw = require("../middleware/middleware.js");
const Account = require('./account-model.js');

const router = express.Router();

// GET - 'api/posts' - Get all accounts
router.get('/', async (req, res, next) => {
    try {
        const data = await Account.get();
        res.json(data);
    } catch(error) {
        next(error);
    }
});

// GET - 'api/posts/:id' - Get account by ID
router.get('/:id', mw.checkId, async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Account.getById(id);
        res.json(data);
    } catch(error) {
        next(error);
    }
});

// POST - 'api/posts' - Create new account
router.post('/', async (req, res, next) => {
    try {
        const account = req.body;
        const data = await Account.createAccount(account);
        res.json(data);
    } catch(error) {
        next(error);
    }
});

// PUT - 'api/posts/:id' - Update account
router.put('/:id', mw.checkId, async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const data = await Account.updateAccount(id, changes);
        res.json(data);
    } catch(error) {
        next(error);
    }
});

// DELETE - 'api/posts/:id' - Delete account

module.exports = router;