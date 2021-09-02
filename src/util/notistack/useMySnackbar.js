import { useSnackbar } from "notistack";

export default function useMySnackbar() {
  let { enqueueSnackbar } = useSnackbar();
  function enqueueSnack(message, givenOptions) {
    const defaultOptions = {
      anchorOrigin: { vertical: "top", horizontal: "center" },
    };
    const options = givenOptions
      ? { ...defaultOptions, ...givenOptions }
      : defaultOptions;
    return enqueueSnackbar(message, options);
  }
  function enqueueErrorSnack(message) {
    enqueueSnack(message, { variant: "error" });
  }
  function successSnackCorner(message) {
    enqueueSnack(message, {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  }
  function errorSnackCorner(message) {
    enqueueSnack(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  }
  function enqueueFetchFailedSnack() {
    enqueueErrorSnack("Fetching failed!");
  }

  return {
    enqueueSnack,
    enqueueErrorSnack,
    enqueueFetchFailedSnack,
    successSnackCorner,
    errorSnackCorner,
  };
}
