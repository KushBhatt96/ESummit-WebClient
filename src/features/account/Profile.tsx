import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../app/hooks";
import ProfileRow from "./ProfileRow";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BasicInput from "../../common/BasicInput";

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
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <TextField
                          required
                          id="outlined-required"
                          color="secondary"
                          label="First name"
                          name="firstname"
                          sx={{ width: "100%" }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <TextField
                          required
                          id="outlined-required"
                          color="secondary"
                          label="Last name"
                          name="lastname"
                          sx={{ width: "100%" }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </ProfileRow>
                  <ProfileRow
                    title="Date of birth"
                    value={`${appUser.dateOfBirth}`}
                  >
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disableFuture
                            label="Date of birth"
                            onChange={(selectedDate) =>
                              handleDateSelected(selectedDate as Date)
                            }
                            sx={{
                              ".Mui-focused": {
                                color: "teal !important",
                              },
                              ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "teal !important",
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </ProfileRow>
                  <ProfileRow title="Email address" value={`${appUser.email}`}>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <TextField
                          required
                          id="outlined-required"
                          color="secondary"
                          label="Email"
                          name="email"
                          sx={{ width: "100%" }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </ProfileRow>
                  <ProfileRow
                    title="Username"
                    value={`${appUser.username}`}
                    isEditable={false}
                  />
                  <ProfileRow
                    title="Password"
                    value={hiddenPasswordPlaceholder}
                  >
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <TextField
                          required
                          id="outlined-required"
                          color="secondary"
                          label="Old Password"
                          name="password"
                          type="password"
                          sx={{ width: "100%" }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <TextField
                          required
                          id="outlined-required"
                          color="secondary"
                          label="New Password"
                          name="password"
                          type="password"
                          sx={{ width: "100%" }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </ProfileRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Typography variant="h3">Shipping Addresses</Typography>
          <Grid
            container
            bgcolor="primary"
            marginY="2rem"
            padding="1.5rem"
            borderRadius="5px"
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
                        <ProfileRow
                          key={index}
                          title={`Address ${index + 1}`}
                          value={address}
                          isDeletable={true}
                        >
                          <TableRow>
                            <TableCell sx={{ borderBottom: "none" }}>
                              <TextField
                                id="outlined-required"
                                color="secondary"
                                label="Street Address"
                                name="streetaddress"
                                sx={{ width: "100%" }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ borderBottom: "none" }}>
                              <BasicInput
                                label="State"
                                outerStyles={{
                                  background: "primary",
                                  width: "100%",
                                }}
                              >
                                <MenuItem value="TX">CA</MenuItem>
                                <MenuItem value="PA">PA</MenuItem>
                                <MenuItem value="TX">TX</MenuItem>
                              </BasicInput>
                            </TableCell>
                            <TableCell sx={{ borderBottom: "none" }}>
                              <TextField
                                id="outlined-required"
                                color="secondary"
                                label="Zip Code"
                                name="Zip"
                                sx={{ width: "100%" }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ borderBottom: "none" }}>
                              <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                              >
                                Submit
                              </Button>
                            </TableCell>
                          </TableRow>
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
