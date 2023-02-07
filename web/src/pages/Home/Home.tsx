import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Tab, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import AppBarComponent from '../../components/AppBar/AppBarComponent';
import ProductCardComponent from '../../components/ProductCard/ProductCardComponent';
import { api } from '../../lib/api';
import customToast from '../../toast/customToast';
import './index.css';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

interface CategoryProps{
  id: number;
  name: string;
  icon: string;
  products: ProductProps[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home(){
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    loadCategories();
  }, [])

  const handleClickOpen = (category: number) => {
    return (event: React.MouseEvent) => {
      setOpen(true);
      setSelectedCategory(category)
      event.preventDefault();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function createProduct(){

    try{
      await api.post('/product', {
        name, description, price, quantity, image, category: { id: selectedCategory }
      })

      customToast.success("Produto adicionado com sucesso");

      setName('');
      setDescription('');
      setPrice(0);
      setQuantity(0);
      setImage('');

      setOpen(false)
      loadCategories();
    }
    catch(err){
      customToast.error("Erro ao cadastrar novo produto");
    }
    

    
  }

  async function loadCategories(){
    try{
      const result = await api.get('/category/');

      setCategories(result.data);
      setSelectedCategory(result.data[0].id);
      
      console.log(result);
    }catch(err){
      console.log(err);
    }
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return(
    <div className='page-container'>
      <AppBarComponent />
      <div className='home-container'>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ style: { backgroundColor: '#fa8231' }}} >
            {
              categories.map(category => {
                return (
                  <Tab key={category.id} label={category.name} {...a11yProps(category.id)} sx={{ color: '#fa8231 !important'}} />
                )
              })
            }
          </Tabs>
        </Box>
        {
            categories.map((category, index) => {
              return(
                  <TabPanel key={`tabpanel-${category.id}`} value={value} index={index}>
                    <div className='home-header'>
                      <button onClick={handleClickOpen(category.id)}> <i className="fa-solid fa-plus"></i> Novo Produto </button>
                    </div>
                    <div className='cards-container'>
                      {
                        category.products.map(product => {
                          return(
                            <ProductCardComponent key={`product-${product.id}`} product={product} />
                          )
                        })
                      }
                    </div>
                    
                  </TabPanel>
              )
            })
          }
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "600px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Novo Produto"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <FormControl fullWidth>
            <div className='modal-create-product-image'>
              <img src={image} alt="" />
            </div>
            <TextField
              required
              id="filled-required"
              label="URL da imagem"
              variant="outlined"
              onChange={e => setImage(e.target.value)}
              margin={'normal'}
            />
            <TextField
              required
              id="filled-required"
              label="Nome"
              variant="outlined"
              defaultValue={name}
              onChange={e => setName(e.target.value)}
              margin={'normal'}
            />
            <TextField
              required
              id="filled-required"
              label="Descrição"
              variant="outlined"
              defaultValue={description}
              onChange={ e => setDescription(e.target.value)}
              margin={'normal'}
            />
            <TextField
              required
              id="filled-required"
              label="Preço"
              variant="outlined"
              defaultValue={price}
              onChange={ e => setPrice(Number(e.target.value))}
              margin={'normal'}
            />
            <TextField
              required
              id="filled-required"
              label="Quantidade em estoque"
              variant="outlined"
              defaultValue={quantity}
              onChange={ e => setQuantity(Number(e.target.value))}
              margin={'normal'}
            />
          </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={createProduct} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}