import estilo from './Header.module.css'
import {Link} from 'react-router-dom'


function Header () {
    return (
        <>
            <header className={estilo.header}>

                <div className={estilo.conteiner_header}>
                    <Link to='/'>
                        <img src='../../imagens/logo-container.png' alt='Logo Vacina Recife' />
                    </Link>
                </div>

                <div className={estilo.conteiner_header}>
                    <img src='../../imagens/logo-prefeitura-recife.png' alt='Logo Prefeitura Recife' />
                </div>
                
                <div className={estilo.conteiner_header}>
                    <ul className={estilo.headerList}>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/cadastro'>Cadastro</Link></li>
                    </ul>
                </div>

           </header>
        </>
       
    );

}

export default Header;