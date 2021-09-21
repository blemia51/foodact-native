import axios from 'axios';

export default function OrderApi() {
  return({
    postOrder
  })

  function postOrder(order) {
    console.log('postorder', order)
    return axios.post('http://foodact.maresa.ma/api/commandes', order)
      .then((response) => response.data)
      .catch(event => console.error(event))
  }
}