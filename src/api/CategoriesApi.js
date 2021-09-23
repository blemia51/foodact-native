import { API_URL } from "@env"
export default function CategoriesApi() {
  return ({
    fetchCategories,
  });

  async function fetchCategories() {
    try {
      const response = await fetch(`${API_URL}/categories`, {
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
