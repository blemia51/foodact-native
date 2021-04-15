export default function CategoriesApi() {
  return ({
    fetchCategories,
  });

  async function fetchCategories() {
    try {
      const response = await fetch("http://foodact.maresa.ma/api/categories", {
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
