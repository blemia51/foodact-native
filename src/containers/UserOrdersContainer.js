import { connect } from "react-redux";
import { fetchClientOrders } from "../redux/actions/user"
import UserOrders from "../screens/UserOrders";

export default connect(
    (state) => ({
      userProfile: state.userState.userProfile,
      clientOrders: state.userState.clientOrders,
      token: state.userState.token,
      orderStatus: state.userState.orderStatus,
      clientOrders: state.userState.clientOrders
    }),
    (dispatch) => ({
      fetchClientOrders: (email) => dispatch(fetchClientOrders(email))
      //logOut: () => dispatch(logOut()),
      //saveToken: (token, userID) => dispatch(saveToken(token, userID)),
    })
  )(UserOrders);
