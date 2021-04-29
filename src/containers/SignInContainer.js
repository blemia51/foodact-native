import { connect } from "react-redux";

//import { saveToken } from "../actions/authActions";
import { logIn } from "../redux/actions/user";
import SignIn from "../screens/SignIn";

export default connect(
    (state) => ({
      //token: state.auth.token,
      token: state.userState.token,
      status: state.userState.status,
      profilStatus: state.userState.profilState
    }),
    (dispatch) => ({
      saveToken: (token) => dispatch(saveToken(token)),
      logIn: (login) => dispatch(logIn(login)),
    })
  )(SignIn);
