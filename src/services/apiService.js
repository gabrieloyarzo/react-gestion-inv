const API_URL = "https://gestion-inv-api.onrender.com/api";

const ApiService = {
  async getAllProducts() {
    try {
      const response = await fetch(`${API_URL}/producto`);
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },

  async createProduct(productData) {
    try {
      const response = await fetch(`${API_URL}/producto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error("Error al crear producto");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  },

  async updateProduct(productId, updatedProductData) {
    try {
      const response = await fetch(`${API_URL}/producto/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar producto");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  },
};

export default ApiService;
