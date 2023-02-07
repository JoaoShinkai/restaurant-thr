import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBarComponent from '../../components/AppBar/AppBarComponent';
import { api } from '../../lib/api';
import customToast from '../../toast/customToast';
import './index.css';

interface Client {
  id: number;
  name: string;
  phone: string;
}

interface Order {
  id: number;
  date: Date;
  amount: number;
  client: Client;
}

export default function Orders(){

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, [])

  async function loadOrders(){
    try{
      const res = await api.get('/order');

      setOrders(res.data);
    }catch(err){
      customToast.error("Erro ao consultar pedidos");
    }
  }

  return(
    <div className='page-container' style={{backgroundColor: '#f1f1f1'}}>
      <AppBarComponent />
      <div className='orders-container'>
        <div className='orders-container-title'>Área de vendas</div>
        <div className='orders-container-orders'>
          {
            orders.map(order => {
              return(
                // <div key={order.id} className='orders-container-orders-order'>
                //   <div className='orders-container-orders-order-left'>

                //   </div>
                //   <div className='orders-container-orders-order-body'>
                //     <div> <i className='fa-solid fa-user'></i> {order.client.name} </div>
                //     <div> <i className='fa-solid fa-calendar'></i> { order.date.toString()} </div>
                //     <div> <i className='fa-solid fa-coins'></i> R$ { order.amount} </div>
                //   </div>
                //   <Link to={`/order-detail/${order.id}`} className='orders-container-orders-order-more'>
                //     <i className='fa-solid fa-eye'></i>
                //   </Link>
                // </div>
                <Card key={order.id} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      #{ order.id }
                    </Typography>
                    <Typography variant="body2" style={{display: 'flex', gap: '12px', justifyContent: 'space-between'}}>
                      <div>
                        <div style={{fontSize: '12px'}}> <i className='fa-solid fa-user'></i> Cliente</div>
                        <Chip label={order.client.name} />
                      </div>
                      <div>
                        <div style={{fontSize: '12px'}}> <i className='fa-solid fa-calendar'></i> Data da venda</div>
                        <Chip label={order.date.toString()} /> 
                      </div>
                      <div>
                        <div style={{fontSize: '12px'}}> <i className='fa-solid fa-coins'></i> Total</div>
                        <Chip label={`R$ ${order.amount}`} />
                      </div>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/order-detail/${order.id}`} style={{textDecoration: 'none'}}>
                      <Button size="small"> <i className="fa-solid fa-scroll" style={{marginRight: 4}}></i> Detalhes</Button>
                    </Link>
                  </CardActions>
                </Card>
              )
            })
          }
          
        </div>
      </div>
    </div>
  )
}