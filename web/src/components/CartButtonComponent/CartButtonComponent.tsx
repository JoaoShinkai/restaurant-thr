import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import customToast from '../../toast/customToast';
import './index.css';

interface Product{
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

interface ProductInCart {
  quantity: number;
  amount: number;
  product: Product
}

interface Client {
  id: number;
  name: string;
  phone: string;
}

export default function CartButtonComponent(){
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<ProductInCart[]>([]);
  const [client, setClient] = useState('');
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    let items = localStorage.getItem("cart");

    if(items){
      setProducts(JSON.parse(items));
    }

  }, [isVisible])

  useEffect(() => {
    loadClients();
  }, [])

  async function loadClients(){
    try{
      const res = await api.get('/client');

      setClients(res.data);
    }catch(err){
      customToast.error("Erro ao listar clientes");
    }
  }

  function closeDialog(){
    setIsVisible(false);
  }

  function openDialog(){
    setIsVisible(!isVisible);
  }

  function calcAmountValue(){
    let total = 0;

    products.forEach(product => {
      total += product.amount;
    })

    return total;
  }

  async function createOrder(){
    if(client === ''){
      customToast.error("Selecione um cliente para realizar a venda")
      return;
    }

    let order = {
      date: format(new Date(), 'yyyy-MM-dd'),
      amount: calcAmountValue(),
      products: products,
      client: {
        id: client
      }
    }

    try{
      await api.post('/order', order);

      customToast.success("Pedido cadastrado com sucesso");
      localStorage.removeItem("cart");
      setIsVisible(false);
    }catch(err){
      customToast.error("Não foi possível enviar o pedido");
    }

    console.log(order);
  }

  return(
    <div>
      <Button onClick={openDialog} sx={{ color: 'white' }}> <i className="fa-solid fa-cart-shopping icon"></i> Carrinho </Button>

      <div className={`cart-modal-background ${isVisible && "active"} `}>
        <div className='close-modal' onClick={closeDialog}></div>
        <div className='cart-modal'>
          <div className='cart-modal-title'> Meu carrinho </div>
          {
            products.length > 0 ?
            
            <>
              <div className='cart-modal-body'>
                {
                  products.map((product, index) => {
                    return(
                      <div key={index} className="cart-product">
                        <div>
                          <div> <b> {product.quantity}x {product.product.name} </b> </div>
                          <div> {product.product.description} </div>
                        </div>
                        <div className='cart-product-price'>
                          R$ {product.amount}
                        </div>
                      </div>
                    )
                  })
                }
                <div className='cart-order-amount'>Valor total: R$ { calcAmountValue() }</div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={client}
                      label="Cliente"
                      onChange={e => setClient(e.target.value)}
                    >
                      {
                        clients.map(item => {
                          return(
                            <MenuItem key={item.id} value={item.id}> { item.name } </MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className='cart-modal-footer'>
                <Button onClick={createOrder}> <i className="fa-solid fa-angles-right"></i> Enviar pedido </Button>
              </div>
            </>
            :
            <div className='warning-message'> <i className='fa-solid fa-warning'></i> Selecione produtos para que sejam adicionados ao carrinho</div>
          }
          
        </div>
      </div>
    </div>
  )
}