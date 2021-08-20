const ROOT = "http://localhost:9090";
const REQUEST_HEADERS = {
  "Content-Type": "application/json",
};

async function apiGet({ path, additonalHeaders, token }) {
  let headers = { ...REQUEST_HEADERS };
  if (additonalHeaders) {
    headers = {
      ...headers,
      ...additonalHeaders,
    };
  }
  if (token) {
    headers = {
      ...headers,
      Authorization: token,
    };
  }
  const response = await fetch(`${ROOT}${path}`, {
    method: "GET",
    headers,
  });
  const bodyObject = await response.json();
  return bodyObject;
}

async function apiPost({ path, requestBodyObject, additonalHeaders, token }) {
  let headers = { ...REQUEST_HEADERS };
  if (additonalHeaders) {
    headers = {
      ...headers,
      ...additonalHeaders,
    };
  }
  if (token) {
    headers = {
      ...headers,
      Authorization: token,
    };
  }
  const response = await fetch(`${ROOT}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBodyObject),
  });
  const responseBodyObject = await response.json();
  return responseBodyObject;
}

async function fetchProduct(productId) {
  const bodyObject = await apiGet({
    path: `/products/${productId}`,
  });
  return bodyObject.product;
}

async function fetchProducts() {
  const bodyObject = await apiGet({
    path: "/products/",
  });
  return bodyObject.products;
}

async function obtainUserToken(email, password) {
  const bodyObject = await apiPost({
    path: "/auth/",
    requestBodyObject: {
      email: email,
      password: password,
    },
  });
  return bodyObject.token;
}

async function fetchAddressesOfAuthenticatedUser(token) {
  const bodyObject = await apiGet({
    path: `/user/addresses`,
    token,
  });
  return bodyObject.addresses;
}

async function createOrderUsingToken(token, addressId, productId, quantity) {
  const bodyObject = await apiPost({
    path: "/orders/",
    requestBodyObject: {
      addressId,
      productId,
      quantity,
    },
    token: `${token}`,
  });
  return bodyObject.createdOrder;
}

async function fetchOrderDetails({ token, orderId }) {
  const bodyObject = await apiGet({
    path: `/orders/${orderId}`,
    token,
  });
  return bodyObject.order;
}

const api = {
  fetchProduct,
  fetchProducts,
  obtainUserToken,
  fetchAddressesOfAuthenticatedUser,
  createOrderUsingToken,
  fetchOrderDetails,
};

export default api;