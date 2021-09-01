import { FilledInput, IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useRef } from "react";

function ProductSearcher(props) {
  const searchTextRef = useRef();

  function onSubmitHandler(event) {
    event.preventDefault();
    props.onSearch(searchTextRef.current.value);
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <FilledInput
        placeholder="Search by name"
        inputRef={searchTextRef}
        fullWidth
        margin="normal"
        size="small"
        type="text"
        id="productName"
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </form>
  );
}

export default ProductSearcher;
