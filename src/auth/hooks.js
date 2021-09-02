import { useSelector } from "react-redux";

export const useAuthSelector = () => {
  const authToken = useSelector((state) => state.auth.token);
  const isLoggedIn = !!authToken;
  const isAdmin = useSelector((state) =>
    state.auth.roles.includes("ROLE_ADMIN")
  );
  const isCustomer = useSelector((state) => isLoggedIn && !isAdmin);
  const userId = useSelector((state) => state.auth.userId);

  return { isLoggedIn, isAdmin, isCustomer, userId, authToken };
};
