const server_url = process.env.API_URL

function create(gross, net, utility,purchase_net, price_list_id, product_id,  taxes) {
    let data = {gross, net, utility,purchase_net, price_list_id, product_id,  taxes }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/create', {
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
    return price
}

function findAll() {
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/findAll', {
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
    return price
}

function findOneById(id) {
    let data = { id }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/findOneById', {
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
    return price
}

function findAllByPriceList(price_list_id) {
    let data = { price_list_id }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/findAllByPriceList', {
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
    return price
}

function update(id, net, gross, utility, price_list_id) {
    let data = { id, net, gross, utility, price_list_id }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/update', {
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
    return price
}

function destroy(id) {
    let data = { id }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/destroy', {
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
    return price
}



function findAllByProductAndPriceList(product_id, price_list_id) {
    let data = { product_id, price_list_id }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/findAllByProductAndPriceList', {
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
    return price
}



function findTaxesBySellingPrice(sellingPriceId) {
    let data = { sellingPriceId }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/findTaxesBySellingPrice', {
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
    return price
}

//  findAllByPriceListGroupByProduct(price_list_id)

function findAllByPriceListGroupByProduct(price_list_id) {
    let data = { price_list_id }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/findAllByPriceListGroupByProduct', {
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
    return price
}

// findAllByProduct(product_id)

function findAllByProduct(product_id) {
    let data = { product_id }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/findAllByProduct', {
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
    return price
}


// updatePurchaseNetByProduct(product_id, purchase_net)

function updatePurchaseNetByProduct(product_id, purchase_net) {
    let data = { product_id, purchase_net }
    const price = new Promise((resolve, reject) => {
        fetch(server_url + 'sellingPrices/updatePurchaseNetByProduct', {
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
    return price
}


export {
    create,
    findAll,
    findOneById,
    findAllByPriceList,
    update,
    destroy,
    findAllByProductAndPriceList,
    findTaxesBySellingPrice,
    findAllByPriceListGroupByProduct,
    findAllByProduct,
    updatePurchaseNetByProduct
}