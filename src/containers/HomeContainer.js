import { connect } from "react-redux";

import { uploadFavorite, deleteFavorite } from "../redux/actions/favorites";
import { fetchPaniers, fetchPaniersName, fetchPaniersPrice } from '../redux/actions/paniers'
import { fetchCategories } from '../redux/actions/categories'
import { fetchFournisseurs, fetchCreneauxFournisseurs } from '../redux/actions/fournisseurs'
import { fetchUserProfile, fetchClientOrders } from '../redux/actions/user'
import Home from "../screens/Home";

export default connect(
    (state) => ({
      token: state.userState.token,
      favorites: state.favoritesState.favorites,
      paniers: state.paniersState.paniers,
      paniersName: state.paniersState.paniersName,
      paniersPrice: state.paniersState.paniersPrice,
      categories: state.categoriesState.categories,
      fournisseurs: state.fournisseursState.fournisseurs,
      creneauxFournisseurs: state.fournisseursState.creneauxFournisseurs,
      orderStatus: state.userState.orderStatus,
    
    }),
    (dispatch) => ({
      fetchClientOrders: () => dispatch(fetchClientOrders()),
      fetchUserProfile: (token, userID) => dispatch(fetchUserProfile(token, userID)),
      uploadFavorite: (data) => dispatch(uploadFavorite(data)),
      deleteFavorite: () => dispatch(deleteFavorite()),
      fetchPaniers: () => dispatch(fetchPaniers()),
      fetchPaniersName: () => dispatch(fetchPaniersName()),
      fetchPaniersPrice: () => dispatch(fetchPaniersPrice()),
      fetchCategories: () => dispatch(fetchCategories()),
      fetchFournisseurs: () => dispatch(fetchFournisseurs()),
      fetchCreneauxFournisseurs: () => dispatch(fetchCreneauxFournisseurs()),
    })
  )(Home);