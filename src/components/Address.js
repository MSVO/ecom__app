import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Icon,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PinDropIcon from "@material-ui/icons/PinDrop";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CallIcon from "@material-ui/icons/Call";
import RoomIcon from "@material-ui/icons/Room";
function Address(props) {
  const { name, fullAddress, pinCode, email, mobile } = props.address;

  return (
    <Card className={props.className}>
      <CardContent>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body1">
          {fullAddress} - {pinCode}
        </Typography>
        <br />
        <Grid container key="email">
          <Grid item xs={1}>
            <MailOutlineIcon />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">{email}</Typography>
          </Grid>
        </Grid>
        <Grid container key="mobile">
          <Grid item xs={1}>
            <CallIcon />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">{mobile}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      {!!props.actions && <CardActions>{props.actions}</CardActions>}
    </Card>
  );
}

export default Address;
