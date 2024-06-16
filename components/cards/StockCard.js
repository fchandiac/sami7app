import React, { useEffect, useState } from 'react'
import useStocks from '../hooks/useStocks'
import useProductCards from '../hooks/useProductCards'
import useStorages from '../hooks/useStorages'
import { Grid, Paper, Typography } from '@mui/material'
import useProducts from '../hooks/useProducts'




export default function StockCard(props) {
  const { productId} = props
  const stocks = useStocks()
  const productCards = useProductCards()
  const storages = useStorages()
  const products = useProducts()
  const statusList = {
    0: "available",
    1: "reserved",
    2: "sold",
    3: "returned",
    4: "to receive",
  };


  const [cardData, setCardData] = useState({
    productId: 0,
    productName: "Product Name",
    productCode: "Product Code",
    storages: [],
  })

 

  useEffect(() => {
    const fetchProductCard = async () => {
      try {
        const product = await products.findOneById(productId);
        if (!product) {
          throw new Error(`Product with id ${productId} not found`);
        }

        const data = {
          productId: product.id,
          productName: product.name,
          productCode: product.code,
          storages: []
        };

        const storagesList = await storages.findAll();

        const storageData = await Promise.all(storagesList.map(async (storage) => {
          const productAvailable = await productCards.countAllGroupByProductStorageAndStatus(product.id, storage.id, 0);
          const productReserved = await productCards.countAllGroupByProductStorageAndStatus(product.id, storage.id, 1);
          const productSold = await productCards.countAllGroupByProductStorageAndStatus(product.id, storage.id, 2);
          const productToReceive = await productCards.countAllGroupByProductStorageAndStatus(product.id, storage.id, 4);

          return {
            ...storage,
            available: productAvailable[0]?.count || 0,
            reserved: productReserved[0]?.count || 0,
            sold: productSold[0]?.count || 0,
            toReceive: productToReceive[0]?.count || 0,
          };
        }));

        data.storages = storageData;

        console.log('Product data:', data);
        setCardData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } 
    };

    fetchProductCard();
  }, []);


  return (
   <>
   <Paper variant='outlined' sx={{padding: 1}}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
      <Typography fontSize={10}>{cardData.productId}</Typography>
      <Typography variant="subtitle1">{cardData.productName}</Typography>
      <Typography fontSize={10}>{cardData.productCode}</Typography>
      </Grid>
  
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {cardData.storages.map((storage, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Paper variant='outlined' sx={{padding: 1}}>
                  <Typography fontSize={10}>{storage.id}</Typography>
                  <Typography fontSize={12} fontWeight={'bold'}>{storage.name}</Typography>
                  <Typography fontSize={10}>
                    {'Disponibles: '}
                    {storage.available}</Typography>
                  <Typography fontSize={10}>
                    {'Reservados: '}
                    {storage.reserved}</Typography>
                  <Typography fontSize={10}>
                    {'Vendidos: '}
                    {storage.sold}</Typography>
                  <Typography fontSize={10}>
                    {'Por recibir: '}
                    {storage.toReceive}</Typography>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
    </Paper>
   </>
  )
}
