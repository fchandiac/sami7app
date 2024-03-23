const server_url = process.env.API_URL

function create(name, description, percentage) {
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + 'taxes/create', {
            method: 'POST',
            body: JSON.stringify({ name, description, percentage }),
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
    return tax
}

function findAll() {
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + 'taxes/findAll', {
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
    return tax
}

function findOneById(id) {
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + 'taxes/findOneById', {
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
    return tax
}

function findOneByName(name) {
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + 'taxes/findOneByName', {
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
    return tax
}

function update(id, name, description, percentage) {
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + 'taxes/update', {
            method: 'POST',
            body: JSON.stringify({ id, name, description, percentage }),
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
    return tax
}

function destroy(id) {
    const tax = new Promise((resolve, reject) => {
        fetch(server_url + 'taxes/destroy', {
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
    return tax
}

export {
    create,
    findAll,
    findOneById,
    findOneByName,
    update,
    destroy
}