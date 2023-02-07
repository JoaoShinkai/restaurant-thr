import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import RoutesApp from './routes';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} theme="colored" />
        <RoutesApp />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
