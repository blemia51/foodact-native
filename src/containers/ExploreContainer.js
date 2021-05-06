import { connect } from "react-redux";
import Explore from "../screens/Explore";

export default connect(
    (state) => ({
      location: state.locationState.location,
      fournisseurs: state.fournisseursState.fournisseurs,
    }),
  )(Explore);