import { useState } from 'react';
import InputBlock from './InputBlock';
import Button from '../botao/Button';
import estilo from './Cadastro.module.css';

function Cadastro () {

    const [cpf, setCpf] = useState();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [senhaConf, setSenhaConf] = useState();

    async function cadatrarUsuario (e) {
        e.preventDefault();
        
        if (cpf == undefined) {
            alert("Preencha o campo referente ao CPF")
        }else if (nome == undefined) {
            alert("Preencha o campo referente ao nome")
        }else if (email == undefined) {
            alert("Preencha o campo referente ao email")
        }else if (senha != senhaConf) {
            alert("Senhas diferentes")
        }else {
            /*Request com API fetch */
            await fetch('http://localhost:2022/cadastro-usuario', {
            method: 'POST',
            body: JSON.stringify({
                cpf: cpf,
                nome:nome,
                email:email,
                senha:senha
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((dado) => {
               
                alert(dado.msg);
            } );

        }
       
    }

    return(
        <section>
            <form id={estilo.form_cadastro}>

                <h1 className={estilo.title_cadastro}>Cadastro</h1>

                <InputBlock label="CPF" type="text" placeholder="Exep: 99999999999" setState={setCpf}/>
                <InputBlock label="Nome" type="text" placeholder="Exep: Marcelo Silva" setState={setNome}/>
                <InputBlock label="Email" type="text" placeholder="Exp: teste@gmail.com" setState={setEmail}/>
                <InputBlock label="Senha" type="password" setState={setSenha}/>
                <InputBlock label="Confirmar Senha" type="password" setState={setSenhaConf}/>
                <Button nome='Cadastrar' setState={cadatrarUsuario} />
                                
            </form>
        </section>  
    );
}

export default Cadastro;