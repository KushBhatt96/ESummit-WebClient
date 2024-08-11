import { TableCell, TableRow, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { PropsWithChildren, useState } from "react";
import ProfileEditDialog from "./ProfileEditDialog";

interface Props {
  title: string;
  value: string | JSX.Element;
  isEditable?: boolean;
  isDeletable?: boolean;
}

function ProfileRow({
  title,
  value,
  isEditable = true,
  isDeletable = false,
  children,
}: PropsWithChildren<Props>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditOpen = () => setIsEditOpen(true);

  const handleEditClose = () => setIsEditOpen(false);

  const handleDeleteOpen = () => setIsDeleteOpen(true);

  const handleDeleteClose = () => setIsDeleteOpen(false);

  return (
    <>
      <ProfileEditDialog
        isOpen={isEditOpen}
        handleClose={handleEditClose}
        title={title}
        value={value}
      >
        {children}
      </ProfileEditDialog>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }}>
          <Typography variant="h6">{title}</Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none" }}>
          <Typography variant="body1">{value}</Typography>
        </TableCell>
        {isEditable && (
          <TableCell sx={{ borderBottom: "none" }}>
            <IconButton onClick={handleEditOpen}>
              <EditIcon />
            </IconButton>
          </TableCell>
        )}
        {isDeletable && (
          <TableCell sx={{ borderBottom: "none" }}>
            <IconButton onClick={handleDeleteOpen}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    </>
  );
}

export default ProfileRow;
