import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

import { API_URL } from '../../Utils/api_url.js';
import { getError } from '../../Utils/getError.js';
import { Store } from '../../Store.jsx';

//reducer pour ProfilePage
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
}
export default function ProfilePage() {
  //Afin d'avoir accès aux infos stockés dans le local storage
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  //Declaration des variables du formulaire
  const [nom, setNom] = useState(userInfo.nom);
  const [prenom, setPrenom] = useState(userInfo.prenom);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [presentation, setPresentation] = useState(userInfo.presentation);
  const [profile, setProfile] = useState(userInfo.profile);
  const [naissance, setNaissance] = useState(userInfo.naissance);

  const [file, setFile] = useState(userInfo.photo); //l'image

  //Fonction upload image
  const upload = async () => {
    try {
      //Pour télécharger n'importe quel fichier, nous devrions d'abord créerdes données

      const formData = new FormData(); //Ainsi on crée "formData" et c'est à l'intérieur de "formData" que ns allons passer notre fichier 'file'

      //Pour ajouter(passer) notre fichier 'file'à "formData" nous utiliseront la méthode "append"
      formData.append('file', file);
      // "file": c'est notre fichier crée dans index(backend), il reçoit nos images
      //file: designe la varibale de nos images

      const res = await axios.post(`${API_URL}/upload/`, formData, {
        withCredentials: true,
      });
      return res.data; //On recupère l'image téléchargée
      //console.log(res.data);
    } catch (err) {
      //console.log(err);
    }
  };

  //   Definissons un useReducer
  const [, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(); //Ntre fonction "upload" est stockée dans la variable "imgUrl" ainis on peut l'utiliser dans le reste de la fonction

    try {
      const { data } = await axios.put(
        `${API_URL}/naiities/updateProfile/`,
        {
          prenom,
          nom,
          email,
          phone,
          presentation,
          profile,
          naissance,
          photo: file ? imgUrl : '',
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });

      ctxDispatch({
        type: 'USER_SIGNIN',
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated Successfully');
    } catch (err) {
      dispatch({
        type: 'UPDATE_FAIL',
      });
      toast.error(getError(err));
    }
  };
  return (
    <div className="container ">
      {' '}
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3"> User Profile</h1>
      <Form onSubmit={submitHandler}>
        {/* User Name */}
        <Form.Group className="mb-3" controlId="prenom">
          <Form.Label>Name </Form.Label>
          <Form.Control
            value={prenom}
            required
            onChange={(e) => setPrenom(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* User Username */}
        <Form.Group className="mb-3" controlId="nom">
          <Form.Label>Username </Form.Label>
          <Form.Control
            value={nom}
            required
            onChange={(e) => setNom(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* User Email */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* User Phone */}
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone </Form.Label>
          <Form.Control
            type="phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* User Presentation */}
        <Form.Group className="mb-3" controlId="presentation">
          <Form.Label>Presentation </Form.Label>
          <Form.Control
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* User Profile */}
        <Form.Group className="mb-3" controlId="profile">
          <Form.Label>Profile </Form.Label>
          <Form.Control
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* User Genre */}
        <Form.Group className="mb-3" controlId="profile">
          <Form.Label>Date de Naissance </Form.Label>
          <Form.Control
            type="date"
            value={naissance}
            onChange={(e) => setNaissance(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* Image */}
        <div className="item">
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            prenom=""
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button variant="danger">
            <label className="file" htmlFor="file">
              Choisir une image
            </label>
          </Button>
          {/*  */}

          {/*  */}
        </div>{' '}
        {/* Bouton d'envoi */}
        <div className="mb-3 mt-4">
          <Button type="submit">Update</Button>
        </div>
      </Form>
    </div>
  );
}
