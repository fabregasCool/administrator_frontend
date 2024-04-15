//Cette page Enregistre notre valeur afin qu'on puisse les réutiliser partout dans nos composants

import { createContext, useReducer } from 'react';

export const Store = createContext();

//InitialState :Ce sont les valeurs par defaut qu'ont les variables
// cart :(panier ici) a pour 1ere propriétes cartItems qui représente les produits ou articles

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null, //On recupère les infos actuel de l'utilisateur grace à cet initialisation de "userInfo"
};

//Fonction reducer (Préférer à useState pour déclarer les variables, vu que cette partie est complexe)
function reducer(state, action) {
  switch (action.type) {
    // Se connecter
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    // Qd l'user se connecte,on garde l'état actuel(...state) puis on met à jour les infos de l'utilisateur en fonction des données qui viennent du backend

    // Deconnexion
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null, //Qd on se deconnecte les infos de l'user sont effacés
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
