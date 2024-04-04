const server_url = process.env.API_URL



// function create(description, status, open, balance, close, open_user_id, close_user_id, sale_point_id) {
//     const cashRegister = new Promise((resolve, reject) => {
//         fetch(server_url + 'cashRegisters/create', {
//             method: 'POST',
//             body: JSON.stringify({ description, status, open, balance, close, open_user_id, close_user_id, sale_point_id }),
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
//     }
//     )
//     return cashRegister
// }

// async function create(name, description, credit) {
//     const paymentMethod = await PaymentMethods.create({
//         name: name,
//         description: description,
//         credit: credit
//     }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//     return paymentMethod
// }

// async function findAll() {
//     const paymentMethod = await PaymentMethods.findAll().then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//     return paymentMethod
// }

// async function findOneById(id) {
//     const paymentMethod = await PaymentMethods.findOne({ where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//     return paymentMethod
// }

// async function update(id, name, description, credit) {
//     const paymentMethod = await PaymentMethods.update({
//         name: name,
//         description: description,
//         credit: credit
//     }, { where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })

//     return paymentMethod
// }

// async function destroy(id) {
//     const paymentMethod = await PaymentMethods.destroy({ where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
//     return paymentMethod
// }

function create(name, description, credit) {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/create', {
            method: 'POST',
            body: JSON.stringify({ name, description, credit }),
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
    return paymentMethod
}

function findAll() {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/findAll', {
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
    }
    )
    return paymentMethod
}

function findOneById(id) {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/findOneById', {
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
    }
    )
    return paymentMethod
}

function update(id, name, description, credit) {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/update', {
            method: 'POST',
            body: JSON.stringify({ id, name, description, credit }),
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
    return paymentMethod
}

function destroy(id) {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/destroy', {
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
    }
    )
    return paymentMethod
}

module.exports = {
    create,
    findAll,
    findOneById,
    update,
    destroy
}
