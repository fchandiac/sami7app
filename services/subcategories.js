const server_url = process.env.API_URL

function create(name, description, category_id) {
    const subcategory = new Promise((resolve, reject) => {
        fetch(server_url + 'subcategories/create', {
            method: 'POST',
            body: JSON.stringify({ name, description, category_id }),
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
    return subcategory
}

function findAll() {
    const subcategory = new Promise((resolve, reject) => {
        fetch(server_url + 'subcategories/findAll', {
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
    return subcategory
}

function findOneById(id) {
    const subcategory = new Promise((resolve, reject) => {
        fetch(server_url + 'subcategories/findOneById', {
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
    return subcategory
}

function findAllByCategory(category_id) {
    const subcategory = new Promise((resolve, reject) => {
        fetch(server_url + 'subcategories/findAllByCategory', {
            method: 'POST',
            body: JSON.stringify({ category_id }),
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
    return subcategory
}

function update(id, name, description, category_id) {
    const subcategory = new Promise((resolve, reject) => {
        fetch(server_url + 'subcategories/update', {
            method: 'POST',
            body: JSON.stringify({ id, name, description, category_id }),
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
    return subcategory
}

function destroy(id) {
    const subcategory = new Promise((resolve, reject) => {
        fetch(server_url + 'subcategories/destroy', {
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
    return subcategory
}

export {
    create,
    findAll,
    findOneById,
    findAllByCategory,
    update,
    destroy
}