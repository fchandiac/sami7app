const storages = require("@/services/storages");

export default function useStorages() {
  const create = async (name, description, sales_room) => {
    const storage = await storages.create(name, description, sales_room);
    return storage;
  };

  const findAll = async () => {
    const storage = await storages.findAll();
    return storage;
  };

  const findOneById = async (id) => {
    const storage = await storages.findOneById(id);
    return storage;
  };

  const findAllSalesRoom = async () => {
    const storage = await storages.findAllSalesRoom();
    return storage;
  };

  const update = async (id, name, description, sales_room) => {
    const storage = await storages.update(id, name, description, sales_room);
    return storage;
  };

  const destroy = async (id) => {
    const storage = await storages.destroy(id);
    return storage;
  };

  const findAllToAutocomplete = async () => {
    const storage = await storages.findAll();
    return storage.map((s) => ({
      id: s.id,
      key: s.id,
      name: s.name,
    }));
  }

  return {
    create,
    findAll,
    findOneById,
    findAllSalesRoom,
    update,
    destroy,
    findAllToAutocomplete,
  };
}
