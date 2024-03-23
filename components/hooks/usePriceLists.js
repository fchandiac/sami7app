const priceLists = require("@/services/priceLists");

export default function usePriceLists() {

  const create = async (name, description) => {
    const list = await priceLists.create(name, description);
    return list;
  };

  const findAll = async () => {
    const list = await priceLists.findAll();
    return list;
  };

  const findOneById = async (id) => {
    const list = await priceLists.findOneById(id);
    return list;
  };

  const update = async (id, name, description) => {
    const list = await priceLists.update(id, name, description);
    return list;
  };

  const destroy = async (id) => {
    const list = await priceLists.destroy(id);
    return list;
  };

  const findAllToAutocomplete = async () => {
    const list = await priceLists.findAll();
    const formattedList = list.map((item) => {
      return { id: item.id, key: item.id, name: item.name };
    });
    return formattedList;
  };

  const findAllToGrid = async () => {
    const list = await priceLists.findAll();
    const formattedList = list.map((item) => {
      return { id: item.id, name: item.name, description: item.description };
    });
    return formattedList;
  }

  return {
    create,
    findAll,
    findOneById,
    update,
    destroy,
    findAllToAutocomplete,
    findAllToGrid
  };
}
