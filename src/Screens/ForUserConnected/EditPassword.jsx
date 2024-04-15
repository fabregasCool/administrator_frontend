import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

import { API_URL } from '../../Utils/api_url.js';
import { getError } from '../../Utils/getError.js';
import { Store } from '../../Store.jsx';

import { Eye, EyeSlash } from 'react-bootstrap-icons';

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
export default function EditPassword() {
  // Partie qui permet d'afficher ou masquer mot de passe
  const [visible, setVisible] = useState(false);

  const toggleVisibility = (e) => {
    e.preventDefault(); // Empêche la propagation de l'événement (il empêche que les valeurs aillent dans l'url)
    setVisible(!visible);
  };

  //Afin d'avoir accès aux infos stockés dans le local storage
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  //Declaration des variables du formulaire
  const [password, setPassword] = useState('');
  const [new_password, setNew_Password] = useState('');

  //   Definissons un useReducer
  const [, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${API_URL}/naiities/updateAncienPassword/`,
        {
          password,
          new_password,
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
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Ancien Mot de Passe </Form.Label>
          <Form.Control
            type={visible ? 'text' : 'password'}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* User Userpassword */}
        <Form.Group className="mb-3" controlId="new_password">
          <Form.Label>Nouveau Mot de passe </Form.Label>
          <Form.Control
            type={visible ? 'text' : 'password'}
            value={new_password}
            required
            onChange={(e) => setNew_Password(e.target.value)}
          ></Form.Control>
          <button onClick={toggleVisibility}>
            {/* {visible ? 'Hide' : 'Show'} Password */}
            {visible ? <EyeSlash /> : <Eye />} Password
          </button>
        </Form.Group>

        {/* Bouton d'envoi */}
        <div className="mb-3 mt-4">
          <Button type="submit">Update</Button>
        </div>
      </Form>
    </div>
  );
}
