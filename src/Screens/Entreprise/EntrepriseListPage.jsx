import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';

import { PersonCircle } from 'react-bootstrap-icons';

import { API_URL } from '../../Utils/api_url.js';

const EntrepriseListPage = () => {
  // Variable pour la recherche
  const [query, setQuery] = useState('');
  const keys = [
    'raison_sociale',
    'rcn',
    'slogan',
    'taille',
    'description',
    'logo_url',
    'couverture_url',
    'localisation',
  ]; //Tableau contenant les propriétés de la collection users
  //console.log(categorys[0]['name']);
  //Déclaration de la variable qui va recevoir tous les utilisateurs
  const [entreprises, setEntreprises] = useState([]);

  // Recuperer toutes les users
  useEffect(() => {
    const fetcchAllUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/entreprises/list`); //Recupère tous les marques(brand)
        console.log(res);
        setEntreprises(res.data); //Mettre à jour les marques(brand)
      } catch (err) {
        console.log(err);
      }
    };

    fetcchAllUsers();
  }, []);

  //Créer la fonction pour supprimer un livre
  const handleDelete = async (entreprise_id) => {
    if (window.confirm('Etes vous sûr(e) de vouloir supprimer ?')) {
      try {
        await axios.delete(`${API_URL}/entreprises/delete/${entreprise_id}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title> Liste des Entreprises</title>
      </Helmet>
      <h1 className="admin_title">Liste des Entreprises</h1>
      <p>
        {' '}
        <Link className="link" to="/addEntreprise">
          <Button className="" variant="outline-primary">
            {/* <Link className="link" to="/admin/addUser"> */}
            Add new Entreprise
          </Button>
        </Link>
      </p>
      {/* Zone de Recherche */}
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          className="fs-3 border-3 fw-bolder "
          placeholder="Rechercher..."
          onChange={(e) => setQuery(e.target.value)}
        ></Form.Control>
        <InputGroup.Text id="basic-addon1">
          {' '}
          <PersonCircle color="#00FF11" size={40} className="me-3" />
        </InputGroup.Text>
      </InputGroup>
      <span className="fs-2 fw-bold">Nombre D'entreprises : </span>
      <span className="fs-2">
        <Badge bg="success">{entreprises.length} </Badge>
      </span>
      <table className="table mt-4">
        {/* Entête */}
        <thead>
          <tr>
            <th>Update</th>
            <th>Delete</th>
            <th>Name</th>
            <th>Raison Sociale</th>
            <th>Slogan</th>
          </tr>
        </thead>

        {/* Corps */}
        <tbody>
          {entreprises
            .filter((user) =>
              keys.some((key) => user[key].toLowerCase().includes(query))
            )
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <Link
                    className="link"
                    to={`/updateEntreprise/${user?.entreprise_id}`}
                  >
                    <Button className="me-2" variant="outline-dark">
                      Update
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => handleDelete(user.entreprise_id)}
                  >
                    Delete
                  </Button>
                </td>

                <td>{user?.raison_sociale}</td>
                <td>{user?.rcn}</td>
                <td>{user?.slogan}</td>

                {/* <td>{String(user.isAdmin)}</td> */}
                {/* <td>{user?.createdAt.substring(0, 16).split('T') + ' '}</td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntrepriseListPage;
