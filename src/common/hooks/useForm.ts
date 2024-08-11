import { ChangeEvent, useMemo, useState } from "react";

// interface FormFields {
//   firstname: string;
//   lastname: string;
//   dateOfBirth: string;
//   email: string;
//   username: string;
//   password: string;
//   reenterPassword: string;
// }

// const initialState: FormFields = {
//   firstname: "",
//   lastname: "",
//   dateOfBirth: "",
//   email: "",
//   username: "",
//   password: "",
//   reenterPassword: "",
// };

export type FieldType =
  | "firstname"
  | "lastname"
  | "dateOfBirth"
  | "email"
  | "username"
  | "password"
  | "reenterPassword";

export interface FormField {
  name: FieldType;
  value: string;
}

function useForm(initialValues: FormField[]) {
  const [values, setValues] = useState<FormField[]>(initialValues);

  const [errors, setErrors] = useState<FormField[]>(initialValues);

  const validate = (name: string, value: string) => {
    const updatedErrors = errors.map((error) => ({ ...error }));
    switch (name) {
      case "firstname":
      case "lastname":
        setErrors(
          updatedErrors.map((error) => {
            if (error.name === name) {
              if (value.length === 0) {
                error.value = "This is a required field";
              } else if (value.length > 50) {
                error.value = "This field cannot be greater than 50 characters";
              } else {
                error.value = "";
              }
            }
            return error;
          })
        );
        break;
      case "dateOfBirth":
        const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;
        const isDateOfBirthValid = dateOfBirthRegex.test(value);
        setErrors(
          updatedErrors.map((error) => {
            if (error.name === name) {
              if (!isDateOfBirthValid) {
                error.value = "Please select a valid date";
              } else {
                error.value = "";
              }
            }
            return error;
          })
        );
        break;
      case "email":
        const emailRegex =
          /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,6}$/;
        const isEmailValid = emailRegex.test(value);
        setErrors(
          updatedErrors.map((error) => {
            if (error.name === name) {
              if (!isEmailValid) {
                error.value = "Please enter a valid email address";
              } else {
                error.value = "";
              }
            }
            return error;
          })
        );
        break;
      case "username":
        const usernameRegex = /^[A-Za-z0-9.]{8,50}$/;
        const isUsernameValid = usernameRegex.test(value);
        setErrors(
          updatedErrors.map((error) => {
            if (error.name === name) {
              if (!isUsernameValid) {
                error.value =
                  "Username must be between 8 to 50 characters and contain only letters, digits, and periods";
              } else {
                error.value = "";
              }
            }
            return error;
          })
        );
        break;
      case "password":
        const pwRegex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
        const isPwValid = pwRegex.test(value);
        setErrors(
          updatedErrors.map((error) => {
            if (error.name === name) {
              if (!isPwValid) {
                error.value =
                  "Password must contain: at least 12 characters, 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character";
              } else {
                error.value = "";
              }
            }
            return error;
          })
        );
        break;
      case "reenterPassword":
        const passwordObject = values.find(
          (value) => value.name === "password"
        );
        const arePasswordsMatching = passwordObject?.value === value;
        setErrors(
          updatedErrors.map((error) => {
            if (error.name === name) {
              if (!arePasswordsMatching) {
                error.value = "Passwords do not match";
              } else {
                error.value = "";
              }
            }
            return error;
          })
        );
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

    const updatedValues = values.map((value) => ({ ...value }));
    setValues(
      updatedValues.map((obj) => {
        if (obj.name === name) {
          obj.value = value;
        }
        return obj;
      })
    );
  };

  const handleDateSelected = (selectedDate: Date) => {
    const value = selectedDate.toISOString().split("T")[0];
    validate("dateOfBirth", value);

    const updatedValues = values.map((value) => ({ ...value }));
    setValues(
      updatedValues.map((obj) => {
        if (obj.name === "dateOfBirth") {
          obj.value = value;
        }
        return obj;
      })
    );
  };

  const reset = () => {
    const updatedValues = values.map((value) => ({ ...value }));
    const resetValues = updatedValues.map((obj) => {
      obj.value = "";
      return obj;
    });
    setValues(resetValues);
    setErrors(resetValues);
  };

  const isSubmitButtonDisabled = () => {
    let containsErrors = false;
    for (const error of errors) {
      if (error.value !== "") {
        containsErrors = true;
        break;
      }
    }

    let areAllFilled = true;
    for (const item of values) {
      if (!item.value) {
        areAllFilled = false;
        break;
      }
    }

    return containsErrors || !areAllFilled;
  };

  const getErrors = useMemo(() => {
    const computeErrors = () => {
      const errorsObject: any = {};
      for (const { name, value } of errors) {
        errorsObject[name] = value;
      }
      return errorsObject;
    };

    return computeErrors;
  }, [errors]);

  const getValues = useMemo(() => {
    const computeValues = () => {
      const valuesObject: any = {};
      for (const { name, value } of values) {
        valuesObject[name] = value;
      }
      return valuesObject;
    };
    return computeValues;
  }, [values]);

  return {
    getValues,
    getErrors,
    handleChange,
    handleDateSelected,
    reset,
    isSubmitButtonDisabled,
  };
}

export default useForm;
