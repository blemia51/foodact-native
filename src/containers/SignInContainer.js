import { connect } from "react-redux";

import { logIn } from "../redux/actions/user";
import SignIn from "../screens/SignIn";

export default connect(
    (state) => ({
      userProfile: state.userState.userProfile,
      tokenDecoded: state.userState.tokenDecoded,
      token: state.userState.token,
      status: state.userState.status,
      profilStatus: state.userState.profilStatus,
    }),
    (dispatch) => ({
      logIn: (login) => dispatch(logIn(login)),
      postPasswordForgotten: (email, token) => dispatch(postPasswordForgotten(email, token))
    })
  )(SignIn);
