import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import logo from '../../assets/logo_2.png'
import { useFirebaseApp } from 'reactfire';

const Cadastro = () => {
    const firebase = useFirebaseApp();

    const [email, setEmail ] = useState('');
    const [senha, setSenha] = useState('')
    
    const Logar = (event) => {
        event.preventDefault();

        console.log(`${email} - ${senha}`);

        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(result => {
            localStorage.setItem('nyous-senai', result.user.refreshToken);
            alert('Usuário cadastrado')
        })
        .catch(error => {
            alert('Email ou senha inválidos')
            console.error(error);
        })
    }

    return (
        <Container className='form-height'>
        <Form className='form-signin' onSubmit={event => Logar(event)} >
            <div className='text-center'>
                <img src={logo} alt='EduX' style={{ width: '64px' }} />
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Insira seu email" value={email} onChange={event => setEmail(event.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Insira sua senha" value={senha} onChange={event => setSenha(event.target.value)} required/>

                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
                <br /><br />
                <a href='/cadastrar' style={{ marginTop: '30px' }}>Quero criar minha conta!</a>
            </div>
        </Form>
    </Container>
    )

}
export default Cadastro;