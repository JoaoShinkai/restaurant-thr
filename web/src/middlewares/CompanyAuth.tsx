import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

import CircularProgress from '@mui/material/CircularProgress';

export interface props {
    children: React.ReactNode; 
}

export default function CompanyAuth({ children }: props){

    const { company, isCompanyLoading} = useAuth();


    if(isCompanyLoading){
        return(
            <div className='min-h-screen bg-zinc-800 flex justify-center items-center'>
                <CircularProgress />
            </div>
        )
    }
    
    if(!company.id){
        return <Navigate to="/" />
    }


    return (
        <>
            {children}
        </>
    )
}