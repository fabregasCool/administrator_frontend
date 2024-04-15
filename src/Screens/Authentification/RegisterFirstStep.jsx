import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import axios from 'axios';
import '../../Style/Authentification.css';

import { API_URL } from '../../Utils/api_url.js';
import { getError } from '../../Utils/getError.js';

const RegisterFirstStep = () => {
  //Configuration de YUP
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Adresse e-mail invalide')
      .required('Champ requis'),
  });

  //Fin Configuration de YUP

  //Utilisation de useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const endpoint = `${API_URL}/auth/register_first_step`;
      const data = values;
      //console.log(values);

      const response = await axios.post(endpoint, data);

      if (response.status === 200) {
        navigate('/register_second_step');
      }

      toast.success('Première Etape Réussie'); //Affiche Ce message
    } catch (err) {
      //alert('Invalid email or password');
      //  toast.error('Invalid email or password');
      toast.error(getError(err)); //Recupère le mess d'erreur veant du backend
    }

    // Ceci est une boite de dialogue qui affiche les informations de l'utilisateur
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);
  };

  return (
    <Container>
      <Helmet>
        <title> Première Etape Inscription</title>
      </Helmet>
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="mt-5">
          <h1 className="my-3">Première Etape Inscription</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Adresse e-mail
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    autocomplete="off"
                  />
                  <ErrorMessage name="email" component="div" />
                </div>

                <button
                  type="submit"
                  className="submit-buttonRegister"
                  disabled={isSubmitting}
                >
                  Envoyer
                </button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterFirstStep;
