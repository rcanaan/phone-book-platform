import React, { createContext, useContext, useState, ReactNode } from "react";

const initialOrganizations = ["Microsoft", "Nvidia", "MsBit"];

export interface Contact {
  id: number;
  name: string;
  email: string;
  mobile: string;
  organization?: string;
}
interface ContactContextType {
  contacts: Contact[];
  organizations: string[];
  addOrganization: (newOrganization: string) => void;
  editOrganization: (
    currentOrganization: string,
    newOrganization: string
  ) => void;
  addContact: (contact: Omit<Contact, "id">) => void;
  deleteContact: (id: number) => void;
  getContactById: (id: number) => Contact;
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
  const [organizations, setOrganizations] = useState(initialOrganizations);

  const addOrganization = (newOrganization: string) => {
    setOrganizations([...organizations, newOrganization]);
  };
  const addContact = (contact: Omit<Contact, "id">) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
  };

  const getContactById = (id: number) => {
    return contacts.filter((contact) => contact.id === id)[0];
  };
  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editOrganization = (
    currentOrganization: string,
    newOrganization: string
  ) => {
    setOrganizations(
      organizations.map((org) =>
        org === currentOrganization ? newOrganization : org
      )
    );
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
      value={{
        contacts,
        addContact,
        deleteContact,
        editContact,
        editOrganization,
        addOrganization,
        organizations,
        getContactById,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
