const server_url = process.env.API_URL;


function create(
  description,
  type,
  previous_balance,
  debit,
  credit,
  balance,
  reference_id,
  provider_id,
  user_id
) {
  const providerAccountMovement = new Promise((resolve, reject) => {
    fetch(server_url + "providerAccountMovements/create", {
      method: "POST",
      body: JSON.stringify({
        description,
        type,
        previous_balance,
        debit,
        credit,
        balance,
        reference_id,
        provider_id,
        user_id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return providerAccountMovement;
}

function findOneById(id) {
  const providerAccountMovement = new Promise((resolve, reject) => {
    fetch(server_url + "providerAccountMovements/findOneById", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return providerAccountMovement;
}

function findAllByProvider(provider_id) {
  const providerAccountMovements = new Promise((resolve, reject) => {
    fetch(server_url + "providerAccountMovements/findAllByProvider", {
      method: "POST",
      body: JSON.stringify({ provider_id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return providerAccountMovements;
}

function findLastByProvider(provider_id) {
  const providerAccountMovement = new Promise((resolve, reject) => {
    fetch(server_url + "providerAccountMovements/findLastByProvider", {
      method: "POST",
      body: JSON.stringify({ provider_id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return providerAccountMovement;
}

export {
  create,
  findOneById,
  findAllByProvider,
  findLastByProvider,
};