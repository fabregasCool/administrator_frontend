import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { toast } from 'react-toastify';

// import Logo from '../Images/LOGOARETA.jpg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';

import '../Style/Menu.css';

export const Menu = () => {
  //UseContext afin d'avoir d'avoir accèès aux inforamtions stockés dans le Store (api context) ainsi afficher les articles dans le cart(panier)
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state; //cart et userInfo sont les infos qu'on recupère du local storage; Grace à "userInfo" on peut afficher les infos de l'user comme son nom

  //Deconnexion
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' }); //Appel de l'action de "Déconnexion"

    if (window.confirm('Voulez vous vraiment vous deconnecter ?')) {
      localStorage.removeItem('userInfo'); //Effacer les infos de l'utilisateur dans le local storage
    }
    window.location.href = '/login'; //Evite erreur lorsqu'on se déconnecte
  };

  return (
    <>
      {/* Navbar ou le menu */}

      <Navbar bg="white" expand="lg" className="mt-1" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">
            {/* <div class="div_logo">
              <div class="img_logo">
              </div>
            </div> */}
          </Navbar.Brand>
          <Navbar.Toggle variant="success" aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto  my-2 my-lg-0 text-black"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* Affiche l'image de l'utilisateur connecté */}
              {userInfo && (
                <span>
                  {' '}
                  {/* Affiche le l'image de l'utilisateur actuel */}
                  <Link className="dropdown-item fs-4" to="/addEntreprise">
                    Créer une entreprise
                  </Link>
                </span>
              )}

              {/* Toutes les entreprises */}
              {/* {userInfo && (
                <span>
                  <Link className="dropdown-item fs-4" to="/entrepriseList">
                    Toutes les entreprises
                  </Link>
                </span>
              )} */}
              {''}
              {userInfo && (
                <span>
                  {' '}
                  {/* Affiche le l'image de l'utilisateur actuel */}
                  <Link
                    className="dropdown-item fs-4"
                    to="/entreprisesOfUserConnected"
                  >
                    Vos entreprises
                  </Link>
                </span>
              )}

              {userInfo && (
                <span>
                  {' '}
                  {/* Affiche le l'image de l'utilisateur actuel */}
                  <img
                    className="img_currentUser"
                    src={`../uploads/${userInfo?.photo}`}
                    alt=""
                  />
                </span>
              )}

              {/* Affiche le nom de l'utilisateur connecté */}
              {userInfo ? (
                <NavDropdown
                  title={`Bienvenu(e)  ${userInfo?.prenom}`}
                  id="basic-nav-dropdown"
                  className="fs-3 username_style "
                >
                  <Link className="dropdown-item fs-4" to="/profile">
                    User Profile
                  </Link>
                  <NavDropdown.Divider />

                  {/* Deconnexion */}

                  <Link
                    className="dropdown-item fs-4"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Deconnexion
                  </Link>
                  <Link className="dropdown-item fs-4" to="/editPassword">
                    editPassword
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link fs-3 mt-1 fw-bold" to="/login">
                  Connexion
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
