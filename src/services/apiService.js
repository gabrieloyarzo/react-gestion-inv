const API_URL = "https://gestion-inv-api.onrender.com/api";

export const ApiProducts = {
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

  async deleteProduct(productId) {
    try {
      const response = await fetch(`${API_URL}/producto/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error al eliminar producto");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  },
};

export const ApiOrders = {
  async getAllOrders() {
    try {
      const response = await fetch(`${API_URL}/pedido`);
      if (!response.ok) {
        throw new Error("Error al obtener pedidos");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      throw error;
    }
  },

  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Error al crear pedido");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al crear pedido:", error);
      throw error;
    }
  },

  async updateOrder(orderId, updatedOrderData) {
    try {
      const response = await fetch(`${API_URL}/pedido/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrderData),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar pedido");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al actualizar pedido:", error);
      throw error;
    }
  },

  async deleteOrder(orderId) {
    try {
      const response = await fetch(`${API_URL}/pedido/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error al eliminar pedido");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al eliminar pedido:", error);
      throw error;
    }
  },
}
