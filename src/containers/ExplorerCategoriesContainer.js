import { connect } from "react-redux";

import ExplorerCategories from "../components/ExplorerCategories";


export default connect(
    (state) => ({
      categories: state.categoriesState.categories,
    }),
    null
  )(ExplorerCategories);