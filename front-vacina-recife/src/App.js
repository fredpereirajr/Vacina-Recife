
import './App.css';

/*Importanto os pacotes necessários do React Router*/
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Header from './componentes/header/Header';
import Login from './componentes/login-cadastro/Login';
import Cadastro from './componentes/login-cadastro/Cadastro';


/*Componente central da aplicação.*/
function App() {
 
  return (
    <Router>
       <Header/>
       <Routes>
         <Route path='/login' element={<Login />}>
         </Route>
       </Routes>
       <Routes>
         <Route path='/cadastro' element={<Cadastro />}>
         </Route>
       </Routes>
    </Router>
  );
}

export default App;
