const server_url = process.env.API_URL

function create(add, decrement, balance, type, reference,  stock_id) {
    let data = { add, decrement, balance, type, reference, stock_id }
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


function findLastByStock(stock_id) {
    let data = { stock_id }
    const stockMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'stockMovements/findLastByStock', {
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



function findAllByStock(stock_id) {
    let data = { stock_id }
    const stockMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'stockMovements/findAllByStock', {
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
    findLastByStock,
    findAllByStock
}