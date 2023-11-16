'use client';

import React, { useState } from 'react';
import './globals.css';
import ListaClientes from './componentes/clientes/listaClientes';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaFornecedores from './componentes/fornecedores/listaFornecedores';
import Nav from 'react-bootstrap/Nav';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBNavbarItem,
} from 'mdb-react-ui-kit';
import FormClientes from './components/clientes/formClientes';
import FormFornecedores from './components/fornecedores/formFornecedores';

const App = () => {
  const [isCliente, setIsCliente] = useState(true);
  const [isCadastro, setIsCadastro] = useState(false);
  const [showNavCentred, setShowNavCentred] = useState(false);

  function BarraNavegacao(props) {
    const { setIsCliente } = props;

    const handleClienteClick = () => {
      setIsCliente(true);
    };

    const handleFornecedorClick = () => {
      setIsCliente(false);
    };

    return (
      <>
        <MDBNavbar expand='lg' sticky light bgColor='light'>
          <MDBContainer className='justify-content-center' fluid>
              <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0'>
                <Nav variant="underline" className="justify-content-center" defaultActiveKey="clientes" activeKey={isCliente ? "clientes" : "fornecedores"} as="ul">
                  <MDBNavbarItem>
                    <Nav.Item style={{ color: 'grey' }} as="li">
                      <Nav.Link style={{ color: !isCliente ? '#85898d' : null }} eventKey="clientes" onClick={handleClienteClick}>Clientes</Nav.Link>
                    </Nav.Item>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <Nav.Item style={{ color: 'grey' }} as="li">
                      <Nav.Link style={{ color: isCliente ? '#85898d' : null }} eventKey="fornecedores" onClick={handleFornecedorClick}>Fornecedores</Nav.Link>
                    </Nav.Item>
                  </MDBNavbarItem>
                </Nav>
              </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>
        <div className='mt-4' style={{ margin: '0 10% 0 10%' }}>
          <h1>{ isCliente ? 
                  isCadastro ? 'Cadastro de clientes' 
                  : 'Lista de clientes'
                : isCadastro ? 'Cadastro de fornecedores' 
                : 'Lista de fornecedores' }</h1>
          <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <a href='#' onClick={() => setIsCadastro(false)} style={{color: isCadastro ? '#85898d' : '#4f4f4f', textDecoration: !isCadastro ? 'underline' : null }} >Lista</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <a href='#' onClick={() => setIsCadastro(true)} style={{color: !isCadastro ? '#85898d' : '#4f4f4f', textDecoration: isCadastro ? 'underline' : null }}>Formulário</a>
            </MDBBreadcrumbItem>
          </MDBBreadcrumb>
      </div>
      </>
    );
  }

  return (
    <main>
      <>
        <BarraNavegacao setIsCliente={setIsCliente} />
        <div style={{ margin: '2% 10% 2% 10%' }}>
          {isCliente ? 
            !isCadastro ? <ListaClientes />
            : <FormClientes /> 
          : !isCadastro ? <ListaFornecedores />
          : <FormFornecedores />}
        </div>
      </>
    </main>
  );

};
export default App;