"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },

  {
    label: "Terms of Service",
    href: "/terms-of-service",
  },

  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
];

export default function MobileMenu({ isMobileMenu, handleMobileMenu }) {
  const [openIndex, setOpenIndex] = useState(null);
  const pathname = usePathname();

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const isActive = (href) => (pathname === href ? "active" : "");

  return (
    <div
      className={`mobile-navigation-menu ${
        isMobileMenu ? "open-mobile-menu" : ""
      }`}
    >
      <button id="mobile-menu-close bg-black" onClick={handleMobileMenu}>
        <i className="la la-close" />
      </button>
      <ul className="main-menu">
        {menuItems.map((item, index) => {
          const hasChildren = !!item.children?.length;
          const isOpen = openIndex === index;
          return (
            <li
              key={item.label}
              className={`dropdown_menu ${isOpen ? "dropdown-open" : ""}`}
            >
              <Link href={item.href}>
                {item.label}
                {hasChildren && <span />}
              </Link>

              {hasChildren && (
                <>
                  <ul style={{ display: isOpen ? "block" : "none" }}>
                    {item.children.map((child) => (
                      <li key={child.label} className={isActive(child.href)}>
                        <Link href={child.href}>
                          {child.label}
                          <span />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <span
                    className={`dropdown-plus ${isOpen ? "dropdown-open" : ""}`}
                    onClick={() => toggleAccordion(index)}
                  />
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
