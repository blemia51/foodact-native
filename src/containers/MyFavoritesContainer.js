import { connect } from "react-redux";
import MyFavorites from "../screens/MyFavorites";


export default connect(
    (state) => ({
      favorites: state.favoritesState.favorites,
    }),
    
  )(MyFavorites);