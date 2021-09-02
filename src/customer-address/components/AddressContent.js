import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

export default function AddressContent(props) {
  const { name, fullAddress, pinCode, email, mobile } = props.address;
  return (
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
  );
}
