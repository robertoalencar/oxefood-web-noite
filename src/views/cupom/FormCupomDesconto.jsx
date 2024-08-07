import axios from "axios";
import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormCupomDesconto () {

    const [codigoDesconto, setCodigoDesconto] = useState();
    const [percentualDesconto, setPercentualDesconto] = useState();
    const [valorDesconto, setValorDesconto] = useState();
    const [valorMinimoPedidoPermitido, setValorMinimoPedidoPermitido] = useState();
    const [quantidadeMaximaUso, setQuantidadeMaximaUso] = useState();
    const [inicioVigencia, setInicioVigencia] = useState();
    const [fimVigencia, setFimVigencia] = useState();

    function salvar() {

		let cupomDescontoRequest = {
		    codigoDesconto: codigoDesconto,
		    percentualDesconto: percentualDesconto,
		    valorDesconto: valorDesconto,
		    valorMinimoPedidoPermitido: valorMinimoPedidoPermitido,
		    quantidadeMaximaUso: quantidadeMaximaUso,
            inicioVigencia: inicioVigencia,
            fimVigencia: fimVigencia
		}
 
        axios.post("http://localhost:8080/api/cupom", cupomDescontoRequest)
        .then((response) => {
            console.log('Cupom cadastrado com sucesso.')
        })
        .catch((error) => {
            console.log('Erro ao incluir o um cupom.')
        })
	}

    return (

        <div>

            <MenuSistema tela={'cliente'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Cupom de Desconto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Código de Desconto'
                                    maxLength="100"
                                    value={codigoDesconto}
                                    onChange={e => setCodigoDesconto(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Percentual de Desconto'
                                    value={percentualDesconto}
                                    onChange={e => setPercentualDesconto(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Valor do Desconto'
                                    maxLength="100"
                                    value={valorDesconto}
                                    onChange={e => setValorDesconto(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Valor Mínimo Permitido para o Pedido'
                                    maxLength="100"
                                    value={valorMinimoPedidoPermitido}
                                    onChange={e => setValorMinimoPedidoPermitido(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Quantidade Máxima de Uso'
                                    maxLength="100"
                                    value={quantidadeMaximaUso}
                                    onChange={e => setQuantidadeMaximaUso(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Início de Vigencia'
                                    width={6}
                                >
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={inicioVigencia}
                                        onChange={e => setInicioVigencia(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fim de Vigencia'
                                    width={6}
                                >
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={fimVigencia}
                                        onChange={e => setFimVigencia(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-cliente'}>Voltar</Link>
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}
