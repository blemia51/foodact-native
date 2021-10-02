import { connect } from "react-redux";

import { uploadFavorite, deleteFavorite } from "../redux/actions/favorites";
import { uploadFavoriteData,deleteFavoriteData } from '../redux/actions/favoritesDatas'
import { uploadLocation, deleteLocation } from '../redux/actions/location'
import { fetchPaniers, fetchPaniersName, fetchPaniersPrice } from '../redux/actions/paniers'
import { fetchCategories } from '../redux/actions/categories'
import { fetchFournisseurs, fetchCreneauxFournisseurs } from '../redux/actions/fournisseurs'
import { fetchUserProfile, fetchClientOrders, putUserPushToken } from '../redux/actions/user'
import Home from "../screens/Home";

export default connect(
    (state) => ({
      token: state.userState.token,
      favorites: state.favoritesState.favorites,
      favoritesDatas: state.favoritesDatasState.favoritesDatas,
      paniers: state.paniersState.paniers,
      paniersName: state.paniersState.paniersName,
      paniersPrice: state.paniersState.paniersPrice,
      categories: state.categoriesState.categories,
      fournisseurs: state.fournisseursState.fournisseurs,
      creneauxFournisseurs: state.fournisseursState.creneauxFournisseurs,
      orderStatus: state.userState.orderStatus,
      userProfile: state.userState.userProfile,
    }),
    (dispatch) => ({
      fetchClientOrders: () => dispatch(fetchClientOrders()),
      fetchUserProfile: (token, userID) => dispatch(fetchUserProfile(token, userID)),
      uploadFavorite: (data) => dispatch(uploadFavorite(data)),
      deleteFavorite: () => dispatch(deleteFavorite()),
      uploadFavoriteData: (data) => dispatch(uploadFavoriteData(data)),
      deleteFavoriteData: () => dispatch(deleteFavoriteData()),
      uploadLocation: (location) => dispatch(uploadLocation(location)),
      fetchPaniers: () => dispatch(fetchPaniers()),
      fetchPaniersName: () => dispatch(fetchPaniersName()),
      fetchPaniersPrice: () => dispatch(fetchPaniersPrice()),
      fetchCategories: () => dispatch(fetchCategories()),
      fetchFournisseurs: () => dispatch(fetchFournisseurs()),
      fetchCreneauxFournisseurs: () => dispatch(fetchCreneauxFournisseurs()),
      putUserPushToken: (userId, pushToken, token) => dispatch(putUserPushToken(userId, pushToken, token))
    })
  )(Home);