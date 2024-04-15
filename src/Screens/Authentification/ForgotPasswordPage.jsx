import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PersonCircle } from 'react-bootstrap-icons';

import { API_URL } from '../../Utils/api_url.js';
// import { getError } from '../../Utils/getError.js';
// import { Store } from '../../Store.jsx';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);

  //Après avoir créer notre variable, on peut mainteneant l'utiliser

  const [email, setEmail] = useState('');

  //Création de la fonction handleClick
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/users/forgot-password`, {
        email,
      });
      toast.success(
        'Vous avez reçu un lien dans votre boite mail pour reinitialisez votre mot de passe '
      );
      navigate('/login');
    } catch (err) {
      toast.warning(err?.response?.data?.message);
      setError(err?.response?.data?.message); //Afiiche l'erreur de la console
    }
  };

  return (
    <div className=" mt-5">
      <Helmet>
        <title> Recupération du mot de Passe</title>
      </Helmet>

      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6} className=" ">
            <h1 className="my-3 center">
              Besoin d'aide pour votre mot de passe ?
            </h1>
            <h3 className="center">Veuillez entrez votre adresse email</h3>
            {/* Affiche l'erreur venant du backend */}
            {err && <Alert variant="danger fs-4 fw-bold">{err}</Alert>}

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {' '}
                <PersonCircle color="#000" size={30} className="me-3" />
              </InputGroup.Text>

              <Form.Control
                className="border-5"
                type="text"
                value={email}
                placeholder="Adresse Email de l'utilisateur "
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </InputGroup>

            <Button
              variant="success"
              className="mt-2 mb-5 fs-3"
              onClick={handleClick}
            >
              Envoyer
            </Button>
          </Col>
          <Col md={3}> </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
