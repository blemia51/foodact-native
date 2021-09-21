import { connect } from "react-redux";

import { postUserProfile } from "../redux/actions/user";
import SignUp from "../screens/SignUp";

export default connect(
    (state) => ({
      userProfile: state.userState.userProfile,
      postSuccess: state.userState.postSuccess
    }),
    (dispatch) => ({
      postUserProfile: (userPofile) => dispatch(postUserProfile(userPofile)),
    })
  )(SignUp);
