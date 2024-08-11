import {
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "../../app/hooks";
import ProfileRow from "./ProfileRow";
import {
  ChangeAddress,
  ChangeEmail,
  ChangePassword,
  ChangeProfileName,
} from "./ProfileDialogInnerComponents";
import PasswordTextPlaceholder from "../../common/PasswordTextPlaceholder";

function Profile() {
  const appUser = useAppSelector((state) => state.auth.appUser);

  const tempAddressList = [
    "77 Luka Rd Dallas, TX, 78945",
    "23 Coolio Drive New York, NY, 12345",
    "24 Mamba Ave Los Angeles, CA, 15948",
  ];

  return (
    <Container sx={{ marginY: "2rem" }}>
      <Typography variant="h3">{`Profile`}</Typography>
      {appUser && (
        <>
          <Grid
            container
            marginY="2rem"
            padding="1rem"
            borderRadius="5px"
            component={Paper}
            elevation={5}
          >
            <TableContainer>
              <Table>
                <TableBody>
                  <ProfileRow
                    title="Name"
                    value={`${appUser.firstname} ${appUser.lastname}`}
                  >
                    <ChangeProfileName />
                  </ProfileRow>
                  <ProfileRow
                    title="Date of birth"
                    value={`${appUser.dateOfBirth}`}
                    isEditable={false}
                  />
                  <ProfileRow title="Email address" value={`${appUser.email}`}>
                    <ChangeEmail />
                  </ProfileRow>
                  <ProfileRow
                    title="Username"
                    value={`${appUser.username}`}
                    isEditable={false}
                  />
                  <ProfileRow
                    title="Password"
                    value={<PasswordTextPlaceholder />}
                  >
                    <ChangePassword />
                  </ProfileRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Typography variant="h3">Shipping Addresses</Typography>
          <Grid
            container
            marginY="2rem"
            padding="1rem"
            borderRadius="5px"
            component={Paper}
            elevation={5}
          >
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableBody>
                    {tempAddressList.map((address, index) => {
                      return (
                        <ProfileRow
                          key={index}
                          title={`Address ${index + 1}`}
                          value={address}
                          isDeletable={true}
                        >
                          <ChangeAddress />
                        </ProfileRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <IconButton size="large">
                <AddIcon />
              </IconButton>
              Add a new address
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default Profile;
