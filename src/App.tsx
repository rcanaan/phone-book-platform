import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import AddContact from "./pages/AddContact";
import ContactList from "./pages/ContactLIst";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
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
            // Add more nested routes here if needed
          </Route>
          // You can also add routes here that do not use the common layout if
          necessary
        </Routes>
      </ContactProvider>
    </Router>
  );
};

export default App;
