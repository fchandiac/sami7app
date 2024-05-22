const salePoints = require("@/services/salePoints");

export default function useSalePoints() {
  const create = async (name, description, address, phone, status, storage_id, commerce_name,commerce_rut) => {
    const newSalePoint = salePoints.create(
      name,
      description,
      address,
      phone,
      status,
      storage_id,
      commerce_name,commerce_rut
    );
    return newSalePoint;

  };
  const findAll = async () => {
    const salePoint = salePoints.findAll();
    return salePoint;
  };

  const findOneById = async (id) => {
    const salePoint = salePoints.findOneById(id);
    return salePoint;
  };

  const findOneByName =  async (name) => {
    const salePoint = salePoints.findOneByName(name);
    return salePoint;
  };

  const update = async (
    id,
    name,
    description,
    address,
    phone,
    status,
    storage_id, commerce_name,commerce_rut
  ) => {
    const salePoint = salePoints.update(
      id,
      name,
      description,
      address,
      phone,
      status,
      storage_id, commerce_name,commerce_rut
    );
    return salePoint;
  };

  const destroy = async (id) => {
    const salePoint = salePoints.destroy(id);
    return salePoint;
  };

  const findAllOpen = async () => {
    const salePoint = await salePoints.findAllOpen();
    return salePoint;
  };

  const updateStatus = async (id, status) => {
    const salePoint = salePoints.updateStatus(id, status);
    return salePoint;
  };

  const findAllClosed = async () => {
    const salePoint = salePoints.findAllClosed();
    return salePoint;
  };

  return {
    create,
    findAll,
    findOneById,
    findOneByName,
    update,
    destroy,
    findAllOpen,
    updateStatus,
    findAllClosed,
  };
}
