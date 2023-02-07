import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/api';
import customToast from '../toast/customToast';

interface CompanyProps {
  id: number;
  name: string;
}

export interface AuthContextDataProps{
  company: CompanyProps,
  isCompanyLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children } : AuthProviderProps){
  const [company, setCompany] = useState<CompanyProps>({} as CompanyProps);
  const [isCompanyLoading, setIsCompanyLoading] = useState(true);

  useEffect(() => {
    async function authUser(){
      setIsCompanyLoading(true);

      const localToken = localStorage.getItem("token");

      if(localToken){
        try{
          
          api.defaults.headers.common['Authorization'] = `Bearer ${localToken}`;

          const response = await api.post('/company/auth');
  
          setCompany(response.data);
  
          return true;
        }
        catch(err){
          customToast.warning("Sessão inválida ou expirada");

          localStorage.removeItem("token");

          return false;
        }
        finally{
          setIsCompanyLoading(false);
        }
      }
      else{
        setIsCompanyLoading(false);
      }

      
    }

    authUser();
  }, [])

  async function signIn(email: string, password: string){
    try{
        const result = await api.post('/company/login', { email, password })

        localStorage.setItem('token', result.data.token);

        api.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

        const companyResponse = await api.post('/company/auth');

        setCompany(companyResponse.data);

        setIsCompanyLoading(false);
        
        return true;

    }catch(err){
        return false;
    }
}

  return (
    <AuthContext.Provider
      value={{
        company,
        isCompanyLoading,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}