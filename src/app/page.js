'use client';

import React, { useEffect, useState } from 'react';
import './globals.css';
import ListaClientes from './componentes/clientes/listaClientes';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaFornecedores from './componentes/fornecedores/listaFornecedores';
import Nav from 'react-bootstrap/Nav';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBNavbarItem,
} from 'mdb-react-ui-kit';

import FormClientes from './componentes/clientes/formClientes';
import FormFornecedores from './componentes/fornecedores/formFornecedores';



const App = () => {
  const [isCliente, setIsCliente] = useState(true);
  const [isForm, setIsForm] = useState(false);
  const [isCadastro, setIsCadastro] = useState(true);
  const [dadosCliente, setDadosCliente] = useState({});
  const [dadosFornecedor, setDadosFornecedor] = useState({});

  

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
       <MDBNavbar expand='lg' sticky light bgColor='lightgray' className="dark-background">
      <MDBContainer className='justify-content-center' fluid>
        <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0'>
          <Nav variant="pills" className="flex-column" defaultActiveKey="clientes" activeKey={isCliente ? "clientes" : "fornecedores"} as="ul">
            <MDBNavbarItem>
              <Nav.Item style={{ color: 'grey' }}>
                <Nav.Link style={{ color: !isCliente ? 'black' : '#808080' }} eventKey="clientes" onClick={handleClienteClick}>Clientes</Nav.Link>
              </Nav.Item>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Nav.Item style={{ color: 'grey' }}>
                <Nav.Link style={{ color: isCliente ? 'black' : '#808080' }} eventKey="fornecedores" onClick={handleFornecedorClick}>Fornecedores</Nav.Link>
              </Nav.Item>
            </MDBNavbarItem>
          </Nav>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>

<header className="p-3 bg-light text-center">
  <h1>Bem vindo ao meu frontend-react-web!</h1>
</header>

<main className='mt-4 p-3' style={{ margin: '0 0% 0 0%' }}>
  <MDBContainer className="p-3 border myCustomBox">
    <MDBBreadcrumb>
      <MDBBreadcrumbItem>
        <a href='#' onClick={() => setIsForm(false)} style={{color: isForm ? 'darkgray' : 'black', textDecoration: !isForm ? 'underline' : null }} >Lista</a>
      </MDBBreadcrumbItem>
      <MDBBreadcrumbItem>
        <a href='#' onClick={() => setIsForm(true)} style={{color: !isForm ? 'darkgray' : 'black', textDecoration: isForm ? 'underline' : null }}>Formulário</a>
      </MDBBreadcrumbItem>
    </MDBBreadcrumb>
  </MDBContainer>
</main>
      </>
    );
  }

  return (
    <main>
      <>
        <BarraNavegacao setIsCliente={setIsCliente} />
        <div style={{ margin: '0 10% 0 10%' }}>
          {isCliente ? 
            !isForm ? <ListaClientes 
              setIsForm={() => setIsForm(true)}
              setIsCadastro={(op) => setIsCadastro(op)} 
              editar={(dados) => setDadosCliente(dados)} />
            : <FormClientes 
                operacao={isCadastro}
                dadosCliente={dadosCliente} /> 
          : !isForm ? <ListaFornecedores 
              setIsForm={() => setIsForm(true)}
              setIsCadastro={(op) => setIsCadastro(op)}
              editar={(dados) => setDadosFornecedor(dados)} />
          : <FormFornecedores 
              operacao={isCadastro}
              dadosFornecedor={dadosFornecedor}/>}
        </div>
      </>

      <footer className="p-3 bg-light text-center">
  <p>© 2023 FRONTEND DO MATHEUS</p>
</footer>


    </main>
  );

};
export default App;