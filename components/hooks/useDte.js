import moment from "moment";
import React from "react";

export default function useDte() {
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
        code: "0",
        items: [],
        payments: [],
        saleId: 0,
        referenceId: 0,
        date: moment(new Date()).format("DD-MM-YYYY"),
        time: moment(new Date()).format("HH:mm:ss"),
        comerceInfo: {
          fantasyName: "Nombre del Comercio",
          name: "Razón social del Comercio",
          address: "Dirección del Comercio",
          phone: "Teléfono del Comercio",
          rut: "Rut del Comercio",
        },
    }
  };

  return { cartToDocument, documenteDataDefault };
}
