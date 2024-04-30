import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useContacts } from "../components/ContactContext"; // Adjust the import path as necessary

interface Inputs {
  userName: string;
  organization?: string;
  email: string;
  mobile: number;
}

const initialOrganizations = [
  { label: "Microsoft", value: "Microsoft" },
  { label: "Nvidia", value: "Nvidia" },
  { label: "MsBit", value: "MsBit" },
];

export default function AddContact() {
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [organizationInput, setOrganizationInput] = useState<string | null>(
    null
  );
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      userName: "",
      email: "",
      mobile: undefined,
    },
    mode: "onChange",
  });

  const { addContact } = useContacts();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const contactData = {
      name: data.userName,
      email: data.email,
      mobile: data.mobile.toString(),
      organization: data.organization,
    };
    addContact(contactData);
    alert(`${data.userName} saved successfully.`);
    reset(); // Resets the form fields to initial values
    setOrganizationInput(null); // Clears the organization input in the Autocomplete
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("userName", { required: "Name is required" })}
        label="Name"
        required
        error={!!errors.userName}
        helperText={errors.userName?.message}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <Controller
        name="organization"
        control={control}
        render={({ field, fieldState }) => (
          <Autocomplete
            {...field}
            freeSolo
            options={organizations}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
            isOptionEqualToValue={(option, value) =>
              typeof option === "string"
                ? option === value
                : option.value === value.value
            }
            value={organizationInput} // Controlled value
            onChange={(event, newValue) => {
              if (typeof newValue === "string" || newValue === null) {
                setOrganizationInput(newValue); // Directly set the string or null
                field.onChange(newValue);
              } else {
                setOrganizationInput(newValue.value); // Set the value from the option object
                field.onChange(newValue.value);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Organization"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        )}
      />

      <TextField
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: "Email must be valid",
          },
        })}
        label="Email"
        type="email"
        required
        error={!!errors.email}
        helperText={errors.email?.message}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        {...register("mobile", {
          required: "Mobile number is required",
          pattern: {
            value: /^\d{10}$/,
            message: "Invalid mobile number",
          },
        })}
        label="Mobile"
        required
        error={!!errors.mobile}
        helperText={errors.mobile?.message}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <Button
        type="submit"
        disabled={!isValid}
        variant="contained"
        color="primary"
      >
        Save
      </Button>
    </form>
  );
}
