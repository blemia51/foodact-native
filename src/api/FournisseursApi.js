import { API_URL } from "@env"
export default function FournisseursApi() {
  return ({
    fetchFournisseurs,
    fetchCreneauxFournisseurs,
  });

  async function fetchFournisseurs() {
    try {
      const response = await fetch(`${API_URL}/fournisseurs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const datas = await response.json();
      return datas
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCreneauxFournisseurs() {
    try {
      const response = await fetch(`${API_URL}/expiration_creaneaus`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const datas = await response.json();
      return datas
    } catch (error) {
      console.error(error);
    }
  }
} 
