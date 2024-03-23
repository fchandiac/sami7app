const server_url = process.env.API_URL

function create(name, description) {
    const category = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/create', {
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
    return category
}

function findAll() {
    const category = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/findAll', {
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
        fetch(server_url + 'categories/findOneById', {
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

function update(id, name, description) {
    const category = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/update', {
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
    return category
}

function destroy(id) {
    const category = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/destroy', {
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

export {
    create,
    findAll,
    findOneById,
    update,
    destroy
}