const Account = require('../accounts/account-model.js');

module.exports = {
    checkId
}

// Middleware
// Check if ID exists
async function checkId(req, res, next) {
    const { id } = req.params;
    const idExists = await Account.getById(id)
    if (idExists) {
        next();
    } else {
        res.status(400).json({
            message: "Account ID does not exist in the DB"
        });
    }
}

function checkPayload(req, res, next) {

}