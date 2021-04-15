export default function FournisseursApi() {
  return ({
    fetchFournisseurs,
    fetchCreneauxFournisseurs,
  });

  async function fetchFournisseurs() {
    try {
      const response = await fetch("http://foodact.maresa.ma/api/fournisseurs", {
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
      const response = await fetch("http://foodact.maresa.ma/api/expiration_creaneaus", {
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
