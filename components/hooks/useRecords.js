const records = require("../../services/records");

export default function useRecords() {
  const create = async (user_id, action, table, description) => {
    const record = await records.create(user_id, action, table, description);
    return record;
  };

  const findAll = async () => {
    const record = await records.findAll();
    return record;
  };

  const findAllToGrid = async () => {
    const record = await records.findAll();
    return record.map((r) => ({
      id: r.id,
      userId: r.user_id,
      userName: r.User.name,
      action: r.action,
      table: r.table,
      description: r.description,
      createdAt: r.created_at,
    }))
  }

  const createCategory = async (userId, categoryName) => {
    const record = await records.create(
      userId,
      "crear",
      "categorias",
      "crea nueva categoría: " + categoryName
    );
    return record
  }

  const createStorage = async (userId, storageName) => {
    const record = await records.create(
      userId,
      "crear",
      "almacenes",
      "crea nuevo almacén: " + storageName
    )
    return record
  }

  const createPriceList = async (userId, priceListName) => {
    const record = await records.create(
      userId,
      "crear",
      "listas de precios",
      "crea nueva lista de precios: " + priceListName
    )
    return record
  }


  const createTax = async (userId, taxName) => {
    const record = await records.create(
      userId,
      "crear",
      "impuestos",
      "crea nuevo impuesto: " + taxName
    )
    return record
  }

  const createProvider = async (userId, providerName) => {
    const record = await records.create(
      userId,
      "crear",
      "proveedores",
      "crea nuevo proveedor: " + providerName
    )
    return record
  }

  const createSubcategory = async (userId, subcategoryName) => {
    const record = await records.create(
      userId,
      "crear",
      "subcategorias",
      "crea nueva subcategoría: " + subcategoryName
    )
    return record
  }

  return {
    create,
    findAll,
    createCategory,
    createTax,
    createProvider,
    findAllToGrid,
    createSubcategory,
    createStorage,
    createPriceList,
  }
}
