const landing = {
  name: "landing",
  template: "/",
  buildPath: () => "/",
};

const checkout = {
  name: "checkout",
  pathTemplate: "/checkout",
  buildPath: () => "/checkout",
};

const signIn = {
  name: "signIn",
  template: "/signin",
  buildPath: (onSuccessRoute) => {
    return onSuccessRoute ? `/signin?onsuccess=${onSuccessRoute}` : "/signin";
  },
};

const order = {
  name: "order",
  template: "/orders/:orderId",
  buildPath: (orderId) => {
    return `/orders/${orderId}`;
  },
};

const addAddress = {
  name: "addAddress",
  template: "/user/addaddress",
  buildPath: () => {
    return `/user/addaddress`;
  },
};

const addresses = {
  name: "addresses",
  template: "/user/addresses",
  buildPath: () => {
    return `/user/addresses`;
  },
};

const pastOrders = {
  name: "pastOrders",
  template: "/user/orders",
  buildPath: () => {
    return `/user/orders`;
  },
};

const manageOrders = {
  name: "manageOrders",
  template: "/dash/orders",
  buildPath: ({ queryString }) => {
    return `/dash/orders${queryString}`;
  },
};

const manageProducts = {
  name: "manageProducts",
  template: "/dash/products",
  buildPath: () => {
    return `/dash/products`;
  },
};

const routes = {
  landing,
  checkout,
  signIn,
  order,
  addAddress,
  addresses,
  pastOrders,
  manageOrders,
  manageProducts,
};

export default routes;
