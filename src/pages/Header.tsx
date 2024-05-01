import { Link } from "react-router-dom";
import MobileMenuButton from "../components/MobileMenuButton";
import { useState } from "react";
import clsx from "clsx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav
        className={clsx("bg-gray-800 relative text-white lg:h-14", {
          "h-12": isMenuOpen,
        })}
      >
        <ul className="flex flex-col space-y-4 px-6 pt-4 pb-2  lg:flex-row lg:space-x-10 lg:space-y-0 ">
          <li>
            <Link to="/">Home</Link>
          </li>
          <div className={clsx("space-y-4", { collapse: isMenuOpen })}>
            <li>
              <Link to="/addContact">Add Contact</Link>
            </li>
            <li>
              <Link to="/contactList">Contact List</Link>
            </li>
          </div>
          <li className="lg:hidden">
            <button onClick={handleClick} className="absolute right-0 top-0">
              <MobileMenuButton />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
