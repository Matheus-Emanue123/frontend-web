import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalExcluirCliente(props) {
    if(props.client){
        var id = props.client.id_cliente;
        const [matches, setMatches] = useState(
            window.matchMedia("(min-width: 768px)").matches
        )

        function excluir(){
            axios.post('http://localhost:3012/cliente_del/' + id)
            .then(response => {
                alert('Cliente excluído com sucesso!');
                props.onDelete();
                props.onHide();
            })
            .catch(error => {
                console.log(error)
                alert('Erro! Tente novamente!');
            })
        }

        useEffect(() => {
            window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches( e.matches ));
        }, [props.client]);

        if (props.client) {
            return (
                <>
                    <Modal
                        show={props.show}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={props.onHide}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <MDBTypography tag="h5">Deseja mesmo excluir o cliente ?</MDBTypography>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <MDBBtn rounded color="outline-info" onClick={props.onHide}>Cancelar</MDBBtn>
                            <MDBBtn rounded color="outline-danger" onClick={excluir}>Excluir</MDBBtn>
                        </Modal.Footer>
                    </Modal>
                </>
            )
        }
    }
}