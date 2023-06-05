import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { ENDERECO_SERVIDOR } from '../../util/Constantes';

class ListEntregador extends React.Component{

    state = {

        listaEntregadores: [],
        openModal: false,
        idRemover: null,
    }
    

    componentDidMount = () => {
      
        this.carregarLista();
      
    }

    carregarLista = () => {

        axios.get(ENDERECO_SERVIDOR + "/api/entregador")
        .then((response) => {
          
            this.setState({
                listaEntregadores: response.data
            })
        })

    };

    formatarData = (dataParam) => {

        if (dataParam == null || dataParam == '') {
            return ''
        }
        
        let dia = dataParam.substr(8,2);
        let mes = dataParam.substr(5,2);
        let ano = dataParam.substr(0,4);
        let dataFormatada = dia + '/' + mes + '/' + ano;

        return dataFormatada
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

        await axios.delete(ENDERECO_SERVIDOR + '/api/entregador/' + this.state.idRemover)
        .then((response) => {
   
            this.setState({ openModal: false })
            console.log('Entregador removido com sucesso.')
   
            axios.get(ENDERECO_SERVIDOR + "/api/entregador")
            .then((response) => {
           
                this.setState({
                    listaEntregadores: response.data
                })
            })
        })
        .catch((error) => {
            this.setState({  openModal: false })
            console.log('Erro ao remover um entregador.')
        })
    };

    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> Entregador </h2>

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
                                <Link to={'/form-entregador'}>Novo</Link>
                            </Button>

                            <br/><br/><br/>
                      
                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Nome</Table.HeaderCell>
                                        <Table.HeaderCell>CPF</Table.HeaderCell>
                                        <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                        <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                        <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                          
                                <Table.Body>

                                    { this.state.listaEntregadores.map(entregador => (

                                        <Table.Row key={entregador.id}>
                                            <Table.Cell>{entregador.nome}</Table.Cell>
                                            <Table.Cell>{entregador.cpf}</Table.Cell>
                                            <Table.Cell>{this.formatarData(entregador.dataNascimento)}</Table.Cell>
                                            <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                            <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                            <Table.Cell textAlign='center'>
                                              
                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste cliente'
                                                    icon>
                                                        <Link to="/form-entregador" state={{id: entregador.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;
                                                
                                                <Button
                                                   inverted
                                                   circular
                                                   icon='trash'
                                                   color='red'
                                                   title='Clique aqui para remover este cliente' 
                                                   onClick={e => this.confirmaRemover(entregador.id)} />

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

export default ListEntregador;