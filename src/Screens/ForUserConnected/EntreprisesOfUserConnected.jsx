import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';

import { PersonCircle } from 'react-bootstrap-icons';

import { getError } from '../../Utils/getError.js';
import { toast } from 'react-toastify';
import { API_URL } from '../../Utils/api_url.js';

export const EntreprisesOfUserConnected = () => {
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

  const [entreprises, setEnterprises] = useState([]);
  //const userId = localStorage.getItem('userId');

  //Afin d'avoir accès aux infos stockés dans le local storage
  const { state } = useContext(Store);
  const { userInfo } = state;
  const userId = userInfo.naiitie_id;
  //alert("Identifiant de l'utilisateur connecté: " + userId);

  //Récupère toutes les entreprises de l'utilisateur connecté
  useEffect(() => {
    const fetchEnterprises = async () => {
      try {
        const response = await axios.get(`${API_URL}/entreprises/list`);
        // Après avoir recupérer toutes les entreprises , on les filtre en fonction de l'id de l'utilisateur connecté
        const userEnterprises = response.data.filter(
          (enterprise) => enterprise.naiitie_id === userId
        );
        setEnterprises(userEnterprises);
      } catch (err) {
        toast.error(getError(err)); //Recupère le mess d'erreur veant du backend
      }
    };

    fetchEnterprises();
  }, [userId]);

  //Créer la fonction pour supprimer un livre
  const handleDelete = async (entreprise_id) => {
    if (window.confirm('Etes vous sûr(e) de vouloir supprimer ?')) {
      try {
        await axios.delete(
          'http://localhost:2024/api/entreprises/delete/' + entreprise_id
        );
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    // <div>
    //   <h1>Entreprises de l'utilisateur connecté</h1>
    //   <ul>
    //     {entreprises.map((enterprise) => (
    //       <li key={enterprise.entreprise_id}>{enterprise.name}</li>
    //     ))}
    //   </ul>
    // </div>
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
            Add new User
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
            <th>Raison Sociale</th>
            <th>RCN</th>
            <th>Slogan</th>
            <th>Création</th>
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
                {/* <td>
                  <img
                    className="img_User"
                    src={`../uploads/${user?.img}`}
                    alt=""
                  />
                </td> */}
                <td>{user.raison_sociale}</td>
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
