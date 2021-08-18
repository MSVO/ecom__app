const ROOT = "http://localhost:9090";

async function apiGet(path) {
  const response = await fetch(`${ROOT}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const bodyObject = await response.json();
  return bodyObject;
}

async function fetchProducts() {
  const bodyObject = await apiGet("/products/");
  return bodyObject.products;
}

const api = {
  fetchProducts,
};

export default api;
