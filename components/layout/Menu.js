"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuTemplate = [
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

export default function Menu() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const renderMenu = (items) =>
    items.map((item) => {
      const hasChildren = Array.isArray(item.children);
      const active = hasChildren
        ? item.children.some((child) => isActive(child.href))
        : isActive(item.href);
      return (
        <li key={item.label} className={active ? "active" : ""}>
          <Link href={item.href}>{item.label}</Link>
          {hasChildren && <ul>{renderMenu(item.children)}</ul>}
        </li>
      );
    });

  return <ul className="main-menu">{renderMenu(menuTemplate)}</ul>;
}
