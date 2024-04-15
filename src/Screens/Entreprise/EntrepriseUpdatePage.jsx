import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate, useLocation } from 'react-router-dom';

import { API_URL } from '../../Utils/api_url.js';

import { getError } from '../../Utils/getError.js';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

function EntrepriseUpdatePage() {
  const location = useLocation();
  //const entrepriseId = useParams().entreprise_id;
  const entrepriseId = location.pathname.split('/')[2];
  // console.log(entrepriseId);

  const navigate = useNavigate();

  //Si l'utilistateur existe déja, on recupère ses informations grace à la fonction (getUser)
  useEffect(() => {
    if (entrepriseId) {
      // recuperation d'un utilisateur
      getUser(entrepriseId);
    }
  }, [entrepriseId]);

  //Déclaration des variables
  const [raison_sociale, setRaisonSociale] = useState('');
  const [rcn, setRcn] = useState('');
  const [slogan, setSlogan] = useState('');
  const [taille, setTaille] = useState('');
  const [description, setDescription] = useState('');
  const [logo_url, setLogo_url] = useState('');
  const [couverture_url, setCouverture_url] = useState('');
  const [localisation, setLocalisation] = useState('');

  //c'est grace a ce code que le nom et le prenom s'affiche automatiquement quand on clique sur modifier
  const getUser = async (entrepriseId) => {
    const response = await axios.get(
      `${API_URL}/entreprises/read/${entrepriseId}`
    );
    setRaisonSociale(response.data[0].raison_sociale); //Affiche le nom utilisateur
    setRcn(response.data[0].rcn); //Affiche le nom utilisateur
    setSlogan(response.data[0].slogan); //Affiche le nom utilisateur
    setTaille(response.data[0].taille); //Affiche le nom utilisateur
    setDescription(response.data[0].description); //Affiche le nom utilisateur
    setLogo_url(response.data[0].logo_url); //Affiche le nom utilisateur
    setCouverture_url(response.data[0].couverture_url); //Affiche le nom utilisateur
    setLocalisation(response.data[0].localisation); //Affiche le nom utilisateur
  };

  //

  //Fonction de création de l'entreprise
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/entreprises/update/${entrepriseId}`,
        {
          raison_sociale,

          rcn,
          slogan,
          taille,
          description,
          logo_url,
          couverture_url,
          localisation,
        }
      );
      if (response.status === 200) {
        toast.success('Entreprise crée avec succès ');
        navigate('/entreprisesOfUserConnected');
      }
    } catch (err) {
      //setError(err?.response?.data?.message); //Afiiche l'erreur de la console
      toast.error(getError(err)); //Recupère le mess d'erreur veant du backend
    }
  };

  return (
    <div>
      {/* Affiche l'erreur venant du backend */}

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
                Modifier
              </Button>
            </Col>
            <Col md={3}> </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
}

export default EntrepriseUpdatePage;
