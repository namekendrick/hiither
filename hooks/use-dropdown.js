import { useEffect, useState, useRef } from "react";

export const useDropdown = () => {
  const ref = useRef();

  const [isNavOpen, setNavOpen] = useState(false);
  const toggleNavOpen = () => setNavOpen(!isNavOpen);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isNavOpen && ref.current && !ref.current.contains(e.target)) {
        setNavOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isNavOpen]);

  return { ref, isNavOpen, toggleNavOpen };
};
