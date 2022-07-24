import {useEffect, useState}  from 'react';
import InputBlock from './InputBlock';
import Button from '../botao/Button';
import estilo from './Login.module.css';

function Login () {

    const [cpf, setCpf] = useState();
    const [senha, setSenha] = useState();

    async function logar (e) {
        e.preventDefault();

        /*Request com API fetch */
        await fetch('http://localhost:2022/login', {
        method: 'POST',
        body: JSON.stringify({
            cpf: cpf,
            senha: senha
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((dado) => {

            /*Não foi possível fazer o login */
            if (dado.erro) {
              
                alert(dado.msg)
            }else {
                //Rotacionar para página inicial da aplicação
               
                alert(dado.msg);
                
            }

        } );
       
    }

    return(
        <section>
            <form id={estilo.form_login}>

                <h1 className={estilo.title_login} >Login</h1>

                <InputBlock 
                label="CPF" 
                type="text" 
                placeholder="Exep: 99999999999"
                setState ={setCpf}
                />

                <InputBlock 
                label="Senha" 
                type="password"
                setState ={setSenha}
                />

                <Button setState={logar} nome="Entrar"/>
                                
            </form>
        </section>  
        
    );
}

export default Login;