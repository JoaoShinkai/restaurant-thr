import { Route, Routes } from 'react-router-dom';
import CompanyAuth from '../middlewares/CompanyAuth';
import Clients from '../pages/Clients/Clients';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import OrderDetail from '../pages/OrderDetail/OrderDetail';
import Orders from '../pages/Orders/Orders';

export default function RoutesApp(){
  return(
    <Routes>
      <Route path='/' element={ <Login /> } />
      <Route path='/home' element={ <CompanyAuth> <Home /> </CompanyAuth> } />
      <Route path='/clients' element={ <CompanyAuth> <Clients /> </CompanyAuth> } />
      <Route path='/orders' element={ <CompanyAuth> <Orders /> </CompanyAuth> } />
      <Route path='/order-detail/:id' element={ <CompanyAuth> <OrderDetail /> </CompanyAuth> } />
    </Routes>
  )
}