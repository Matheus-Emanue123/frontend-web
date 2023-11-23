import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

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
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  },
}));

export default function FormFornecedores() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    razao: '',
    cpf_cnpj: '',
    contato: '',
    logradouro: '',
    cidade: '',
    uf: '',
  });

  const [profilePic, setProfilePic] = useState(null);

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
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function cadastrarFornecedor(event) {
    event.preventDefault();

  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={cadastrarFornecedor}>
      <MDBRow>
        <MDBCol>
          <MDBInput label="Razão" id="razao" name="razao" value={formData.razao} onChange={onChange}  style={{ marginBottom: '20px' }} />
          <MDBInput label="CPF/CNPJ" id="cpf_cnpj" name="cpf_cnpj" value={formData.cpf_cnpj} onChange={onChange} style={{ marginBottom: '20px' }}  />
          <MDBInput label="Contato" id="contato" name="contato" value={formData.contato} onChange={onChange}  style={{ marginBottom: '20px' }} />
        </MDBCol>
        <MDBCol>
          <MDBInput label="Logradouro" id="logradouro" name="logradouro" value={formData.logradouro} onChange={onChange} style={{ marginBottom: '20px' }}  />
          <MDBInput label="Cidade" id="cidade" name="cidade" value={formData.cidade} onChange={onChange}  style={{ marginBottom: '20px' }} />
          <MDBInput label="UF" id="uf" name="uf" value={formData.uf} onChange={onChange}  style={{ marginBottom: '20px' }} />
        </MDBCol>
      </MDBRow>

    
      <MDBRow>
        <MDBCol>
        <Avatar alt="Profile Picture" src={profilePic} className={classes.largeAvatar} style={{ marginTop: '10px' }} />
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <MDBBtn variant="raised" component="span" className={classes.button}style={{ marginTop: '10px' }}>
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