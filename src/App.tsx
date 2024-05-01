import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import AddContact from "./pages/AddContact";
import ContactList from "./pages/ContactLIst";
import { ContactProvider } from "./components/ContactContext";

const App: React.FC = () => {
  return (
    <Router>
      <ContactProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="addContact" element={<AddContact />} />
            <Route path="contactList" element={<ContactList />} />
          </Route>
        </Routes>
      </ContactProvider>
    </Router>
  );
};

export default App;
