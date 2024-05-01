import { useParams } from "react-router-dom";
import { useContacts, Contact } from "../components/ContactContext";
import TextField from "@mui/material/TextField";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Inputs, filter } from "./AddContact";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function EditContact() {
  const { handleSubmit, control } = useForm<Inputs>();
  let { id } = useParams<"id">(); // Get the id from the URL
  const numericId = parseInt(id || "0", 10);
  const { editContact, editOrganization, organizations, getContactById } =
    useContacts();

  const contact: Contact = getContactById(numericId);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.organization = contact.organization;
    data.name = contact.name;
    data.email = contact.email;
    data.mobile = contact.mobile;
    alert(`${data.name} updated successfully.`);
    navigate(`/contactList`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Contact - ID: </h2>
      <div>{contact.name}</div>
      <TextField
        label="Name"
        variant="outlined"
        value={contact.name}
        onChange={(event) => {
          editContact(contact.id, { name: event.target.value });
        }}
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
              value={contact.organization} // Controlled value
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
                editContact(contact.id, { organization: newValue! });
                editOrganization(contact.organization!, newValue!);
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
        label="Email"
        variant="outlined"
        value={contact.email}
        onChange={(event) => {
          editContact(contact.id, { email: event.target.value });
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mobile"
        variant="outlined"
        value={contact.mobile}
        onChange={(event) => {
          editContact(contact.id, { mobile: event.target.value });
        }}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </form>
  );
}
