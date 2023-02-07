import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { api } from '../../lib/api';
import customToast from '../../toast/customToast';
import './index.css';

export default function Login(){

  
  const [createName, setCreateName] = useState<string>('');
  const [createEmail, setCreateEmail] = useState<string>('');
  const [createPassword, setCreatePassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');


  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function login(){
    setIsLoadingLogin(true);
    const login = await signIn(email, password);

    if(login){
      navigate("/home")
    }
    else{
      customToast.error("Erro ao realizar o login");
    }
    setIsLoadingLogin(false);
  }

  async function register(){

    if(createName === '' || createEmail === '' || createPassword === ''){
      customToast.error("Todos os campos devem estar preenchidos");
      return;
    }

    if(createPassword !== confirmPassword){
      customToast.error("As senhas devem ser iguais");
      return;
    }

    try{
      await api.post('/company', { name: createName, email: createEmail, password: createPassword });

      customToast.success("Cadastrado com sucesso");
    }catch(err){
      customToast.error("Não foi possível realizar o cadastro");
    }
  }

  return(
    <div className='page-container' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
      <div className='login-page'>
        <div className='login-content'>
          {/* <div className='login-image-shadow'></div>
          <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80" alt="" /> */}
          <div className='login-content-form'>
            <div className='form-header'>
              <div className='form-header-title'>Cadastre-se</div>
              <div className='form-header-subtitle'>Crie sua conta para ter acesso ao sistema</div>
            </div>
            <FormControl fullWidth>
              <TextField
                required
                id="filled-required"
                label="Nome"
                variant="filled"
                defaultValue={createName}
                onChange={ e => setCreateName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                id="filled-required"
                label="Email"
                variant="filled"
                defaultValue={createEmail}
                onChange={ e => setCreateEmail(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                id="filled-required"
                label="Senha"
                variant="filled"
                type="password"
                defaultValue={createPassword}
                onChange={ e => setCreatePassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                id="filled-required"
                label="Confirmar Senha"
                variant="filled"
                type="password"
                defaultValue={confirmPassword}
                onChange={ e => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <div>
              <Button variant="contained" onClick={register}>Cadastrar</Button>
            </div>
            
          </div>
        </div>
        <div className='login-content'>
          <div className='login-content-form'>
            <div className='form-header'>
              <div className='form-header-title'>LOGIN</div>
              <div className='form-header-subtitle'>Entre para acessar sua conta</div>
            </div>
            <FormControl fullWidth>
              <TextField
                required
                id="filled-required"
                label="Email"
                variant="filled"
                defaultValue={email}
                onChange={ e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                id="filled-required"
                label="Senha"
                variant="filled"
                type="password"
                defaultValue={password}
                onChange={ e => setPassword(e.target.value)}
              />
            </FormControl>
            <div>
              <LoadingButton loading={isLoadingLogin} variant="contained" onClick={login}>Entrar</LoadingButton>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  )
}