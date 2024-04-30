import { Link } from "react-router-dom";
import MobileMenuButton from "../components/MobileMenuButton";

export default function Header() {
  return (
    <>
      <nav className="bg-gray-800 relative text-white lg:h-14">
        <ul className="flex flex-col space-y-4 px-6 pt-4 pb-2  lg:flex-row lg:space-x-10 lg:space-y-0 ">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/addContact">Add Contact</Link>
          </li>
          <li>
            <Link to="/contactList">Contact List</Link>
          </li>

          <li className="lg:hidden">
            <button className="absolute right-0 top-0">
              <MobileMenuButton />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
