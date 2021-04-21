import { connect } from "react-redux";

//import { saveToken } from "../actions/authActions";
import { logOut } from "../redux/actions/user";
import Menu from "../screens/Menu";

export default connect(
    (state) => ({
      //token: state.auth.token,
      token: state.userState.token,
      userID: state.userState.userID,
      status: state.userState.status,
    }),
    (dispatch) => ({
      logOut: () => dispatch(logOut()),
      //saveToken: (token, userID) => dispatch(saveToken(token, userID)),
    })
  )(Menu);
