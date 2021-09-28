import { connect } from "react-redux";
import { fetchClientOrders } from "../redux/actions/user"
import UserOrders from "../screens/UserOrders";

export default connect(
    (state) => ({
      userProfile: state.userState.userProfile,
      clientOrders: state.userState.clientOrders,
      paniersName: state.paniersState.paniersName,
      paniers: state.paniersState.paniers,
      //token: state.userState.token,
      //userID: state.userState.userID,
      orderStatus: state.userState.orderStatus,
    }),
    (dispatch) => ({
      fetchClientOrders: (email) => dispatch(fetchClientOrders(email))
      //logOut: () => dispatch(logOut()),
      //saveToken: (token, userID) => dispatch(saveToken(token, userID)),
    })
  )(UserOrders);
