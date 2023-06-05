import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { ENDERECO_SERVIDOR } from '../../util/Constantes';

class ListProduto extends React.Component{

    state = {

        listaProdutos: [],
        openModal: false,
        idRemover: null,
    }

    componentDidMount = () => {
      
        this.carregarLista();
      
    }

    carregarLista = () => {

        axios.get(ENDERECO_SERVIDOR + "/api/produto")
        .then((response) => {
          
            this.setState({
                listaProdutos: response.data
            })
        })

    };

    confirmaRemover = (id) => {

        this.setState({
            openModal: true,
            idRemover: id
        })  
    }

    setOpenModal = (val) => {

        this.setState({
            openModal: val
        })
   
    };

    remover = async () => {

        await axios.delete(ENDERECO_SERVIDOR + '/api/produto/' + this.state.idRemover)
        .then((response) => {
   
            this.setState({ openModal: false })
            console.log('Produto removido com sucesso.')
   
            axios.get(ENDERECO_SERVIDOR + "/api/produto")
            .then((response) => {
           
                this.setState({
                    listaProdutos: response.data
                })
            })
        })
        .catch((error) => {
            this.setState({  openModal: false })
            console.log('Erro ao remover um produto.')
        })
    };

    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> Produto </h2>

                        <Divider />

                        <div style={{marginTop: '4%'}}>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                floated='right'
                            >
                                <Icon name='clipboard outline' />
                                <Link to={'/form-produto'}>Novo</Link>
                            </Button>

                            <br/><br/><br/>
                      
                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Código</Table.HeaderCell>
                                        <Table.HeaderCell>Título</Table.HeaderCell>
                                        <Table.HeaderCell>Descrição</Table.HeaderCell>
                                        <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                                        <Table.HeaderCell>Tempo Mínimo de Entrega</Table.HeaderCell>
                                        <Table.HeaderCell>Tempo Máximo de Entrega</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                          
                                <Table.Body>

                                    { this.state.listaProdutos.map(p => (

                                        <Table.Row key={p.id}>
                                            <Table.Cell>{p.codigo}</Table.Cell>
                                            <Table.Cell>{p.titulo}</Table.Cell>
                                            <Table.Cell>{p.descricao}</Table.Cell>
                                            <Table.Cell>{p.valorUnitario}</Table.Cell>
                                            <Table.Cell>{p.tempoEntregaMinimo}</Table.Cell>
                                            <Table.Cell>{p.tempoEntregaMaximo}</Table.Cell>
                                            <Table.Cell textAlign='center'>
                                              
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                    <Link to="/form-produto" state={{id: p.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;
                                                
                                                <Button
                                                   inverted
                                                   circular
                                                   icon='trash'
                                                   color='red'
                                                   title='Clique aqui para remover este cliente' 
                                                   onClick={e => this.confirmaRemover(p.id)} />

                                            </Table.Cell>
                                       </Table.Row>
                                   ))}

                               </Table.Body>
                           </Table>
                       </div>
                   </Container>
               </div>

               <Modal
                    basic
                    onClose={() => this.setOpenModal(false)}
                    onOpen={() => this.setOpenModal(true)}
                    open={this.state.openModal}
                >
                    <Header icon>
                            <Icon name='trash' />
                            <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
                    </Header>
                    <Modal.Actions>
                            <Button basic color='red' inverted onClick={() => this.setOpenModal(false)}>
                                <Icon name='remove' /> Não
                            </Button>
                            <Button color='green' inverted onClick={() => this.remover()}>
                                <Icon name='checkmark' /> Sim
                            </Button>
                    </Modal.Actions>
                </Modal>
                
           </div>
       )
   }
}

export default ListProduto;