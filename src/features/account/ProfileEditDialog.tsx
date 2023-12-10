import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../../models/Product";
import { PropsWithChildren } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
}));

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  value: string;
}

function ProfileEditDialog({
  isOpen,
  handleClose,
  title,
  value,
  children,
}: PropsWithChildren<Props>) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ p: 2 }} fontWeight={600} id="customized-dialog-title">
        Change {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <TableContainer>
          <Table>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </BootstrapDialog>
  );
}

export default ProfileEditDialog;
