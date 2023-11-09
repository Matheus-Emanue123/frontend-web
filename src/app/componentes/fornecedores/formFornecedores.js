import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBFile,
  MDBValidationItem,
  MDBValidation
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';

export default function FormFornecedores() {
  const [formData, setFormData] = useState({
    razao: '',
    cpf_cnpj: '',
    contato: '',
    logradouro: '',
    cidade: '',
    uf: '',
  });

  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function cadastrarFornecedor() {
    event.preventDefault();

    if(formData.uf.length != 2 || !formData.razao || !formData.cpf_cnpj || !formData.contato || !formData.logradouro || !formData.cidade || !formData.uf) {
      return;
    }

    const data = new FormData();
    data.append('razao', formData.razao);
    data.append('cpf_cnpj', formData.cpf_cnpj);
    data.append('contato', formData.contato);
    data.append('logradouro', formData.logradouro);
    data.append('cidade', formData.cidade);
    data.append('uf', formData.uf);

    if(file) {
      formData.append('file', file);
    }

    axios.post('http://localhost:3012/fornecedor', formData,
    {headers: {
      'Content-Type': 'multipart/form-data'
    }})
    .then((response) => {
      alert('Fornecedor cadastrado com sucesso!');
      window.location.reload();
      console.log(response);
    }).catch((error) => {
      alert('Erro ao cadastrar fornecedor!');
      console.log(error);
    })
  }

  return (
    <MDBValidation  onSubmit={cadastrarFornecedor} style={{ padding: '0 20% 0 20%' }}>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBValidationItem invalid feedback='Indique a razão social!'>
              <MDBInput
                value={formData.razao}
                name='razao'
                required
                id='razao'
                onChange={onChange}
                label='Razão Social' />
            </MDBValidationItem>
          </MDBCol>
          <MDBCol>
            <MDBValidationItem invalid feedback='Indique o CPF/CNPJ!'>
              <MDBInput
                value={formData.cpf_cnpj}
                name='cpf_cnpj'
                required
                onChange={onChange}
                id='cpf_cnpj'
                label='CPF/CNPJ' />
            </MDBValidationItem>
          </MDBCol>
          <MDBCol>
            <MDBValidationItem invalid feedback='Indique o contato!'>
              <MDBInput
                value={formData.contato}
                name='contato'
                required
                onChange={onChange}
                id='contato'
                label='Contato' />
            </MDBValidationItem>
          </MDBCol>
        </MDBRow>

        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBValidationItem invalid feedback='Indique o logradouro!'>
              <MDBInput
                value={formData.logradouro}
                name='logradouro'
                required
                onChange={onChange}
                id='logradouro'
                label='Logradouro' />
            </MDBValidationItem>
          </MDBCol>
          <MDBCol>
            <MDBValidationItem invalid feedback='Indique a cidade!'>
              <MDBInput
                value={formData.cidade}
                name='cidade'
                required
                onChange={onChange}
                id='cidade'
                label='Cidade' />
            </MDBValidationItem>
          </MDBCol>
          <MDBCol>
            <MDBValidationItem invalid feedback='Indique uma UF com duas letras!'>
              <MDBInput
                value={formData.uf}
                name='uf'
                required
                onChange={onChange}
                id='uf'
                label='UF'
                minLength={2}
                maxLength={2}
              />
            </MDBValidationItem>
          </MDBCol>
        </MDBRow>

      <MDBFile value={file} label='Logomarca' id='formFileSm' />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MDBBtn rounded color='success' type='submit'>
          Cadastrar
        </MDBBtn>
      </div>
    </MDBValidation>
  );
}