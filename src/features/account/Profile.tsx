import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../app/hooks";

function Profile() {
  const appUser = useAppSelector((state) => state.auth.appUser);

  const hiddenCharacterStyle = {
    background: "grey",
    height: "10px",
    width: "10px",
    borderRadius: "100%",
    marginRight: "5px",
  };

  const hiddenPasswordPlaceholder = (
    <Box sx={{ display: "flex" }}>
      {[...Array(12)].map((value, index) => {
        return <Box key={index} sx={hiddenCharacterStyle} />;
      })}
    </Box>
  );

  const tempAddressList = [
    "77 Luka Rd Dallas, TX, 78945",
    "23 Coolio Drive New York, NY, 12345",
    "24 Mamba Ave Los Angeles, CA, 15948",
  ];

  const tempCardList = ["**** **** 8888 VISA", "**** **** 9999 Mastercard"];

  return (
    <Container sx={{ marginY: "2rem" }}>
      <Typography variant="h3">{`Profile`}</Typography>
      {appUser && (
        <>
          <Grid
            container
            marginY="2rem"
            padding="5px"
            borderRadius="10px"
            component={Paper}
            elevation={5}
          >
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">
                        <strong>Name</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{`${appUser.firstname} ${appUser.lastname}`}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">
                        <strong>Date of birth</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{`${appUser.dateOfBirth}`}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">
                        <strong>Email Address</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{`${appUser.email}`}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">
                        <strong>Username</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{`${appUser.username}`}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <Typography variant="h6">
                        <strong>Password</strong>
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      {hiddenPasswordPlaceholder}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Typography variant="h3">Communication Preferences</Typography>
          <Grid
            container
            bgcolor="primary"
            marginY="2rem"
            padding="1.5rem"
            borderRadius="10px"
            component={Paper}
            elevation={5}
            display="flex"
            flexDirection="column"
          >
            <Typography variant="h6">
              Get email notifications about tracking updates.
            </Typography>
            <Switch />
          </Grid>
          <Typography variant="h3">Shipping Addresses</Typography>
          <Grid
            container
            bgcolor="primary"
            marginY="2rem"
            padding="1.5rem"
            borderRadius="10px"
            component={Paper}
            elevation={5}
            display="flex"
            flexDirection="row"
            spacing={1}
          >
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableBody>
                    {tempAddressList.map((address, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="h6">{address}</Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
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
