function states(token) {
    const state = new Promise((resolve, reject) => {
        fetch('http://www.lioren.cl/api/regiones', {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            res.json().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    })
    return state
}

function district(token) {
    const d = new Promise((resolve, reject) => {
        fetch('/lioren/comunas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            res.json().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    })
    return d
}

function cities(token) {
    const c = new Promise((resolve, reject) => {
        fetch('/lioren/ciudades', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            res.json().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    })
    return c
}



export {
    states,
    district,
    cities

}