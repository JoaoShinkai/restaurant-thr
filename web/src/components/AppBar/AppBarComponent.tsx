import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import CartButtonComponent from '../CartButtonComponent/CartButtonComponent';
import './index.css';

export default function AppBarComponent(){

  const { company } = useAuth();

  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundColor: '#fa8231'
      }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <i className="fa-sharp fa-solid fa-bars"></i>
          </IconButton>
          <Link to="/home" style={{flex: 1, color: 'white', textDecoration: 'none'}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {company.name}
            </Typography>
          </Link>

          <Link to="/orders" style={{textDecoration: 'none'}}>
            <Button sx={{color: 'white'}}> <i className="fa-solid fa-scroll icon"></i> Minhas Vendas </Button>
          </Link>
          <Link to="/clients" style={{textDecoration: 'none'}}>
            <Button sx={{color: 'white'}}> <i className='fa-solid fa-users icon'></i> Clientes </Button>
          </Link>
          
          <CartButtonComponent />
          <Button color="inherit">Sair</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}