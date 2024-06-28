const sales = require("@/services/sales");

export default function useSales() {
  const create = async (
    description,
    type,
    discount,
    utility,
    net,
    tax,
    total,
    user_id,
    customer_id,
    document_type,
    document_id
  ) => {
    const newSale = await sales.create(
      description,
      type,
      discount,
      utility,
      net,
      tax,
      total,
      user_id,
      customer_id,
      document_type,
      document_id
    );
    return newSale;
  };

  const findAll = async () => {
    const sales_ = await sales.findAll();
    return sales_;
  };

  const findOneById = async (id) => {
    const sale = await sales.findOneById(id);
    return sale;
  };

  const findAllByCustomer = async (customer_id) => {
    const sales_ = await sales.findAllByCustomer(customer_id);
    return sales_;
  };

  const findOneByDocument = async (document_type, document_id) => {
    const sale = await sales.findOneByDocument(document_type, document_id);
    return sale;
  };

  const findAllByDocumentType = async (document_type) => {
    const sales_ = await sales.findAllByDocumentType(document_type);
    return sales_;
  };

  const findAllByDocumentId = async (document_id) => {
    const sales_ = await sales.findAllByDocumentId(document_id);
    return sales_;
  };

  const findAllByType = async (type) => {
    const sales_ = await sales.findAllByType(type);
    return sales_;
  };

  const saleType = (type) => {
    switch (type) {
      case 1:
        return "Venta directa";
      case 2:
        return "Venta calzada";
      default:
        return "Venta sin definir";
    }
  };

  const createDirectSale = async (
    description,
    discount,
    utility,
    net,
    tax,
    total,
    user_id,
    customer_id,
    document_type,
    document_id
  ) => {
 
    const type = 1;
    const newSale = await create(
      description,
      type,
      discount,
      utility,
      net,
      tax,
      total,
      user_id,
      customer_id,
      document_type,
      document_id
    );
    return newSale;
  };

  const createSaleDetail = async (
    quanty,
    price,
    discount,
    utility,
    net,
    tax,
    total,
    sale_id,
    product_id
  ) => {
    const newSaleDetail = await sales.createSaleDetail(
      quanty,
      price,
      discount,
      utility,
      net,
      tax,
      total,
      sale_id,
      product_id
    );
    return newSaleDetail;
  };

  const findAllSaleDetailBySaleId = async (sale_id) => {
    const saleDetails = await sales.findAllSaleDetailBySaleId(sale_id);
    return saleDetails;
  }

  const findAllBetweenDates = async (start_date, end_date) => {
    const sales_ = await sales.findAllBetweenDates(start_date, end_date);
    return sales_;
  };

  const findAllBetweenDatesByCustomer = async (
    start_date,
    end_date,
    customer_id
  ) => {
    const sales_ = await sales.findAllBetweenDatesByCustomer(
      start_date,
      end_date,
      customer_id
    );
    return sales_;
  };

  const findAllBetweenDatesByUser = async (start_date, end_date, user_id) => {
    const sales_ = await sales.findAllBetweenDatesByUser(
      start_date,
      end_date,
      user_id
    );
    return sales_;
  };

  // function voidById(id)

  const voidById = async (id) => {
    const sale = await sales.voidById(id);
    return sale;
  }

  // updatedocumentId(id, document_id)

  const updateDocumentId = async (id, document_id) => {
    const sale = await sales.updateDocumentId(id, document_id);
    return sale;
  }

  //function updateutility(id, utility)

  const updateUtility = async (id, utility) => {
    const sale = await sales.updateutility(id, utility);
    return sale;
  }

  //totalSalesBetweenDates(start_date, end_date)

  const totalSalesBetweenDates = async (start_date, end_date) => {
    console.log("start_date", start_date);
    const total = await sales.totalSalesBetweenDates(start_date, end_date);
    return total;
  }

  // function updateSaleTax(id, tax) 

  const updateSaleTax = async (id, tax) => {
    const sale = await sales.updateSaleTax(id, tax);
    return sale;
  }

  //function updateSaleNet(id, net)

  const updateSaleNet = async (id, net) => {
    const sale = await sales.updateSaleNet(id, net);
    return sale;
  }

  //function updateSaleDocumentType(id, document_type)

  const updateSaleDocumentType = async (id, document_type) => {
    const sale = await sales.updateSaleDocumentType(id, document_type);
    return sale;
  }


  return {
    create,
    findAll,
    findOneById,
    findAllByCustomer,
    findOneByDocument,
    findAllByDocumentType,
    findAllByDocumentId,
    findAllByType,
    saleType,
    createDirectSale,
    createSaleDetail,
    findAllSaleDetailBySaleId,
    findAllBetweenDates,
    findAllBetweenDatesByCustomer,
    voidById,
    updateDocumentId,
    updateUtility,
    totalSalesBetweenDates,
    updateSaleTax,
    updateSaleNet,
    updateSaleDocumentType
  };
}
