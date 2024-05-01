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
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const navigate = useNavigate();

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
  const handleEdit = (id: number) => {
    navigate(`/editContact/${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full leading-normal">
        <TableHead>
          <TableRow>
            <TableCell className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </TableCell>
            <TableCell className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider md:table-cell hidden">
              Email
            </TableCell>
            <TableCell className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider md:table-cell hidden">
              Mobile
            </TableCell>
            <TableCell className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Organization
            </TableCell>
            <TableCell className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {contact.name}
              </TableCell>
              <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm md:table-cell hidden">
                {contact.email}
              </TableCell>
              <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm md:table-cell hidden">
                {contact.mobile}
              </TableCell>
              <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {contact.organization
                  ? contact.organization
                  : "No Organization"}
              </TableCell>
              <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Button
                  color="primary"
                  onClick={() => handleOpenDialog(contact.id)}
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
      {openDialog && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will permanently delete the contact.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContactList;
