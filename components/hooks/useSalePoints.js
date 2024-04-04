const salePoints = require("@/services/salePoints");

export default function useSalePoints() {
  const create = (name, description, address, phone, status, storage_id) => {
    const newSalePoint = salePoints.create(
      name,
      description,
      address,
      phone,
      status,
      storage_id
    );
    return newSalePoint;
  };
  const findAll = () => {
    const salePoint = salePoints.findAll();
    return salePoint;
  };

  const findOneById = (id) => {
    const salePoint = salePoints.findOneById(id);
    return salePoint;
  };

  const findOneByName = (name) => {
    const salePoint = salePoints.findOneByName(name);
    return salePoint;
  };

  const update = (
    id,
    name,
    description,
    address,
    phone,
    status,
    storage_id
  ) => {
    const salePoint = salePoints.update(
      id,
      name,
      description,
      address,
      phone,
      status,
      storage_id
    );
    return salePoint;
  };

  const destroy = (id) => {
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
