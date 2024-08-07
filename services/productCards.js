const server_url = process.env.API_URL

function create(product_id, puchase_net, purchase_gross, purchase_tax, sale_net, sale_gross, sale_tax, utility, sale_price_list_id, sale_id, sale_detail_id, purchase_id, purchase_detail_id, storage_id, reception_id, status) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/create', {
            method: 'POST',
            body: JSON.stringify({ product_id, puchase_net, purchase_gross, purchase_tax, sale_net, sale_gross, sale_tax, utility, sale_price_list_id, sale_id, sale_detail_id, purchase_id, purchase_detail_id, storage_id, reception_id, status }),
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
    return productCard
}

function findAllByProduct(product_id) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/findAllByProduct', {
            method: 'POST',
            body: JSON.stringify({ product_id }),
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
    return productCard
}

function countAllByProduct(product_id) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/countAllByProduct', {
            method: 'POST',
            body: JSON.stringify({ product_id }),
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
    return productCard
}

function countAllGroupByProductStorageAndStatus(product_id, storage_id, status) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/countAllGroupByProductStorageAndStatus', {
            method: 'POST',
            body: JSON.stringify({ product_id, storage_id, status }),
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
    return productCard
}


function findAllGroupByProductStorageAndStatus(product_id, storage_id, status) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/findAllGroupByProductStorageAndStatus', {
            method: 'POST',
            body: JSON.stringify({ product_id, storage_id, status }),
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
    return productCard
}

function findAllGroupByProductAndStatus(product_id, status) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/findAllGroupByProductAndStatus', {
            method: 'POST',
            body: JSON.stringify({ product_id, status }),
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
    return productCard
}

function updateStatus(id, status) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/updateStatus', {
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
    return productCard
}

//function findAllGroupByProduct()
function findAllGroupByProduct() {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/findAllGroupByProduct', {
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
    return productCard
}

//findFirstCardByProductAndStorage(product_id, storage_id)

function findFirstCardByProductAndStorage(product_id, storage_id) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/findFirstCardByProductAndStorage', {
            method: 'POST',
            body: JSON.stringify({ product_id, storage_id }),
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
    return productCard
}

// findAllGroupByProductAvailable()

function findAllGroupByProductAvailable() {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/findAllGroupByProductAvailable', {
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
    return productCard
}

//updateSaleId(id, sale_id)

function updateSaleId(id, sale_id) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/updateSaleId', {
            method: 'POST',
            body: JSON.stringify({ id, sale_id }),
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
    return productCard
}

function findAllBySale(sale_id){
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/findAllBySale', {
            method: 'POST',
            body: JSON.stringify({ sale_id }),
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
    return productCard
}

function updateSaleValues(id, sale_id, sale_net, sale_tax, sale_gross, sale_price_list_id) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/updateSaleValues', {
            method: 'POST',
            body: JSON.stringify({ id, sale_id, sale_net, sale_tax, sale_gross, sale_price_list_id }),
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
    return productCard

}

// findAllBySaleAndProduct(sale_id, product_id)

function findAllBySaleAndProduct(sale_id, product_id){
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/findAllBySaleAndProduct', {
            method: 'POST',
            body: JSON.stringify({ sale_id, product_id }),
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
    return productCard
}


// updateSaleDetail(id, sale_detail_id)

function updateSaleDetail(id, sale_detail_id){
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/updateSaleDetail', {
            method: 'POST',
            body: JSON.stringify({ id, sale_detail_id }),
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
    return productCard

}

// function updateutility(id, utility)


function updateutility(id, utility) {
    const productCard = new Promise((resolve, reject) => {
        fetch(server_url + 'productCards/updateutility', {
            method: 'POST',
            body: JSON.stringify({ id, utility }),
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
    return productCard


}

export {
    create,
    findAllByProduct,
    countAllByProduct,
    countAllGroupByProductStorageAndStatus,
    findAllGroupByProductStorageAndStatus,
    findAllGroupByProductAndStatus,
    updateStatus,
    findAllGroupByProduct,
    findFirstCardByProductAndStorage,
    findAllGroupByProductAvailable,
    updateSaleId,
    findAllBySale,
    updateSaleValues,
    findAllBySaleAndProduct,
    updateSaleDetail,
    updateutility
}