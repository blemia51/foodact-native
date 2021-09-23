import axios from 'axios';
import { API_URL } from "@env"

export default function OrderApi() {
  return({
    postOrder
  })

  function postOrder(order) {
    console.log('postorder', order)
    return axios.post(`${API_URL}/commandes`, order)
      .then((response) => response.data)
      .catch(event => console.error(event))
  }
}