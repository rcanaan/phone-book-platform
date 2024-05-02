import React from "react";
import { useContacts } from "../components/ContactContext";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ContactList: React.FC = () => {
  const { contacts, deleteContact } = useContacts();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState<{
    id: string;
    name: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleOpenDialog = (id: string, name: string) => {
    setOpenDialog(true);
    setSelectedContact({ id, name });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedContact(null); // Reset selectedContact on dialog close
  };

  const handleDelete = () => {
    if (selectedContact) {
      deleteContact(selectedContact.id);
      handleCloseDialog();
    }
  };

  const handleEdit = (id: string) => {
    navigate("/addContact/", { state: { id } });
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-center font-bold text-2xl">Contact list Page</h1>
      <Table className="min-w-full leading-normal">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.mobile}</TableCell>
              <TableCell>
                {contact.organization
                  ? contact.organization
                  : "No Organization"}
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => handleOpenDialog(contact.id, contact.name)}
                >
                  Delete
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleEdit(contact.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openDialog && selectedContact && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{"Confirm Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Remove {selectedContact.name}, are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ContactList;
