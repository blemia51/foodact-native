import { connect } from "react-redux";

import { fetchUserProfile } from "../redux/actions/user";
import UserProfile from "../screens/UserProfile";

export default connect(
    (state) => ({
      userProfile: state.userState.userProfile,
      token: state.userState.token,
      userID: state.userState.userID,
      status: state.userState.status,
    }),
    (dispatch) => ({
      fetchUserProfile: (token, userID) => dispatch(fetchUserProfile(token, userID)),
    })
  )(UserProfile);
