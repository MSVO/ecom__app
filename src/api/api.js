const ROOT = "http://localhost:9090";
const REQUEST_HEADERS = {
  "Content-Type": "application/json",
};

function combineHeaders(headerObjectsArray) {
  let headers = {};
  headerObjectsArray.forEach((element) => {
    headers = { ...headers, ...element };
  });
  return headers;
}

function tokenHeader(token) {
  return {
    Authorization: token,
  };
}

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
  if (!response.ok) {
    throw response;
  }
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
  if (!response.ok) {
    throw response;
  }
  const responseBodyObject = await response.json();
  return responseBodyObject;
}

async function apiPut({ path, requestBodyObject, additonalHeaders, token }) {
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
    method: "PUT",
    headers,
    body: JSON.stringify(requestBodyObject),
  });
  if (!response.ok) {
    throw response;
  }
  const responseBodyObject = await response.json();
  return responseBodyObject;
}

async function apiDelete({ path, additonalHeaders, token }) {
  const headers = combineHeaders([
    REQUEST_HEADERS,
    additonalHeaders,
    tokenHeader(token),
  ]);
  const response = await fetch(`${ROOT}${path}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    throw response;
  }
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

async function createAccountAndObtainToken(email, password) {
  const bodyObject = await apiPost({
    path: "/user/",
    requestBodyObject: {
      email,
      password,
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

async function addNewAddressForUser({
  token,
  name,
  fullAddress,
  pinCode,
  email,
  mobile,
}) {
  const bodyObject = await apiPost({
    path: `/user/addresses`,
    token,
    requestBodyObject: {
      name,
      fullAddress,
      pinCode,
      email,
      mobile,
    },
  });
  return bodyObject.addedAddressId;
}

async function fetchAddressById({ token, addressId }) {
  const responseBody = await apiGet({
    path: `/user/addresses/${addressId}`,
    token,
  });
  return responseBody.address;
}

async function deleteAddressById({ token, addressId }) {
  const responseBody = await apiDelete({
    path: `/user/addresses/${addressId}`,
    token,
  });
  return responseBody;
}

async function getOrdersByCreatorToken({ token }) {
  const responseBody = await apiGet({
    path: `/user/orders`,
    token,
  });
  return responseBody.orders;
}

async function queryOrders({ token, queryString }) {
  let path = "/orders/";
  if (queryString) {
    path = path + `${queryString}`;
  }
  console.log(path);
  const responseBody = await apiGet({
    path,
    token,
  });
  return responseBody.orders;
}

async function performOrderAction({ token, orderId, action, remark }) {
  const responseBody = await apiPost({
    path: `/orders/${orderId}`,
    token,
    requestBodyObject: {
      action,
      remark,
    },
  });
  return responseBody.updatedOrder;
}

async function putProduct({
  token,
  productId,
  name,
  description,
  price,
  stockQuantity,
}) {
  const responseBody = await apiPut({
    path: `/products/${productId}`,
    token,
    requestBodyObject: {
      name,
      description,
      price,
      stockQuantity,
    },
  });
  return responseBody.updatedProduct;
}

async function createProduct({
  token,
  name,
  description,
  price,
  stockQuantity,
}) {
  const responseBody = await apiPost({
    path: `/products/`,
    token,
    requestBodyObject: {
      name,
      description,
      price,
      stockQuantity,
    },
  });
  return responseBody.createdProduct;
}

const api = {
  fetchProduct,
  fetchProducts,
  obtainUserToken,
  fetchAddressesOfAuthenticatedUser,
  createOrderUsingToken,
  fetchOrderDetails,
  addNewAddressForUser,
  createAccountAndObtainToken,
  fetchAddressById,
  deleteAddressById,
  getOrdersByCreatorToken,
  queryOrders,
  performOrderAction,
  putProduct,
  createProduct,
};

export default api;
