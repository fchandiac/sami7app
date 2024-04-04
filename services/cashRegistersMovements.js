// async function create(description, type, previous_balance, debit, credit, balance, reference_id, user_id, paymentMethod_id, cash_register_id) {
//     const cashRegisterMovement = await CashRegisterMovements.create({
//         description: description,
//         type: type,
//         previous_balance: previous_balance,
//         debit: debit,
//         credit: credit,
//         balance: balance,
//         reference_id: reference_id,
//         user_id: user_id,
//         paymentMethod_id: paymentMethod_id,
//         cash_register_id: cash_register_id
//     }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//     return cashRegisterMovement
// }

// async function findAllByCashRegister(cash_register_id) {
//     const cashRegisterMovement = await CashRegisterMovements.findAll({
//          where: { cash_register_id: cash_register_id }, 
//          order: [['createdAt', 'DESC']]
//         }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//     return cashRegisterMovement
// }

// async function findLastByCashRegister(cash_register_id) {
//     const cashRegisterMovement = await CashRegisterMovements.findOne({
//          where: { cash_register_id: cash_register_id }, 
//          order: [['createdAt', 'DESC']]
//         }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//     return cashRegisterMovement
// }

// router.post('/cashRegisterMovements/create', async (req, res) => {
//     const { description, type, previous_balance, debit, credit, balance, reference_id, user_id, paymentMethod_id, cash_register_id } = req.body
//     const cashRegisterMovement = await cashRegisterMovements.create(description, type, previous_balance, debit, credit, balance, reference_id, user_id, paymentMethod_id, cash_register_id)
//     res.json(cashRegisterMovement)
// })

// router.post('/cashRegisterMovements/findAllByCashRegister', async (req, res) => {
//     const { cash_register_id } = req.body
//     const cashRegisterMovement = await cashRegisterMovements.findAllByCashRegister(cash_register_id)
//     res.json(cashRegisterMovement)
// })

// router.post('/cashRegisterMovements/findLastByCashRegister', async (req, res) => {
//     const { cash_register_id } = req.body
//     const cashRegisterMovement = await cashRegisterMovements.findLastByCashRegister(cash_register_id)
//     res.json(cashRegisterMovement)
// })


const server_url = process.env.API_URL

function create(cash, description, type, previous_balance, debit, credit, balance, reference_id, user_id, cash_register_id) {
    const cashRegisterMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisterMovements/create', {
            method: 'POST',
            body: JSON.stringify({cash,  description, type, previous_balance, debit, credit, balance, reference_id, user_id, cash_register_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    }
    )
    return cashRegisterMovement
}

function findAllByCashRegister(cash_register_id) {
    const cashRegisterMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisterMovements/findAllByCashRegister', {
            method: 'POST',
            body: JSON.stringify({ cash_register_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    }
    )
    return cashRegisterMovement
}

function findLastByCashRegister(cash_register_id) {
    const cashRegisterMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisterMovements/findLastByCashRegister', {
            method: 'POST',
            body: JSON.stringify({ cash_register_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    }
    )
    return cashRegisterMovement
}



function cashAmount(cash_register_id) {
    const cashRegisterMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisterMovements/cashAmount', {
            method: 'POST',
            body: JSON.stringify({ cash_register_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    }
    )
    return cashRegisterMovement
}

export {
    create,
    findAllByCashRegister,
    findLastByCashRegister,
    cashAmount
}


