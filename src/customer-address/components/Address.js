import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AddressContent from "./AddressContent";
function Address(props) {
  const { address } = props;
  return (
    <Card className={props.className}>
      <AddressContent address={address} />
      {!!props.actions && <CardActions>{props.actions}</CardActions>}
    </Card>
  );
}

export default Address;
