import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Contact, useContacts } from "../components/ContactContext"; // Adjust the import path as necessary
import { useNavigate, useParams, useLocation } from "react-router-dom";

export type Inputs = Omit<Contact, "id">;

export const filter = createFilterOptions<string>();
export default function AddContact() {
  const location = useLocation();
  const state = location.state as { id?: string }; // Accessing state
  const id = state?.id; // Getting the id from state
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      mobile: undefined,
    },
    mode: "onChange",
  });

  const navigate = useNavigate();
  const {
    addContact,
    editContact,
    organizations,
    addOrganization,
    editOrganization,
    contacts,
  } = useContacts();

  useEffect(() => {
    if (id) {
      const contactToEdit = contacts.find((contact) => contact.id === id);
      if (contactToEdit) {
        setValue("name", contactToEdit.name);
        setValue("email", contactToEdit.email);
        setValue("organization", contactToEdit.organization);
        setValue("mobile", contactToEdit.mobile);
      }
    }
  }, [id, contacts, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const isNewOrganization =
      data.organization && !organizations.includes(data.organization);
    if (isNewOrganization) {
      // we do know that data.organization exists (!)
      addOrganization(data.organization!);
    }
    if (id) {
      editContact(id, data);
      alert(`${data.name} updated successfully.`);
    } else {
      addContact(data);
      alert(`${data.name} saved successfully.`);
    }
    reset();
    navigate(`/contactList`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name", { required: "Name is required" })}
        label="Name"
        required
        error={!!errors.name}
        helperText={errors.name?.message}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <Controller
        name="organization"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <Autocomplete
              {...field}
              freeSolo
              options={organizations}
              value={field.value} // Controlled value
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }

                return filtered;
              }}
              onChange={(event, newValue) => {
                field.onChange(newValue);
                // to update the list of organizations
                editOrganization(field.value!, newValue!);
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
          );
        }}
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
        {id ? "Update" : "Save"}
      </Button>
    </form>
  );
}
