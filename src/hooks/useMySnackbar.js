import { useSnackbar } from "notistack";

function useMySnackbar() {
  const { enqueueSnackbar } = useSnackbar();
  return {
    enqueueSnackbar: (message, givenOptions) => {
      const defaultOptions = {
        anchorOrigin: { vertical: "top", horizontal: "center" },
      };
      const options = givenOptions
        ? { ...defaultOptions, ...givenOptions }
        : defaultOptions;
      return enqueueSnackbar(message, options);
    },
  };
}

export default useMySnackbar;
