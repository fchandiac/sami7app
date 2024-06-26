
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

//findAllByStatusBetweenDates(status, start_date, end_date)

function findAllByStatusBetweenDates(status, start_date, end_date) {
    const cashRegister = new Promise((resolve, reject) => {
        fetch(server_url + 'cashRegisters/findAllByStatusBetweenDates', {
            method: 'POST',
            body: JSON.stringify({ status, start_date, end_date }),
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
    updateClose,
    findAllByStatusBetweenDates
}