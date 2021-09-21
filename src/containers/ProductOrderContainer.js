import { connect } from "react-redux";
import ProductOrder from "../screens/ProductOrder";


export default connect(
    (state) => ({
      token: state.userState.token,
      userId: state.userState.userId,
      userProfile: state.userState.userProfile,
      order: state.orderState.order
    }),
    
  )(ProductOrder);