const Transaction = require('../models/Transaction')

// @desc GET all transactions 
// @route GET /api/v1/transactions
// @access Public

exports.getTransaction = async (req, res, next) => {
    try {

        // need await since this is a promise
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success:false,
            error: 'Server Error'
        })
    }
}

// @desc ADD transactions
// @route POST /api/v1/transactions
// @access Public

exports.addTransaction = async (req, res, next) => {

    try {
    const {text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
        success: true,
        data: transaction
    })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            
            // 400 bc client error, didnt send what its suppose to 
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc DELETE transactions
// @route DELETE /api/v1/transactions/:id
// @access Public

exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction '
            });
        }

        await transaction.remove(); 

        return res.status(200).json({
            success: true,
            data: {} 
        });

    } catch (err) {
        return res.status(500).json({
            success:  false,
            error: 'Server Error'
        });
    }
}

