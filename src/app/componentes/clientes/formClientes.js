import React from 'react';
import { TextField, Button, Box, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBValidationItem,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1),
    },
    largeAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
}));

export default function FormClientes(props) {
  const [isCadastro, setIsCadastro] = useState(true);

  const formRef = useRef(null);
  const classes = useStyles();

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    salario: '',
  });

  useEffect(() => {
    if (Object.keys(props.dadosCliente).length > 0) {
      setIsCadastro(false);
      setFormData(props.dadosCliente);
    }
  }, [props.dadosCliente]);

  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleFileChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
  
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  

  function cadastrarCliente(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const isFormValid = formRef.current.checkValidity();
  

    if(!isFormValid){
        return;
    }

    const data = new FormData();
    data.append('nome', formData.nome);
    data.append('sobrenome', formData.sobrenome);
    data.append('email', formData.email);
    data.append('salario', formData.salario);

    if(file) {
      data.append('avatar', file);
    }

    if (isCadastro) { 
      axios.post('http://localhost:3012/cliente', data,
      {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        setIsCadastro(false);
        alert('Cliente cadastrado com sucesso!');
        window.location.reload();
      }).catch((error) => {
        alert('Erro ao cadastrar cliente! Tente novamente.');
      })
    } else {
      axios.patch('http://localhost:3012/cliente_up/' + formData.id_cliente, data,
      {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        alert('Cliente editado com sucesso!');
        window.location.reload();
      }).catch((error) => {
        alert('Erro ao editar cliente!');
      })
    }
  }

  return (
    <form 
    ref={formRef}
    className={classes.root} 
    noValidate 
    autoComplete="off" 
    onSubmit={cadastrarCliente} 
    style={{ padding: '0 20% 0 20%' }}
  >
      <h1>{ isCadastro ? 'Cadastro' : 'Edição'} de clientes</h1>
        <MDBRow className='mb-4'>
          <MDBCol>
          <MDBValidationItem invalid={formData.nome === ''} feedback='Preencha o nome!'>
            <MDBInput label="Nome" id="nome" name="nome" value={formData.nome} onChange={onChange} style={{ marginBottom: '20px' }}  />
            </MDBValidationItem>
            <MDBValidationItem invalid={formData.email === ''} feedback='Preencha o email!'>
            <MDBInput label="Email" id="email" name="email" value={formData.email} onChange={onChange}  style={{ marginBottom: '20px' }} />
            </MDBValidationItem>
          </MDBCol>
          <MDBCol>
            <MDBValidationItem invalid feedback='Preencha o sobrenome!'>
            <MDBInput label="Sobrenome" id="sobrenome" name="sobrenome" value={formData.sobrenome} onChange={onChange}  style={{ marginBottom: '20px' }} />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='Preencha o salário!'>
        <MDBInput label="Salário" id="salario" name="salario" value={formData.salario} onChange={onChange}  style={{ marginBottom: '20px' }} />
        </MDBValidationItem>
          </MDBCol>
        </MDBRow>    

        <MDBRow>
        <MDBCol>
        <Avatar alt="Profile Picture" src={file} className={classes.largeAvatar} style={{ marginTop: '10px' }} />
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
           <label htmlFor="raised-button-file">
  <MDBBtn variant="raised" component="span" className={classes.button} style={{ marginTop: '10px' }} type="button">
    <label htmlFor="contained-button-file" className="fileUploadButton">
      Upload Image
    </label>
    <input
      accept="image/*"
      className="fileUploadInput"
      id="contained-button-file"
      multiple
      type="file"
      onChange={handleFileChange}
    />
  </MDBBtn>
</label>
            
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <MDBBtn variant="contained" color="secondary" type="submit"style={{ marginTop: '10px' }}>
            Cadastrar
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      
      </form>

  );
}