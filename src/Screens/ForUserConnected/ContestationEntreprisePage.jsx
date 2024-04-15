import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PersonCircle } from 'react-bootstrap-icons';

export const ContestationEntreprisePage = () => {
  const navigate = useNavigate();
  //Variable pour recupérer le message d'erreur qui s'affiche dans la console
  //disant que l'utilisateur existe déjà:"User already exists"
  const [err, setError] = useState(null);
  //Après avoir créer notre variable, on peut mainteneant l'utiliser

  const [raison_sociale, setRaisonSociale] = useState('');
  const [registre_commerce, setRegistreCommerce] = useState('');
  const [date_creation, setDateCreation] = useState('');
  const [nom_gerant, setNomGerant] = useState('');
  const [prenom_gerant, setPrenomGerant] = useState('');
  const [phone_gerant, setPhoneGerant] = useState('');
  const [objet, setObjet] = useState('');

  //Création de la fonction handleClick
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:2024/api/contestationEntreprises/create/`,
        {
          raison_sociale,
          registre_commerce,
          date_creation,
          nom_gerant,
          prenom_gerant,
          phone_gerant,
          objet,
        }
      );
      navigate('/'); //Si l'article est crée sans problème, on sera dirigé vers la page d'accueil
    } catch (err) {
      console.log(err);
      setError(err?.response.data.message); //Afiiche l'erreur de la console
    }
  };
  return (
    <div className=" mt-5">
      <h1 className="mb-3 text-center">Créer une Categorie</h1>
      <Helmet>
        <title> Créer une Categorie</title>
      </Helmet>

      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6} className=" ">
            {err && (
              <Button variant="danger" className="my-3">
                {err}
              </Button>
            )}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {' '}
                <PersonCircle color="#000" size={30} className="me-3" />
              </InputGroup.Text>

              <Form.Control
                className="border-5"
                type="text"
                value={raison_sociale}
                placeholder="Raison Sociale"
                onChange={(e) => setRaisonSociale(e.target.value)}
              ></Form.Control>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {' '}
                <PersonCircle color="#000" size={30} className="me-3" />
              </InputGroup.Text>

              <Form.Control
                className="border-5"
                type="text"
                value={registre_commerce}
                placeholder="Registre de Commerce"
                onChange={(e) => setRegistreCommerce(e.target.value)}
              ></Form.Control>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {' '}
                <PersonCircle color="#000" size={30} className="me-3" />
              </InputGroup.Text>

              <Form.Control
                className="border-5"
                type="date"
                value={date_creation}
                placeholder="Date de creation"
                onChange={(e) => setDateCreation(e.target.value)}
              ></Form.Control>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {' '}
                <PersonCircle color="#000" size={30} className="me-3" />
              </InputGroup.Text>

              <Form.Control
                className="border-5"
                type="text"
                value={nom_gerant}
                placeholder="Nom du Gérant"
                onChange={(e) => setNomGerant(e.target.value)}
              ></Form.Control>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {' '}
                <PersonCircle color="#000" size={30} className="me-3" />
              </InputGroup.Text>

              <Form.Control
                className="border-5"
                type="text"
                value={prenom_gerant}
                placeholder="Prenom du Gérant"
                onChange={(e) => setPrenomGerant(e.target.value)}
              ></Form.Control>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {' '}
                <PersonCircle color="#000" size={30} className="me-3" />
              </InputGroup.Text>

              <Form.Control
                className="border-5"
                type="text"
                value={phone_gerant}
                placeholder="Phone du Gérant"
                onChange={(e) => setPhoneGerant(e.target.value)}
              ></Form.Control>
            </InputGroup>

            <label>Choisir un Objet:</label>
            <select
              value={objet}
              placeholder="Objet"
              onChange={(e) => setObjet(e.target.value)}
              required
            >
              <option value="">Choisir</option>
              <option value="Existence du nom de son entreprise">
                Existence du nom de son entreprise
              </option>
              <option value="Autres">Autres</option>
            </select>

            <Button variant="success" className="ms-2" onClick={handleClick}>
              Créer
            </Button>
          </Col>
          <Col md={3}> </Col>
        </Row>
      </Container>
    </div>
  );
};
