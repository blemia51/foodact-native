import { connect } from "react-redux";

import { fetchUserProfile, updateUserProfile, postPasswordForgotten } from "../redux/actions/user";
import ModalChangePassword from "../components/ModalChangePassword";

export default connect(
    (state) => ({
      userProfile: state.userState.userProfile,
      token: state.userState.token,
      userId: state.userState.userId,
      status: state.userState.status,
      profilStatus: state.userState.profilStatus,
      passwordForgotten: state.userState.passwordForgotten
    }),
    (dispatch) => ({
      fetchUserProfile: (token, userId) => dispatch(fetchUserProfile(token, userId)),
      updateUserProfile: (userProfile, token) => dispatch(updateUserProfile(userProfile, token)),
      postPasswordForgotten: (email) => dispatch(postPasswordForgotten(email))
    })
  )(ModalChangePassword);
