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
    enqueueSnackbar(message, { variant: "error" });
  }
  function enqueueFetchFailedSnack() {
    enqueueErrorSnack("Fetching failed!");
  }

  return {
    enqueueSnack,
    enqueueErrorSnack,
    enqueueFetchFailedSnack,
  };
}
