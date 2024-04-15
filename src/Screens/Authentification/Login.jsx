import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../Store.jsx';

import { toast } from 'react-toastify';

import { API_URL } from '../../Utils/api_url.js';

import { Eye, EyeSlash } from 'react-bootstrap-icons';

export default function Login() {
  // Lorsque je réinitialise le mot de passe oublié, je veux afficher un mess qui dit que l'opération s'est bien passé, c'est le code ci dessous qui gère cela
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');

  useEffect(() => {
    if (success === 'true') {
      toast.success(
        'Réinitialisation du mot de passe réussie. Veuillez vous connecter avec votre nouveau mot de passe.'
      );
    }
  }, [success]);
  //

  // Partie qui permet d'afficher ou masquer mot de passe
  const [visible, setVisible] = useState(false);

  const toggleVisibility = (e) => {
    e.preventDefault(); // Empêche la propagation de l'événement (il empêche que les valeurs aillent dans l'url)
    setVisible(!visible);
  };
  //
  //
  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);
  //
  const navigate = useNavigate();

  // Code pour l'obliger a rester sur sur la page d'accueil si un utilisateur est déja connecté
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //Declaration des variables
  const [inputs, setInputs] = useState({
    // email: '',
    phone: '',
    password: '',
  });

  // Avoir accès au données stockés dans le local storage
  const { state, dispatch: ctxDispatch } = useContext(Store);

  //Recuperer notre utilisateur actuel qui se trouve dans le state(local storage)
  const { userInfo } = state;

  //Fonction handleChange
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Fonction handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, inputs);
      //console.log(data);
      ctxDispatch({ type: 'USER_SIGNIN', payload: data }); //Appelle de l'action USER_SIGNIN
      localStorage.setItem('userInfo', JSON.stringify(data)); //On enregistre les infos de l'user dans le local storage en les convertissants en string car dans le local storage, les données st tjrs en string
      navigate(redirect || '/');
    } catch (err) {
      //alert('Invalid email or password'); //Mess d'erreur normal
      //toast.error('Invalid email or password'); //Affiche un toast avec ce message-ci
      //toast.error(getError(err)); //Affiche un toast mais avec le mess d'erreur venant du backend(notre api)
      setError(err?.response?.data); //Afiiche l'erreur de la console
    }
  };

  //Grace à ce code, il sera tjrs redirigé vers la page d'accueil si le client est deja connecté
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container className="">
      <Helmet>
        <title> Connectez-Vous</title>
      </Helmet>
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="mt-5">
          {err && <p>{err}</p>}
          <h1 className="my-3">Connectez-Vous</h1>

          <Form className="">
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone </Form.Label>
              <Form.Control
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
                type={visible ? 'text' : 'password'}
                name="password"
                autocomplete="off"
                onChange={handleChange}
              />
              <button onClick={toggleVisibility}>
                {/* {visible ? 'Hide' : 'Show'} Password */}
                {visible ? <EyeSlash /> : <Eye />}
              </button>
            </Form.Group>

            <div className="mb-3">
              <Button variant="primary" onClick={handleSubmit}>
                Login
              </Button>
            </div>
            <h4 className="mb-3">
              New Custommer?{' '}
              <Link to={`/register_first_step?redirect=${redirect}`}>
                Create your account
              </Link>
              {/* L'utilisateur est dirigé vers singnup(page d'inscription) */}
            </h4>

            <h4 className="mb-3">
              <Link to={`/forgotPassword?redirect=${redirect}`}>
                Forgot your password ?
              </Link>
              {/* L'utilisateur est dirigé vers singnup(page d'inscription) */}
            </h4>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}
