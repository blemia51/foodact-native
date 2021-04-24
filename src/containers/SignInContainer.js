import { connect } from "react-redux";

//import { saveToken } from "../actions/authActions";
import { logIn } from "../redux/actions/user";
import SignIn from "../screens/SignIn";

export default connect(
    (state) => ({
      //token: state.auth.token,
      token: state.userState.token,
      userId: state.userState.userId,
      status: state.userState.status,
      profilStatus: state.userState.profilState
    }),
    (dispatch) => ({
      saveToken: (token, userId) => dispatch(saveToken(token, userId)),
      logIn: (login) => dispatch(logIn(login)),
    })
  )(SignIn);
