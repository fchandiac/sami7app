import moment from "moment";
import React from "react";
import useLioren from "./useLioren";


export default function useDte() {
  const lioren = useLioren();

  const cartToDocument = (
    documentType,
    cart,
    payments,
    total,
    discounts,
    subjectTotal,
    exemptTotal,
    iva,
    change,
    saleId,
    referenceId,
    code
  ) => {
    console.log("cartToDocument", cart);
  };



  const documenteDataDefault = () => {
      return {
        documentType: 1,
        total: 0,
        subTotal: 0,
        subjectTotal: 0,
        exemptTotal: 0,
        discounts: 0,
        change: 0,
        iva: 0,
        items: [],
        payments: [],
        saleId: 0,
        referenceId: 0,
        date: moment(new Date()).format("DD-MM-YYYY"),
        time: moment(new Date()).format("HH:mm:ss"),
        stamp: "",
        comerceInfo: {
          fantasyName: "Nombre del Comercio",
          name: "Razón social del Comercio",
          address: "Dirección del Comercio",
          phone: "Teléfono del Comercio",
          rut: "Rut del Comercio",
        },
    }
  };

  const boletaProcess = async (cart) => {

    let documentData = documenteDataDefault();

    const data = {
      emisor: {
        tipodoc: "39",
        servicio: 3,
      },
      detalles: [],
      expects: "xml",
    };

    const details = cart.items.map((item) => {
      return {
        codigo: item.id.toString(),
        nombre: item.name,
        cantidad: item.quanty,
        precio: item.gross,
        exento: !item.ivaSubject,
      };
    });

    data.detalles = details;
    const boleta = await lioren.boleta(data);

    documentData.documentType = 2;
    documentData.total = cart.total;
    documentData.subjectTotal = cart.net;


    return data;
  };

  const facturaProcess = (cart) => {
    const data = {}
  }

  const ticketProcess = (saleInfo) => {
    const data = documenteDataDefault();
    data.comerceInfo= {
      fantasyName: saleInfo.comerceInfo.fantasyName,
      name: saleInfo.comerceInfo.name,
      address: saleInfo.comerceInfo.address,
      phone: saleInfo.comerceInfo.phone,
      rut: saleInfo.comerceInfo.rut,
    }
    data.documentType = 1;
    data.total = saleInfo.total;
    data.subTotal = saleInfo.subTotal;
    data.subjectTotal = 0;
    data.exemptTotal = 0;
    data.discounts = saleInfo.discounts;
    data.iva = 0;
    data.change = saleInfo.change;
    data.items = saleInfo.items;
    data.payments = saleInfo.pays;
    data.saleId = saleInfo.id;
    data.stamp= '<SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7>' + saleInfo.id + '<SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7><SAMI7>';

    return data;
  }






  const documentProcess = async (cart) => {
    const type = cart.documentType.id;

    try {
      const data = (type) => {
        switch (type) {
          case 1: 
            return ticketProcess(cart);
          case 2:
            return boletaProcess(cart);
          case 3:
            return facturaProcess(cart);
        }
      }

      return data;

    } catch (err) {
      console.log("Error al procesar documento", err);
    }

    

  }

  // { id: 1, key: 1, name: "Ticket" },
  // { id: 2, key: 2, name: "Boleta" },
  // { id: 3, key: 3, name: "Factura" },

  const documentType = (type) => {
    switch (type) {
      case 1:
        return "Ticket";
      case 2:
        return "Boleta";
      case 3:
        return "Factura";
      default:
        return "N/A";
    }
  }

  return { cartToDocument, documenteDataDefault, ticketProcess, boletaProcess, documentProcess, documentType};
}
