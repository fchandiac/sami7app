const server_url = process.env.API_URL


function create(description, add, decrement, balance, type, reference, user_id, product_id, storage_id) {
    let data = { description, add, decrement, balance, type, reference, user_id, product_id, storage_id }
    const stockMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'stockMovements/create', {
            method: 'POST',
            body: JSON.stringify(data),
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
    return stockMovement
}

function findAllByProductAndStorage(product_id, storage_id) {
    let data = { product_id, storage_id }
    const stockMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'stockMovements/findAllByProductAndStorage', {
            method: 'POST',
            body: JSON.stringify(data),
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
    return stockMovement
}

function findLastByProductAndStorage(product_id, storage_id) {
    let data = { product_id, storage_id }
    const stockMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'stockMovements/findLastByProductAndStorage', {
            method: 'POST',
            body: JSON.stringify(data),
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
    return stockMovement
}

export {
    create,
    findAllByProductAndStorage,
    findLastByProductAndStorage
}