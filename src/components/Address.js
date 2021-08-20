import { CardContent } from "@material-ui/core";

function Address(props) {
  const { name, fullAddress, pinCode, email, mobile } = props.address;

  return (
    <CardContent>
      <p>
        {name}
        <br />
        {fullAddress}
        <br />
        Pin: {pinCode}
        <br />
        email: {email}
        <br />
        mobile: {mobile}
        <br />
      </p>
    </CardContent>
  );
}

export default Address;
