import { MDBContainer, MDBInput, MDBBtn, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';
import React, { useState, useRef } from 'react';

const LoginCliente = (props) => {
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        nome: '',
        email: ''
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const isFormValid = formRef.current.checkValidity();

        if (!isFormValid) {
            return;
        }

        setFormData({
            nome: formData.nome.trim(),
            email: formData.email.trim()
        });

        console.log(formData);

        fetch('http://localhost:3012/cliente_all')
            .then(response => response.json())
            .then(data => {
                var validado = false;
                for (const element of data) {
                    if (element.nome === formData.nome && element.email === formData.email) {
                        alert('Login realizado! Bem vindo ao meu frontend-web-react!');
                        validado = true;
                        props.onLogin(element);
                        break;
                    }
                }
                if (!validado)
                    alert('Login ou senha incorretos!');
            })
            .catch(erro => {
                console.log(erro)
                alert('Erro: ', erro);
            });
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <MDBContainer className='p-lg-5 d-flex align-items-center justify-content-center' style={{ width: '40%', height: '100%', backgroundColor: 'darkgray' }}>
                <MDBValidation ref={formRef} onSubmit={e => handleLogin(e)} style={{ padding: '0 20% 0 20%' }}>
                    <p className="h1 text-center mb-4">Faça seu login!</p>
                    <div className="grey-text">
                        <MDBValidationItem invalid feedback='Indique o nome!'>
                            <MDBInput className='mb-4' label="Seu nome" name='nome' id='nome' onChange={onChange} value={formData.nome} required type="text" style={{ backgroundColor: 'lightgray' }} />
                        </MDBValidationItem>
                        <MDBValidationItem invalid feedback='Indique o email!'>
                            <MDBInput className='mb-4' label="Seu email" name='email' id='email' onChange={onChange} value={formData.email} required type="email" style={{ backgroundColor: 'lightgray' }} />
                        </MDBValidationItem>
                    </div>
                    <div className="text-center">
                        <MDBBtn className="dark-background" style={{ color: 'white' }} type='submit' block>
                            Login
                        </MDBBtn>
                    </div>
                </MDBValidation>
            </MDBContainer>
            <div className="dark-background" style={{ width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '2em' }}>   
                <div>BEM VINDO!</div>
                <div>FAÇA SEU LOGIN EM NOSSO SITE!</div>
            </div>
        </div>
    );
}

export default LoginCliente;