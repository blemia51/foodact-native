import { connect } from "react-redux";

import { uploadFavorite, deleteFavorite } from "../redux/actions/favorites";
import Favorites from "../components/Favorites";


export default connect(
    (state) => ({
      favorites: state.favoritesState.favorites,
    }),
    (dispatch) => ({
      uploadFavorite: (data) => dispatch(uploadFavorite(data)),
      deleteFavorite: () => dispatch(deleteFavorite()),
    })
  )(Favorites);