// async function create(description, status, open, balance, close, open_user_id, close_user_id, sale_point_id) {
//     const cashRegister = await CashRegisters.create({
//         description: description,
//         status: status,
//         open: open,
//         balance: balance,
//         close: close,
//         open_user_id: open_user_id,
//         close_user_id: close_user_id,
//         sale_point_id: sale_point_id
//     }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//      return cashRegister
//  }
 
//  async function findAll() {
//      const cashRegister = await CashRegisters.findAll().then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//      return cashRegister
//  }
 
//  async function findOneById(id) {
//      const cashRegister = await CashRegisters.findOne({ where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//      return cashRegister
//  }
 
//  async function updateStatus(id, status) {
//      const cashRegister = await CashRegisters.update({
//          status: status
//      }, { where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
 
//      return cashRegister
//  }
 
//  async function findAllOpenBySalePoint(sale_point_id) {
//      const cashRegister = await CashRegisters.findAll({ where: { sale_point_id: sale_point_id, status: true } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//      return cashRegister
//  }

// async function balanceCashRegister(cash_register_id, debit, credit) {
//     const cashRegister = await CashRegisters.findOne({ where: { id: cash_register_id } })
//     const balance = cashRegister.balance + credit - debit
//     const updatedCashRegister = await CashRegisters.update({
//         balance: balance
//     }, { where: { id: cash_register_id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })

//     return updatedCashRegister
// }


// function create(name, description) {
//     const category = new Promise((resolve, reject) => {
//         fetch(server_url + 'cashRegisters/create', {
//             method: 'POST',
//             body: JSON.stringify({ name, description }),
//             headers: { 'Content-Type': 'application/json' }
//         }).then(res => {
//             res.json().then(res => {
//                 if (res.code === 0) {
//                     reject(res.data)
//                 } else {
//                     resolve(res.data)
//                 }
//             })
//         }).catch(err => {
//             reject(err)
//         })
//     })
//     return category
// }


const server_url = process.env.API_URL



function create(description, status, open, balance, close, open_user_id, close_user_id, sale_point_id) {
    const cashRegister = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisters/create', {
            method: 'POST',
            body: JSON.stringify({ description, status, open, balance, close, open_user_id, close_user_id, sale_point_id }),
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
    return cashRegister
}

function findAll() {
    const category = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisters/findAll', {
            method: 'GET',
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
    })
    return category
}

function findOneById(id) {
    const category = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisters/findOneById', {
            method: 'POST',
            body: JSON.stringify({ id }),
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
    })
    return category
}

function updateStatus(id, status) {
    const category = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisters/updateStatus', {
            method: 'POST',
            body: JSON.stringify({ id, status }),
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
    })
    return category
}


function  findAllOpenBySalePoint(sale_point_id) {
    const cashRegister = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisters/findAllOpenBySalePoint', {
            method: 'POST',
            body: JSON.stringify({ sale_point_id }),
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
    })
    return cashRegister
}

function balanceCashRegister(cash_register_id, debit, credit) {
    const cashRegister = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisters/balanceCashRegister', {
            method: 'POST',
            body: JSON.stringify({ cash_register_id, debit, credit }),
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
    })
    return cashRegister
}




function updateClose(id, close, close_user_id) {
    const cashRegister = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisters/updateClose', {
            method: 'POST',
            body: JSON.stringify({ id, close, close_user_id }),
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
    })
    return cashRegister
}


export {
    create,
    findAll,
    findOneById,
    updateStatus,
    findAllOpenBySalePoint,
    balanceCashRegister,
    updateClose
}