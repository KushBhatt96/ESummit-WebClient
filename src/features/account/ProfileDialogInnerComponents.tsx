import {
  Button,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import BasicInput from "../../common/BasicInput";
import useForm, { FormField } from "../../common/hooks/useForm";
import { ProfileUpdateDTO } from "../../models/ProfileUpdateDTO";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUpdateStatus, updateProfile } from "../auth/AuthSlice";
import Loading, { LoadingSizes } from "../../common/Loading";
import { useState } from "react";

export function ChangeProfileName() {
  const dispatch = useAppDispatch();
  const updateStatus = useAppSelector(selectUpdateStatus);
  const dialogInitialState: FormField[] = [
    { name: "firstname", value: "" },
    { name: "lastname", value: "" },
  ];
  const { getValues, getErrors, handleChange, reset, isSubmitButtonDisabled } =
    useForm(dialogInitialState);

  const handleSubmit = async () => {
    try {
      const valuesObject = getValues();
      const firstnameUpdateInfo: ProfileUpdateDTO = {
        property: "firstname",
        value: valuesObject.firstname,
      };
      const lastnameUpdateInfo: ProfileUpdateDTO = {
        property: "lastname",
        value: valuesObject.lastname,
      };

      dispatch(updateProfile(firstnameUpdateInfo)).then(() => {
        dispatch(updateProfile(lastnameUpdateInfo));
      });
    } catch (error: any) {
      reset();
      toast.error(error.data.detail);
    }
  };

  if (updateStatus === "loading") {
    return <Loading message="Updating profile..." size={LoadingSizes.SMALL} />;
  }

  const errors = getErrors();
  return (
    <>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }}>
          <TextField
            required
            id="outlined-required"
            color="secondary"
            label="First name"
            name="firstname"
            sx={{ width: "100%" }}
            onChange={handleChange}
            error={errors.firstname ? true : false}
            helperText={errors.firstname}
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
            onChange={handleChange}
            error={errors.lastname ? true : false}
            helperText={errors.lastname}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isSubmitButtonDisabled()}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export function ChangeEmail() {
  const dispatch = useAppDispatch();
  const updateStatus = useAppSelector(selectUpdateStatus);
  const dialogInitialState: FormField[] = [{ name: "email", value: "" }];
  const { getValues, getErrors, handleChange, reset, isSubmitButtonDisabled } =
    useForm(dialogInitialState);

  const handleSubmit = async () => {
    try {
      const valuesObject = getValues();
      const emailUpdateInfo: ProfileUpdateDTO = {
        property: "email",
        value: valuesObject.email,
      };

      dispatch(updateProfile(emailUpdateInfo));
    } catch (error: any) {
      reset();
      toast.error(error.data.detail);
    }
  };

  if (updateStatus === "loading") {
    return <Loading message="Updating profile..." size={LoadingSizes.SMALL} />;
  }

  const errors = getErrors();

  return (
    <>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }}>
          <TextField
            required
            id="outlined-required"
            color="secondary"
            label="Email"
            name="email"
            sx={{ width: "100%" }}
            onChange={handleChange}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isSubmitButtonDisabled()}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export function ChangePassword() {
  const dispatch = useAppDispatch();
  const updateStatus = useAppSelector(selectUpdateStatus);
  const dialogInitialState: FormField[] = [{ name: "password", value: "" }];
  const { getValues, getErrors, handleChange, reset, isSubmitButtonDisabled } =
    useForm(dialogInitialState);

  const [oldPassword, setOldPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const valuesObject = getValues();
      const passwordUpdateInfo: ProfileUpdateDTO = {
        property: "password",
        value: valuesObject.password,
        oldValue: oldPassword,
      };

      dispatch(updateProfile(passwordUpdateInfo));
    } catch (error: any) {
      reset();
      toast.error(error.data.detail);
    }
  };

  if (updateStatus === "loading") {
    return <Loading message="Updating profile..." size={LoadingSizes.SMALL} />;
  }

  const errors = getErrors();

  return (
    <>
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
            onChange={(e) => setOldPassword(e.target.value)}
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
            onChange={handleChange}
            error={errors.password ? true : false}
            helperText={errors.password}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isSubmitButtonDisabled()}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export function ChangeAddress() {
  return (
    <>
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
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
