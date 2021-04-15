import { connect } from "react-redux";

//import { saveToken } from "../actions/authActions";
import { logIn } from "../redux/actions/user";
import SignIn from "../screens/SignIn";

export default connect(
    (state) => ({
      //token: state.auth.token,
      token: state.userState.token,
      userID: state.userState.userID,
      status: state.userState.status,
    }),
    (dispatch) => ({
      saveToken: (token, userID) => dispatch(saveToken(token, userID)),
      logIn: (login) => dispatch(logIn(login)),
    })
  )(SignIn);
