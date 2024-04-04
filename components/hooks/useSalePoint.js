import { useSalePointContext } from "../salePoint/salePointProvider";
import useProducts from "./useProducts";


export default function useSalePoint() {
  const { setCartItems, activeCart, cart1, cart2, cart3, cart4, info, priceList, setTotalsCart} = useSalePointContext();
  const products = useProducts();

  const getActiveCart = () => {
    switch (activeCart) {
      case 1:
        return cart1;
      case 2:
        return cart2;
      case 3:
        return cart3;
      case 4:
        return cart4;
      default:
        return "cart not found";
    }
  }

  const itemInfoDefault = () => {
    return {
      id: 0,
      name: "",
      key: 0,
      sellingPriceId: 0,
      gross: 0,
      net: 0,
      quanty: 0,
      total: 0,
      discount: 0,
      tax: 0,
      stock: 0,
      virtualStock: 0,
      priceListId: 0,
    };
  }

  const formatProductToCart = (product) => {
    return {
      id: product.id,
      name: product.name,
      key: product.code,
      sellingPriceId: product.SellingPrices[0].id,
      gross: product.SellingPrices[0].gross,
      net: product.SellingPrices[0].net,
      quanty: 1,
      total: product.SellingPrices[0].gross,
      discount: 0,
      tax: 0,
      stock: product.Stocks[0].available,
      virtualStock: product.Stocks[0].available,
      priceListId: product.priceListId,
      priceListName: product.SellingPrices[0].PriceList.name,

    };
  }

  const setTotalCart = () => {
    const cart = getActiveCart();
    const items = cart.items;
    let total = 0;
    let net = 0;
    let tax = 0;
    let discounts = 0;

    items.forEach((item) => {
      total += item.total;
      net += item.net;
      tax += item.tax;
      discounts += item.discount;
    });

    setTotalsCart(activeCart, total, net, tax, discounts)
    
  }

  const addItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const itemInCart = items.find((item) => item.id === product.id);

    if (itemInCart === undefined){
      return
    } else {
      itemInCart.quanty += 1;
      itemInCart.total = itemInCart.gross * itemInCart.quanty;
      setCartItems(activeCart, items);
      setTotalCart();
    }
    
  }
  
  const subtractItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const itemInCart = items.find((item) => item.id === product.id);

    if (itemInCart === undefined){
      return
    } else {
      if (itemInCart.quanty === 1){
        items.splice(items.indexOf(itemInCart), 1);
        setCartItems(activeCart, items);
        setTotalCart();
      } else {
        itemInCart.quanty -= 1;
        itemInCart.total = itemInCart.gross * itemInCart.quanty;
        setCartItems(activeCart, items);
        setTotalCart();
      }
    }
  }

  const removeItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIdToCart(productId);
    const index = items.findIndex(item => item.id === product.id);
  
    if (index !== -1) {
      items.splice(index, 1);
      setCartItems(activeCart, items);
      setTotalCart();
    }
  };

    



  const submitItemToCart = async (productId) => {
    const cart = getActiveCart();
    const items = cart.items;
    const product = await products.findOneByIAndStorageAndPriceList(productId, info.storage.id, priceList.id);

    console.log('Product', product)
    const stock = product.Stocks.find((stock) => stock.StorageId === info.storage.id);
    const itemInCart = items.find((item) => item.id === product.id);

    // console.log('Product', product)
    // console.log('Stock', stock)
    
    if (itemInCart === undefined){
      const item = formatProductToCart(product);
      items.push(item);
      setCartItems(activeCart, items);
      setTotalCart();
    } else {
      addItemToCart(productId);
      setTotalCart();
    }
  };

  return { submitItemToCart, getActiveCart, itemInfoDefault, addItemToCart, removeItemToCart, subtractItemToCart};
}
