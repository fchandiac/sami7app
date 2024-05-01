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

  return { cartToDocument, documenteDataDefault };
}
