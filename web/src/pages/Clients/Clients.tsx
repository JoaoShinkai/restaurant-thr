import { Button, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import AppBarComponent from '../../components/AppBar/AppBarComponent';
import { api } from '../../lib/api';
import customToast from '../../toast/customToast';
import './index.css';

interface Client{
  id: number;
  name: string;
  phone: string;
}

export default function Clients(){

  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadClients();
  }, [])

  async function loadClients(){
    try{
      const result = await api.get('/client');

      setClients(result.data);
    }catch(err){
      customToast.error('Não foi possível carregar os clientes')
    }
  }

  async function createClient(){
    if(name === ''  || phone === ''){
      customToast.error("Todos os campos devem estar preenchidos")
    }

    try{
      await api.post('/client', {name, phone});

      customToast.success("Cliente cadastrado com sucesso");

      loadClients();
    }catch(err){
      customToast.error("Erro ao cadastrar cliente")
    }
  }

  return(
    <div className='page-container' style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f1f1f1' }}>
      <AppBarComponent />  
      <div className='clients-container'>
        <div className='clients-container-list'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Telefone/Celular</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow
                    key={client.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {client.name}
                    </TableCell>
                    <TableCell align="right">{client.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='clients-container-create'>
          <FormControl fullWidth>
            <TextField
              required
              id="filled-required"
              label="Nome"
              variant="outlined"
              defaultValue={name}
              onChange={e => setName(e.target.value)}
              margin={'normal'}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              required
              id="filled-required"
              label="Telefone/Celular"
              variant="outlined"
              defaultValue={phone}
              onChange={e => setPhone(e.target.value)}
              margin={'normal'}
            />
          </FormControl>
          <div>
            <Button onClick={createClient} variant='contained'> Cadastrar </Button>
          </div>
        </div>
      </div>
    </div>
  )
}