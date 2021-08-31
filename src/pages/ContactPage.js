import { Typography } from "@material-ui/core";
import SideNavLayout from "../layout/SideNavLayout";

function ContactPage() {
  return (
    <SideNavLayout>
      <Typography variant="h4">Support</Typography>;
      <Typography>
        In case of queries or concerns regarding the platform, please write to
        us. We typically respond within 1-3 business days.
      </Typography>
      <br />
      <Typography>Email: support@ecommerce.com</Typography>
    </SideNavLayout>
  );
}

export default ContactPage;
