import { connect } from "react-redux";

import { fetchUserProfile, updateUserProfile } from "../redux/actions/user";
import UserProfile from "../screens/UserProfile";

export default connect(
    (state) => ({
      userProfile: state.userState.userProfile,
      token: state.userState.token,
      userId: state.userState.userId,
      status: state.userState.status,
    }),
    (dispatch) => ({
      fetchUserProfile: (token, userId) => dispatch(fetchUserProfile(token, userId)),
      updateUserProfile: (userProfile) => dispatch(updateUserProfile(userProfile))
    })
  )(UserProfile);
