import { connect } from "react-redux";
import ProductDetail from "../screens/ProductDetail";
import { postOrder } from "../redux/actions/order"


export default connect(
    (state) => ({
      token: state.userState.token,
      userId: state.userState.userId,
      userProfile: state.userState.userProfile,
    }),
    (dispatch) => ({
      postOrder: (order) => dispatch(postOrder(order)),
    })
    
  )(ProductDetail);