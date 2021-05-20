import { connect } from "react-redux";
import Explore from "../screens/Explore";

export default connect(
    (state) => ({
      location: state.locationState.location,
      fournisseurs: state.fournisseursState.fournisseurs,
      paniers: state.paniersState.paniers,
      creneauxFournisseurs: state.fournisseursState.creneauxFournisseurs,
      paniersName: state.paniersState.paniersName,
      paniersPrice: state.paniersState.paniersPrice,
    }),
  )(Explore);