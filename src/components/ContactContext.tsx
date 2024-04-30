import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of a contact object
export interface Contact {
  id: number;
  name: string;
  email?: string;
  mobile?: string;
  organization?: string; // Added organization field
}

interface ContactContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, "id">) => void;
  deleteContact: (id: number) => void;
  editContact: (id: number, updatedContact: Partial<Contact>) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (contact: Omit<Contact, "id">) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editContact = (id: number, updatedContact: Partial<Contact>) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, deleteContact, editContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};
