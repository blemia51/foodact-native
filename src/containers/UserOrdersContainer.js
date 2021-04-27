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
      //status: state.userState.status,
    }),
    (dispatch) => ({
      fetchClientOrders: () => dispatch(fetchClientOrders())
      //logOut: () => dispatch(logOut()),
      //saveToken: (token, userID) => dispatch(saveToken(token, userID)),
    })
  )(UserOrders);
