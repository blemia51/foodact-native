import { connect } from "react-redux";

import UserOrders from "../screens/UserOrders";

export default connect(
    (state) => ({
      userProfile: state.userState.userProfile,
      //token: state.userState.token,
      //userID: state.userState.userID,
      //status: state.userState.status,
    }),
    (dispatch) => ({
      //logOut: () => dispatch(logOut()),
      //saveToken: (token, userID) => dispatch(saveToken(token, userID)),
    })
  )(UserOrders);
