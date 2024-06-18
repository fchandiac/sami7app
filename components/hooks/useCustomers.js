
const customers = require("@/services/customers.js");



import React from 'react'

export default function useCustomers() {
  


  const create = async (rut, name, activity, district, city, address, phone, mail) => {
    const customer = await customers.create(rut, name, activity, district, city, address, phone, mail);
    return customer;
  };

  const findAll = async () => {
    const customer = await customers.findAll();
    return customer;
  };

  const findOneById = async (id) => {
    const customer = await customers.findOneById(id);
    return customer;
  };

  const findByRut = async (rut) => {
    const customer = await customers.findByRut(rut);
    return customer;
  };

  const findOneByName = async (name) => {
    const customer = await customers.findOneByName(name);
    return customer;
  };

  const update = async (id, rut, name, address, phone, mail) => {
    const customer = await customers.update(
      id,
      rut,
      name,
      address,
      phone,
      mail
    );
    return customer;
  };

  const destroy = async (id) => {
    const customer = await customers.destroy(id);
    return customer;
  };

  const findFromSII = async (rut) => {
    const https = require("https");
    return new Promise((resolve, reject) => {
      let path = "/consulta?rut=" + rut;

      const options = {
        hostname: "siichile.herokuapp.com",
        path: path,
        method: "GET",
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const jsonObject = JSON.parse(data);
            resolve(jsonObject);
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on("error", (error) => {
        reject(error);
      });
      req.end();
    });
  };


  return {
    create,
    findAll,
    findOneById,
    findByRut,
    update,
    destroy,
    findFromSII,
    findOneByName,
  };
}

