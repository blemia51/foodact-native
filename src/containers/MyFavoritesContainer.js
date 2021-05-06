import { connect } from "react-redux";
import MyFavorites from "../screens/MyFavorites";


export default connect(
    (state) => ({
      favorites: state.favoritesState.favorites,
      favoritesDatas: state.favoritesDatasState.favoritesDatas,
      categories: state.categoriesState.categories,
      paniers: state.paniersState.paniers,
      fournisseurs: state.fournisseursState.fournisseurs,
      creneauxFournisseurs: state.fournisseursState.creneauxFournisseurs,
      paniersName: state.paniersState.paniersName,
      paniersPrice: state.paniersState.paniersPrice,
      location: state.locationState.location,

    }),
    
  )(MyFavorites);