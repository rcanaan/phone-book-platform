import React from "react";
import { useContacts } from "../components/ContactContext";
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
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const handleOpenDialog = (id: number) => {
    setOpenDialog(true);
    setSelectedId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    if (selectedId) {
      deleteContact(selectedId);
      handleCloseDialog();
    }
  };

  return (
    <div>
      <Table>
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
                  onClick={() => handleOpenDialog(contact.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openDialog && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will permanently delete the contact.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ContactList;
