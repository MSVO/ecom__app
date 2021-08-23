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

const routes = {
  landing,
  checkout,
  signIn,
  order,
  addAddress,
};

export default routes;
