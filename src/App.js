import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import {
  Home,
  RegisterFirstStep,
  RegisterSecondStep,
  Login,
  ProfilePage,
  ForgotPasswordPage,
  EntrepriseListPage,
  EntrepriseCreatePage,
  EntrepriseUpdatePage,
  EntreprisesOfUserConnected,
  EditPassword,
  ContestationEntreprisePage,
} from '../src/Screens/index';
import { Menu, Footer } from '../src/Composants/index';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './Screens/ForUserConnected/ProtectedRoutes';

// import './App.css';

//Fonction Layout
const Layout = () => {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },

      // Debut Entreprise
      {
        path: '/entrepriseList',
        element: <EntrepriseListPage />,
      },
      {
        path: '/addEntreprise',
        element: <EntrepriseCreatePage />,
      },
      {
        path: '/updateEntreprise/:id',
        element: <EntrepriseUpdatePage />,
      },

      // Debut Entreprise For User Connected
      {
        path: '/entreprisesOfUserConnected',
        element: <EntreprisesOfUserConnected />,
      },

      {
        //Modifier les infos de l'utilisateur connecté
        path: '/profile',
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
      {
        //Modifier les infos de l'utilisateur connecté
        path: '/editPassword',
        element: (
          <ProtectedRoutes>
            <EditPassword />
          </ProtectedRoutes>
        ),
      },
      {
        //Modifier les infos de l'utilisateur connecté
        path: '/contestationEntreprise',
        element: (
          <ProtectedRoutes>
            <ContestationEntreprisePage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  // Les pages autjentification n'auront pas footer et menu
  // Debut Authentification
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register_first_step',
    element: <RegisterFirstStep />,
  },
  {
    path: '/register_second_step',
    element: <RegisterSecondStep />,
  },
  {
    path: '/forgotPassword',
    element: <ForgotPasswordPage />,
  },
  //Fin Autentification
]);
function App() {
  return (
    <div className="app">
      {/* Le toast sera en bas et centré; puis nous montrerons qu'un seul toast à la fois "limit={1}" */}
      <ToastContainer position="bottom-center" limit={1} />

      <div className="">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
