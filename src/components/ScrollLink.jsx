import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ScrollLink({ to, children, onClick, closeMenu, ...props }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const targetId = to.replace("#", "");
    const target = document.getElementById(targetId);

    if (target) {
      // Target exists on this page → scroll to it
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      // Otherwise, navigate home and then scroll
      navigate("/");
      setTimeout(() => {
        const homeTarget = document.getElementById(targetId);
        if (homeTarget) {
          homeTarget.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // match your page transition time
    }

    // ✅ close mobile menu if passed
    if (closeMenu) closeMenu();

    // run any extra onClick passed
    if (onClick) onClick(e);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
