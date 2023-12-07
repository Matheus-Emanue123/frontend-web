import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { MDBCol, MDBRow, MDBCard, MDBCardText,MDBBtn, MDBCardBody, MDBCardImage, MDBCardTitle, MDBIcon } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalPerfilCliente(props) {

  const [imageError, setImageError] = useState(false);
  const [matches, setMatches] = useState(
    typeof window !== 'undefined' ? window.matchMedia("(min-width: 768px)").matches : false
  )

  useEffect(() => {
    if (imageError) {
      setImageError(false);
    }

    const handler = e => setMatches(e.matches);

    if (typeof window !== 'undefined') {
      window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.matchMedia("(min-width: 768px)").removeEventListener('change', handler);
      }
    }
  }, [props.client]);
  if (props.client) {
    var salario = Number(+props.client.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    var selectedClient = props.client;
    var data = new Date(selectedClient.data_cadastro);

    return (
      <>
        <Modal
          show={props.show}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={props.onHide}
        >
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol lg="12" className="mb-lg-0">
              <MDBCard style={{ borderRadius: '.4rem', padding: '20px' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-white">
                    {
                      imageError ? (
                        <MDBIcon className='my-5 img-fluid' fas icon="user-alt" size='3x' />
                      ) : (
                        <MDBCardImage src={`http://localhost:3012/cliente/C${selectedClient.id_cliente}.jpeg`}
                          alt="Avatar" className="bg-image my-5 img-fluid rounded-circle hover-zoom" style={{ width: '100px' }}
                          onError={() => setImageError(true)}
                        />
                      )
                    }
                    <h5 className="mt-3" style={{ color: 'black' }}>{selectedClient.nome} {selectedClient.sobrenome}</h5>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-md-4 mx-3">
                      <MDBCardTitle tag="h5">{selectedClient.email}</MDBCardTitle>
                      <MDBCardText>
                        Salário: {salario} <br />
                        Data de Cadastro: {data.toLocaleDateString()}
                      </MDBCardText>
                      <MDBBtn color="secondary" onClick={props.onEdit}>Update</MDBBtn>
                      <MDBBtn color="danger" onClick={props.onDelete}>Delete</MDBBtn>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </Modal>
      </>
    )
  }
}