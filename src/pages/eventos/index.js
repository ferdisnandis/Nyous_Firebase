import React, { useEffect, useState } from 'react';
import { Table, Button, FormControl, Form, Container, Card } from 'react-bootstrap';
import { db } from '../../utils/FireBaseConfig/firebaseConfig'

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        listarEventos();
    }, [])

    const listarEventos = () => {
        //Obter dados da coleção eventos
        try
        {
            db.collection("eventos")
            .get()
            .then(result => {
                console.log('Collection eventos', result.docs)
                const data = result.docs.map(doc => {
                    return {
                        id : doc.id,
                        nome : doc.data().nome,
                        descricao : doc.data().descricao
                    }
                });
                setEventos(data);
            })
            .catch(error => console.error(error))
        } 
        catch (error)
        {
            console.error(error);
        }
    }

    const editar = (event) => {
        event.preventDefault();

        try {
            db.collection('eventos')
            .doc(event.target.value)
            .get()
            .then(result => {
                setId(result.id);
                setNome(result.data().nome);
                setDescricao(result.data().descricao);
            })
        } catch(error){
            console.log(error);
        }
    }

    const remover = (event) => {
        event.preventDefault();

        try{
            db.collection('eventos')
            .doc(event.target.value)
            .delete()
            .then(() => {
                alert('Evento removido com sucesso!')
                listarEventos();
                limparCampos();
            })

        } catch (error){
            console.error(error);
        }
    }

    const salvar = (event) => {
        event.preventDefault();

        const evento = {
            nome : nome,
            descricao : descricao
        }

        if(id === 0){
            //add evento
            db.collection('eventos')
            .add(evento)
            .then(() => {
                alert('Evento cadastrado com sucesso!');
                listarEventos();
                limparCampos();
            })
            .catch(error => {
                console.error(error);
            })
        } else {
            db.collection('eventos')
            .doc(id)
            .set(evento)
            .then(() => {
                alert('Evento Alterado');
                listarEventos();
                limparCampos();
            })
        }
    }

    const limparCampos = () => {
        setNome('');
        setDescricao('');
    }

    return (
        <Container>
        <h1>Eventos</h1>
        <p>Gerencie seus eventos</p>

        <Card>
            <Card.Body>
                <Form onSubmit={event => salvar(event)}>
                    <Form.Group controlId="formBasicNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome do evento"></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <FormControl as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)}></FormControl>
                    </Form.Group>
                    
                    <Button type="submit">Salvar</Button>
                </Form>
            </Card.Body>
        </Card>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
            {
                    eventos.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td>
                                    <Button variant="warning" value={item.id} onClick={event => editar(event)} >Editar</Button>
                                    <Button variant="danger" value={item.id} onClick={event => remover(event)} style={{ marginLeft : '40px'}}>Remover</Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    </Container>
    )    

}

export default Eventos;