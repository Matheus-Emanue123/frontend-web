import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBFile
} from 'mdb-react-ui-kit';

export default function FormClientes() {
  return (
    <form style={{ padding: '0 20% 0 20%' }}>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='nome' label='Nome' />
        </MDBCol>
        <MDBCol>
          <MDBInput id='sobrenome' label='Sobrenome' />
        </MDBCol>
      </MDBRow>

      <MDBInput wrapperClass='mb-4' type='email' id='email' label='Email' />
      <MDBInput wrapperClass='mb-4' type='number' min={0} id='salario' label='Salário' />
      <MDBFile label='Foto de perfil' id='formFileSm' />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MDBBtn rounded color='success' type='submit'>
          Cadastrar
        </MDBBtn>
      </div>
    </form>
  );
}