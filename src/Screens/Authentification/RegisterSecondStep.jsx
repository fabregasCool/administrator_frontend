import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { toast } from 'react-toastify';

import axios from 'axios';
import '../../Style/Authentification.css';

import { Eye, EyeSlash } from 'react-bootstrap-icons';

import { getError } from '../../Utils/getError.js';
import { Store } from '../../Store.jsx';
import { API_URL } from '../../Utils/api_url.js';

const RegisterSecondStep = () => {
  // Partie qui permet d'afficher ou masquer mot de passe
  const [visible, setVisible] = useState(false);

  const toggleVisibility = (e) => {
    e.preventDefault(); // Empêche la propagation de l'événement (il empêche que les valeurs aillent dans l'url)
    setVisible(!visible);
  };

  //Utilisation de useNavigate
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //Declaration des variables
  const [inputs, setInputs] = useState({
    email: '',
    code: 0,
    nom: '',
    prenom: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  //Fonction handleChange
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Fonction handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comparaison des deux mots de passe
    if (inputs.password !== inputs.confirm_password) {
      toast.error('Les deux mots de passe sont différents'); //Affiche Ce message
      return; //Si les mots sont diiférents; tout ce qui se trouve en dessous ne sera pas exécuté
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/auth/register_second_step`,
        inputs
      );
      // Qd on finit de créer l'utilisateur, on se connecte automatique d'où (type: 'USER_SIGNIN')
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Inscription réussie');
      navigate(redirect || '/');
    } catch (err) {
      //alert('Invalid email or password');
      //  toast.error('Invalid email or password');
      toast.error(getError(err)); //Recupère le mess d'erreur veant du backend
    }
  };

  //Grace à ce code, il sera ttrs redirigé vers la page d'accueil si le client est deja connecté
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="">
      <Helmet>
        <title> Créer un Nouvel Utilisateur</title>
      </Helmet>
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="mt-3">
          <h1 className="my-3">Créer un Nouvel Utilisateur</h1>
          <Form className="">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email </Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Code </Form.Label>
              <Form.Control
                required
                type="text"
                name="code"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="nom">
              <Form.Label>Nom </Form.Label>
              <Form.Control
                className="FormControl"
                required
                type="text"
                placeholder="nom"
                name="nom"
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prenom">
              <Form.Label>Prenom </Form.Label>
              <Form.Control
                className="FormControl"
                required
                type="text"
                placeholder="prenom"
                name="prenom"
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone </Form.Label>
              <Form.Control
                className="FormControl"
                required
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password </Form.Label>
              <Form.Control
                required
                autoComplete="new-password"
                type={visible ? 'text' : 'password'}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirm_password">
              <Form.Label>Confirm Password </Form.Label>
              <Form.Control
                required
                autoComplete="new-password"
                type={visible ? 'text' : 'password'}
                name="confirm_password"
                autocomplete="on"
                onChange={handleChange}
              />
              <button onClick={toggleVisibility}>
                {/* {visible ? 'Hide' : 'Show'} Password */}
                {visible ? <EyeSlash /> : <Eye />}
              </button>
            </Form.Group>

            <div className="mb-3">
              <Button variant="primary" onClick={handleSubmit}>
                S'Inscrire
              </Button>
            </div>
            <div className="mb-3">
              Vous avez déja un compte?{' '}
              <Link to={`/login?redirect=${redirect}`}>Login</Link>
            </div>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
};

export default RegisterSecondStep;
