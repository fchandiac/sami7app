import moment from "moment";
import React from "react";
import useLioren from "./useLioren";
import xml2js from "xml2js";


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

  const boletaProcess = async (saleInfo) => {

   // let documentData = documentDataDefault(); // No está definida en el código proporcionado
  
    let data = {
      emisor: {
        tipodoc: "39",
        servicio: 3,
      },
      detalles: [],
      expects: "xml",
    };
  
    const details = saleInfo.items.map((item) => ({
      codigo: item.id.toString(),
      nombre: item.name,
      cantidad: item.quanty, // Posiblemente debería ser item.quantity
      precio: item.gross,
      exento: !item.ivaSubject,
    }));
  
    data.detalles = details;

    // Suponiendo que lioren.boleta() devuelve una promesa que resuelve en la boleta generada
    const boleta = await lioren.boleta(data);

    const xml = processXlm(boleta.xml);

    const dteData = documenteDataDefault();
    dteData.comerceInfo = {
      fantasyName: saleInfo.comerceInfo.fantasyName,
      name: saleInfo.comerceInfo.name,
      address: saleInfo.comerceInfo.address,
      phone: saleInfo.comerceInfo.phone,
      rut: saleInfo.comerceInfo.rut,
    }

    dteData.documentType = 2;
    dteData.total = saleInfo.total;
    dteData.subTotal = saleInfo.subTotal;
    dteData.subjectTotal = subjectTotal(saleInfo.items);
    dteData.exemptTotal = boleta.montoexento;
    dteData.discounts = saleInfo.discounts;
    dteData.iva = boleta.montoiva;
    dteData.change = saleInfo.change;
    dteData.items = saleInfo.items;
    dteData.payments = saleInfo.pays;
    dteData.saleId = saleInfo.id;
    dteData.stamp = xml;
    dteData.referenceId = boleta.folio;




   
    return dteData;
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

  const processXlm = (data) => {

    let buff = Buffer.from(data, 'base64');

    const parser = new xml2js.Parser();

    let xml

    parser.parseString(buff, (err, result) => {
      if (err) {
        console.log("Error al procesar xml", err);
      } else {
        xml = result;
      }
    });

    //--------- RUT EMISOR -----------//
    let RE = xml.DTE.Documento[0].TED[0].DD[0].RE[0]
    //--------- TIPO DOCUMENTO -----------//
    let TD = xml.DTE.Documento[0].TED[0].DD[0].TD[0]
    //--------- FOLIO -----------//
    let F = xml.DTE.Documento[0].TED[0].DD[0].F[0]
    //--------- FECHA -----------//
    let FE = xml.DTE.Documento[0].TED[0].DD[0].FE[0]
    //--------- RR -----------//
    let RR = xml.DTE.Documento[0].TED[0].DD[0].RR[0]
    //--------- RSR -----------//
    let RSR = xml.DTE.Documento[0].TED[0].DD[0].RSR[0]
    //--------- MONTO -----------//
    let MNT = xml.DTE.Documento[0].TED[0].DD[0].MNT[0]
    //--------- ITEM1 -----------//
    let IT1 = xml.DTE.Documento[0].TED[0].DD[0].IT1[0]
    //--------- TSTED -----------//
    let TSTED = xml.DTE.Documento[0].TED[0].DD[0].TSTED[0]
    //--------- CAF -----------//
    let CAF = xml.DTE.Documento[0].TED[0].DD[0].CAF[0]
    //--------- FRMT -----------//
    let FRMT = xml.DTE.Documento[0].TED[0].FRMT[0]._

    let timbre_str = '<TED version="1.0"><DD>' +
        '<RE>' + RE + '</RE>' +
        '<TD>' + TD + '</TD>' +
        '<F>' + F + '</F>' +
        '<FE>' + FE + '</FE>' +
        '<RR>' + RR + '</RR>' +
        '<RSR>' + RSR + '</RSR>' +
        '<MNT>' + MNT + '</MNT>' +
        '<IT1>' + IT1 + '</IT1>' +
        '<CAF version="1.0"><DA>' +
        '<RE>' + CAF.DA[0].RE[0] + '</RE>' +
        '<RS>' + CAF.DA[0].RS[0] + '</RS>' +
        '<TD>' + CAF.DA[0].TD[0] + '</TD>' +
        '<RNG><D>' + CAF.DA[0].RNG[0].D[0] + '</D>' +
        '<H>' + CAF.DA[0].RNG[0].H[0] + '</H></RNG>' +
        '<FA>' + CAF.DA[0].FA[0] + '</FA>' +
        '<RSAPK><M>' + CAF.DA[0].RSAPK[0].M[0] + '</M>' +
        '<E>' + CAF.DA[0].RSAPK[0].E[0] + '</E></RSAPK>' +
        '<IDK>' + CAF.DA[0].IDK[0] + '</IDK></DA>' +
        '<FRMA algoritmo="SHA1withRSA">' + CAF.FRMA[0]._ + '</FRMA></CAF>' +
        '<TSTED>' + TSTED + '</TSTED></DD>' +
        '<FRMT algoritmo="SHA1withRSA">' + FRMT + '</FRMT></TED>'
    // console.log(timbre_str)



    return timbre_str;


  }


  const subjectTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      if (item.ivaSubject) {
        total += item.gross * item.quanty;
      }
    });
    return total;
  }






  const documentProcess = async (saleInfo) => {
    const type = saleInfo.documentTypeId;
    console.log('typeDocument', type);
  
    try {
      const data = async (type) => {
        switch (type) {
          case 1: 
            return await ticketProcess(saleInfo);
          case 2:
            return await boletaProcess(saleInfo);
          case 3:
            return await facturaProcess(saleInfo);
          default:
            throw new Error('Tipo de documento no soportado');
        }
      }
  
      return await data(type);
  
    } catch (err) {
      console.log("Error al procesar documento", err);
      return await ticketProcess(saleInfo);
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
