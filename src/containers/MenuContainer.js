import { connect } from "react-redux";

//import { saveToken } from "../actions/authActions";
import { logOut } from "../redux/actions/user";
import Menu from "../screens/Menu";

export default connect(
    (state) => ({
      //token: state.auth.token,
      userProfile: state.userState.userProfile,
      token: state.userState.token,
      tokenDecoded: state.userState.tokenDecoded,
      status: state.userState.status,
      profilStatus: state.userState.profilStatus,
    }),
    (dispatch) => ({
      logOut: () => dispatch(logOut()),
      //saveToken: (token, userID) => dispatch(saveToken(token, userID)),
    })
  )(Menu);
