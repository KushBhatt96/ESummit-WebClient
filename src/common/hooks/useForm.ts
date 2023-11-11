import { ChangeEvent, useState } from "react";

interface FormFields {
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  username: string;
  password: string;
  reenterPassword: string;
}

const initialState: FormFields = {
  firstname: "",
  lastname: "",
  dateOfBirth: "",
  email: "",
  username: "",
  password: "",
  reenterPassword: "",
};

function useForm() {
  const [values, setValues] = useState<FormFields>(initialState);
  const [errors, setErrors] = useState<FormFields>(initialState);

  const validate = (name: string, value: string) => {
    switch (name) {
      case "firstname":
      case "lastname":
        if (value.length === 0) {
          setErrors({ ...errors, [name]: "This is a required field" });
        } else if (value.length > 50) {
          setErrors({
            ...errors,
            [name]: "This field cannot be greater than 50 characters",
          });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
        break;
      case "dateOfBirth":
        const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;
        const isDateOfBirthValid = dateOfBirthRegex.test(value);
        if (!isDateOfBirthValid) {
          setErrors({ ...errors, [name]: "Please select a valid date" });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
        break;
      case "email":
        const emailRegex =
          /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,6}$/;
        const isEmailValid = emailRegex.test(value);
        if (!isEmailValid) {
          setErrors({
            ...errors,
            [name]: "Please enter a valid email address",
          });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
        break;
      case "username":
        const usernameRegex = /^[A-Za-z0-9.]{8,50}$/;
        const isUsernameValid = usernameRegex.test(value);
        if (!isUsernameValid) {
          setErrors({
            ...errors,
            [name]:
              "Username must be between 8 to 50 characters and contain only letters, digits, and periods",
          });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
        break;
      case "password":
        const pwRegex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
        const isPwValid = pwRegex.test(value);
        if (!isPwValid) {
          setErrors({
            ...errors,
            [name]:
              "Password must contain: at least 12 characters, 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character",
          });
        } else {
          setErrors({ ...errors, [name]: "" });
        }
        break;
      case "reenterPassword":
        value !== values.password
          ? setErrors({ ...errors, [name]: "Passwords must match" })
          : setErrors({ ...errors, [name]: "" });
        break;
      default:
        break;
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    validate(name, value);

    setValues({ ...values, [name]: value });
  };

  const handleDateSelected = (selectedDate: Date) => {
    const value = selectedDate.toISOString().split("T")[0];
    validate("dateOfBirth", value);
    setValues({ ...values, dateOfBirth: value });
  };

  const reset = () => {
    setValues(initialState);
    setErrors(initialState);
  };

  const isSubmitButtonDisabled = () => {
    let containsErrors = false;
    Object.entries(errors).forEach(([key, value]) => {
      if (value) {
        containsErrors = true;
      }
    });

    let areAllFilled = true;
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        areAllFilled = false;
      }
    });

    return containsErrors || !areAllFilled;
  };

  return {
    values,
    errors,
    handleChange,
    handleDateSelected,
    reset,
    isSubmitButtonDisabled,
  };
}

export default useForm;
