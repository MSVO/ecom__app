import { Button, CardActions, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import api from "../api/api";

function OrderActions(props) {
  const { order } = props;
  const {
    id: orderId,
    status: orderStatus,
    remark,
    quantity: orderedQuantity,
  } = order;
  const { stock_quantity } = order.product;
  const auth = useSelector((state) => state.auth);
  const isAdmin = auth.roles.includes("ROLE_ADMIN");
  const remarkInput = useRef();

  function performOrderAction(action) {
    console.log(remarkInput.current.value);
    api
      .performOrderAction({
        token: auth.token,
        orderId,
        action,
        remark: remarkInput.current.value,
      })
      .then((order) => {
        props.onComplete(order);
      })
      .catch((e) => {
        throw e;
      });
  }

  return (
    <Fragment>
      {isAdmin && orderStatus === "PLACED" && (
        <Fragment>
          <Autocomplete
            options={[
              "Sorry, the item is out of stock",
              "Sorry, we are unable to deliver at your location",
            ]}
            clearOnBlur={false}
            spacing={3}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add a remark"
                fullWidth
                variant="outlined"
                inputRef={remarkInput}
                defaultValue={remark}
              />
            )}
          />
          {
            <CardActions>
              {stock_quantity > orderedQuantity && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => performOrderAction("ACCEPT")}
                >
                  Accept
                </Button>
              )}
              {stock_quantity < orderedQuantity && (
                <Button disabled variant="contained">
                  Insufficient stock
                </Button>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => performOrderAction("REJECT")}
              >
                Reject
              </Button>
            </CardActions>
          }
        </Fragment>
      )}
    </Fragment>
  );
}

export default OrderActions;
