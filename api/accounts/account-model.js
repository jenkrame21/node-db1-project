const db = require("../../data/dbConfig.js");

module.exports = {
    get,
    getById,
    createAccount,
    updateAccount
}

// GET - Get all accounts
function get() {
    return db("accounts");
}

// GET - Get accounts by ID
function getById(id) {
    return db("accounts").where("id", id).first();
}

// POST - Create new account
function createAccount(account) {
    return db("accounts").insert(account)
        .then(([id]) => {
            return db("accounts").where("id", id).first();
        });
}

// PUT - Update account
function updateAccount(id, account) {
    const accountId = id
    return db("accounts").where("id", id).update(account)
        .then(() => {
            return db("accounts").where("id", accountId).first();
        });
}

// // DELETE - Delete account
// function removeAccount() {

// }
