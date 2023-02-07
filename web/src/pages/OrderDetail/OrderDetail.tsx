import { Chip } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppBarComponent from '../../components/AppBar/AppBarComponent';
import { api } from '../../lib/api';
import customToast from '../../toast/customToast';
import './index.css';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

interface Client {
  id: number;
  name: string;
  phone: string;
}

interface ProductInOrder{
  id: number;
  quantity: number;
  amount: number;
  product: Product;
}

interface Order {
  createdAt: Date;
  id: number;
  date: Date;
  amount: number;
  client: Client;
  products: ProductInOrder[];
}
export default function OrderDetail(){

  const [order, setOrder] = useState<Order>({} as Order);

  const { id } = useParams();

  useEffect(() => {
    loadOrder();
  }, [])

  async function loadOrder(){
    try{
      const res = await api.get(`/order/${id}`);

      setOrder(res.data);

      console.log(res.data);
    }catch(err){
      customToast.error("Não foi possível consultar o pedido")
    }
  }

  return(
    <div className='page-content'>
      <AppBarComponent />
      <div className="user-order-detail-container">
            <div className="user-order-detail-container-order">
                <div className="user-order-detail-container-order-header">
                    <div className="user-order-detail-container-order-header-info">
                        <Chip label="Informações do cliente" />
                        <div className="user-order-detail-container-order-header-info-value"><i className="fas fa-user"></i> { order?.client?.name }  </div>
                        <div className="user-order-detail-container-order-header-info-value"><i className="fas fa-phone"></i> { order?.client?.phone } </div>
                    </div>
                    <div className="user-order-detail-container-order-header-info">
                        <Chip label="Data do pedido" />
                        <div className="user-order-detail-container-order-header-info-value"> { format(new Date(), 'dd/MM/yyyy') } </div>
                        <Chip label="Método de pagamento" />
                        <div className="user-order-detail-container-order-header-info-value">A vista</div>
                    </div>
                </div>
                <div className="user-order-detail-container-order-content">
                    <div className="user-order-detail-container-order-content-products">
                      {
                        order?.products?.map(product => {
                          return(
                            <div key={product.id} className="JS-order-card-body-item">
                              <div className="JS-order-card-body-product">
                                  <div className="JS-order-card-body-product-quant"><b>{product.quantity}x</b> { product.product.name }</div>
                                  <div>R$ { product.amount }</div>
                              </div>
                            
                              <div className="JS-order-card-body-observation">
                                  <div className="JS-order-card-body-observation-text"><i className="fas fa-comment-alt-edit"></i> { product.product.description } </div>
                              </div>
                          </div>
                          )
                        })
                      }
                      
                        <div className="JS-order-card-body-item">
                            <div className="JS-order-card-body-valorTotal">R$ {  order?.amount }</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
  )
}