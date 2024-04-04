const server_url = process.env.API_URL

function create(name, description) {
    const priceList = new Promise((resolve, reject) => {
        fetch(server_url + 'priceLists/create', {
            method: 'POST',
            body: JSON.stringify({ name, description }),
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
    return priceList
}

function findAll() {
    const priceList = new Promise((resolve, reject) => {
        fetch(server_url + 'priceLists/findAll', {
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
    return priceList
}

function findOneById(id) {
    const priceList = new Promise((resolve, reject) => {
        fetch(server_url + 'priceLists/findOneById', {
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
    return priceList
}

function update(id, name, description) {
    const priceList = new Promise((resolve, reject) => {
        fetch(server_url + 'priceLists/update', {
            method: 'POST',
            body: JSON.stringify({ id, name, description }),
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
    return priceList
}

function destroy(id) {
    const priceList = new Promise((resolve, reject) => {
        fetch(server_url + 'priceLists/destroy', {
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
    return priceList
}


function findOneByName(name){
    const priceList = new Promise((resolve, reject) => {
        fetch(server_url + 'priceLists/findOneByName', {
            method: 'POST',
            body: JSON.stringify({ name }),
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
    return priceList
}




export {
    create,
    findAll,
    findOneById,
    update,
    destroy,
    findOneByName
}