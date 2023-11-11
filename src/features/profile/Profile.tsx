import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";

function Profile() {
  const appUser = useAppSelector((state) => state.auth.appUser);

  return (
    <Container>
      <Typography variant="h2">Profile Page</Typography>
      {appUser && (
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                {`Name: ${appUser.firstname} ${appUser.lastname}`}
              </TableRow>
              <TableRow>{`DOB: ${appUser.dateOfBirth}`}</TableRow>
              <TableRow>{`Email: ${appUser.email}`}</TableRow>
              <TableRow>{`Username: ${appUser.username}`}</TableRow>
              <TableRow>{`Password: ************`}</TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Profile;
