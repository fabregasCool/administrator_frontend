import React, { useContext, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import { API_URL } from '../../Utils/api_url.js';

import { getError } from '../../Utils/getError.js';
import { toast } from 'react-toastify';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import { Helmet } from 'react-helmet-async';

function EntrepriseCreatePage() {
  //
  const [error, setError] = useState('');
  const [link, setLink] = useState('');
  //
  const navigate = useNavigate();

  //Recupération des données de l'utilisateur qui son stockés dans le local storage
  const { state } = useContext(Store);
  const { userInfo } = state;
  const userId = userInfo.naiitie_id;
  //console.log("Identifiant de l'utilisateur connecté: " + userId);

  //Déclaration des variables
  const [raison_sociale, setRaisonSociale] = useState('');
  const [rcn, setRcn] = useState('');
  const [slogan, setSlogan] = useState('');
  const [taille, setTaille] = useState('');
  const [description, setDescription] = useState('');
  const [logo_url, setLogo_url] = useState('');
  const [couverture_url, setCouverture_url] = useState('');
  const [localisation, setLocalisation] = useState('');

  //

  //Fonction de création de l'entreprise
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/entreprises/create`, {
        raison_sociale,
        naiitie_id: userId,
        rcn,
        slogan,
        taille,
        description,
        logo_url,
        couverture_url,
        localisation,
      });
      if (response.status === 200) {
        toast.success('Entreprise crée avec succès ');
        navigate('/entrepriseList');
      }
    } catch (err) {
      //setError(err?.response?.data?.message); //Afiiche l'erreur de la console
      toast.error(getError(err)); //Recupère le mess d'erreur veant du backend
      setError(err.response.data.error);
      setLink(err.response.data.link);
    }
  };

  return (
    <div>
      <Helmet>
        <title> Créer une Entreprise</title>
      </Helmet>
      {/* Affiche l'erreur venant du backend */}
      {error && (
        <p style={{ color: 'red' }}>
          {error}.{' '}
          <a href={link}>
            Prouvez nous que vous avez déclarez votre entreprise et nous
            demanderons à l'autre de modifier son nom sur notre plateforme.
          </a>
        </p>
      )}
      <h1>Créer une entreprise</h1>
      <form onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6} className=" ">
              {/* Raison Sociale */}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  raison_sociale
                </InputGroup.Text>

                <Form.Control
                  className="border-5"
                  type="text"
                  value={raison_sociale}
                  placeholder="Raison Sociale"
                  onChange={(e) => setRaisonSociale(e.target.value)}
                ></Form.Control>
              </InputGroup>

              {/* Rcn */}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">rcn</InputGroup.Text>

                <Form.Control
                  className="border-5"
                  type="text"
                  value={rcn}
                  placeholder="rcn"
                  onChange={(e) => setRcn(e.target.value)}
                ></Form.Control>
              </InputGroup>

              {/* slogan */}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">slogan</InputGroup.Text>

                <Form.Control
                  className="border-5"
                  type="text"
                  value={slogan}
                  placeholder="slogan"
                  onChange={(e) => setSlogan(e.target.value)}
                ></Form.Control>
              </InputGroup>

              {/* taille */}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Taille</InputGroup.Text>

                <Form.Control
                  className="border-5"
                  type="text"
                  value={taille}
                  placeholder="taille"
                  onChange={(e) => setTaille(e.target.value)}
                ></Form.Control>
              </InputGroup>

              {/* description */}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>

                <Form.Control
                  className="border-5"
                  type="text"
                  value={description}
                  placeholder="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </InputGroup>

              {/* logo_url */}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Logo_url</InputGroup.Text>

                <Form.Control
                  className="border-5"
                  type="text"
                  value={logo_url}
                  placeholder="logo_url"
                  onChange={(e) => setLogo_url(e.target.value)}
                ></Form.Control>
              </InputGroup>

              {/* couverture_url */}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  Couverture_url
                </InputGroup.Text>

                <Form.Control
                  className="border-5"
                  type="text"
                  value={couverture_url}
                  placeholder="couverture_url"
                  onChange={(e) => setCouverture_url(e.target.value)}
                ></Form.Control>
              </InputGroup>

              {/* localisation */}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  Localisation
                </InputGroup.Text>

                <Form.Control
                  className="border-5"
                  type="text"
                  value={localisation}
                  placeholder="localisation"
                  onChange={(e) => setLocalisation(e.target.value)}
                ></Form.Control>
              </InputGroup>
              <Button type="submit" variant="success" className="ms-2">
                Créer
              </Button>
            </Col>
            <Col md={3}> </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
}

export default EntrepriseCreatePage;
