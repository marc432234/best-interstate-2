"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import OptimizedImage from "./OptimizedImage";
import { IMAGE_SIZES } from "@/lib/image-sizes";

const LOGO = "/assets/images/BEST-INTERSTATE-MOVING-AND-STORAGE_Logo-V2.png";

const services = [
  { href: "/residential-moving/", label: "Residential Moving" },
  { href: "/commercial-business-moving/", label: "Commercial + Business Moving" },
  { href: "/corporate-relocation/", label: "Corporate Relocation" },
  { href: "/auto-transportation/", label: "Auto Transportation" },
];

const solutions = [
  { href: "/packing/", label: "Packing + Unpacking" },
  { href: "/temporary-storage/", label: "Temporary Storage" },
  { href: "/piano-transportation/", label: "Piano Transportation" },
  { href: "/boxes-and-moving-supplies/", label: "Boxes + Moving Supplies" },
  { href: "/broadband-services/", label: "Broadband Services" },
  { href: "/custom-crating/", label: "Custom Crating" },
  { href: "/moving-insurance/", label: "Moving Insurance" },
];

function isActive(pathname: string, href: string) {
  const clean = href.replace(/\/$/, "");
  if (clean === "") return pathname === "/";
  return pathname === clean || pathname.startsWith(clean + "/");
}

function groupActive(pathname: string, items: { href: string }[]) {
  return items.some((item) => isActive(pathname, item.href));
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  const toggleMenu = (key: string) => {
    setOpenMenu((current) => (current === key ? null : key));
  };

  const mobileLink = (active: boolean) =>
    `flex-1 py-3 px-4 rounded-xl text-[15px] font-medium transition-colors ${
      active
        ? "bg-blue-50 !text-blue-700"
        : "!text-slate-800 hover:bg-slate-50"
    }`;

  const mobileSubLink =
    "block py-2.5 px-4 rounded-xl text-[14px] transition-colors !text-slate-600 hover:bg-slate-50 hover:!text-slate-900";

  return (
    <nav
      className="navbar navbar-default navbar-fixed-top"
      style={{ minHeight: 96 }}
    >
      <div className="container">
        <div className="row">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <OptimizedImage
                src={LOGO}
                alt="Best Interstate Moving + Storage"
                width={260}
                height={86}
                sizes={IMAGE_SIZES.logoMobile}
                style={{ height: 82 }}
              />
            </a>
          </div>
          <div className="nav-mobile !bg-transparent">
            <button
              id="nav-toggle"
              type="button"
              aria-controls="navbar"
              aria-expanded={mobileOpen}
              className={mobileOpen ? "active" : ""}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span></span>
            </button>
          </div>
          <div className="rghtNav">
            <div className="textwidget">
              <p>
                <span className="textSpan" style={{ fontSize: 14 }}>
                  Instant Moving Quote:{" "}
                  <a href="tel:8666403952">
                    <strong>866-640-3952</strong>
                  </a>
                </span>
              </p>
            </div>
          </div>
          <div
            id="navbar-desktop"
            data-react-nav="true"
            className="navbar-collapse collapse hidden xl:!block"
          >
            <ul id="menu-menu" className="nav-list">
              <li className="nav-logo-item">
                <a className="nav-logo-link" href="/">
                  <OptimizedImage
                    src={LOGO}
                    alt="Best Interstate Moving + Storage"
                    width={240}
                    height={80}
                    sizes={IMAGE_SIZES.logoDesktop}
                  />
                </a>
              </li>
              <li className={isActive(pathname, "/") ? "active" : ""}>
                <a href="/">Home</a>
              </li>
              <li className={groupActive(pathname, services) ? "active" : ""}>
                <span className="nav-dropdown-trigger ForMob">Services</span>
                <ul className="nav-dropdown">
                  {services.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className={groupActive(pathname, solutions) ? "active" : ""}>
                <span className="nav-dropdown-trigger ForMob">
                  Moving Solutions
                </span>
                <ul className="nav-dropdown">
                  {solutions.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </li>
              <li
                className={
                  isActive(pathname, "/service-areas/") ||
                  isActive(pathname, "/service-area/")
                    ? "active"
                    : ""
                }
              >
                <a href="/service-areas/">Service Areas</a>
              </li>
              <li
                className={
                  isActive(pathname, "/moving-calculator/") ? "active" : ""
                }
              >
                <a href="/moving-calculator/">Calculator</a>
              </li>
              <li className={isActive(pathname, "/blog/") ? "active" : ""}>
                <a href="/blog/">Blog</a>
              </li>
            </ul>
          </div>
          <div
            className={`fixed inset-0 z-[9999] transition-opacity duration-300 xl:hidden ${
              mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={closeMobile}
            ></div>
            <div
              className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
                mobileOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <a href="/" onClick={closeMobile}>
                  <OptimizedImage
                    src={LOGO}
                    alt="Best Interstate Moving + Storage"
                    width={180}
                    height={60}
                    sizes={IMAGE_SIZES.logoDrawer}
                    style={{ height: 42 }}
                  />
                </a>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                  onClick={closeMobile}
                  aria-label="Close menu"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="flex flex-col space-y-1">
                  <li className="flex flex-col">
                    <div className="flex">
                      <a
                        className={mobileLink(pathname === "/")}
                        href="/"
                        onClick={closeMobile}
                      >
                        Home
                      </a>
                    </div>
                  </li>
                  <li className="flex flex-col">
                    <button
                      className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-[15px] font-medium transition-colors !text-slate-800 hover:bg-slate-50"
                      onClick={() => toggleMenu("services")}
                    >
                      Services
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMenu === "services" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openMenu === "services"
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="pl-4 pr-2 space-y-1 pb-2 border-l-2 border-slate-100 ml-6">
                        {services.map((item) => (
                          <li key={item.href}>
                            <a
                              className={mobileSubLink}
                              href={item.href}
                              onClick={closeMobile}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li className="flex flex-col">
                    <button
                      className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-[15px] font-medium transition-colors !text-slate-800 hover:bg-slate-50"
                      onClick={() => toggleMenu("solutions")}
                    >
                      Moving Solutions
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMenu === "solutions" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openMenu === "solutions"
                          ? "max-h-[600px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="pl-4 pr-2 space-y-1 pb-2 border-l-2 border-slate-100 ml-6">
                        {solutions.map((item) => (
                          <li key={item.href}>
                            <a
                              className={mobileSubLink}
                              href={item.href}
                              onClick={closeMobile}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li className="flex flex-col">
                    <div className="flex">
                      <a
                        className={mobileLink(
                          isActive(pathname, "/service-areas/")
                        )}
                        href="/service-areas/"
                        onClick={closeMobile}
                      >
                        Service Areas
                      </a>
                    </div>
                  </li>
                  <li className="flex flex-col">
                    <div className="flex">
                      <a
                        className={mobileLink(
                          isActive(pathname, "/moving-calculator/")
                        )}
                        href="/moving-calculator/"
                        onClick={closeMobile}
                      >
                        Calculator
                      </a>
                    </div>
                  </li>
                  <li className="flex flex-col">
                    <div className="flex">
                      <a
                        className={mobileLink(isActive(pathname, "/blog/"))}
                        href="/blog/"
                        onClick={closeMobile}
                      >
                        Blog
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="p-5 border-t border-slate-100 bg-slate-50">
                <a
                  href="tel:8666403952"
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-blue-600 px-4 py-3.5 font-medium text-white shadow-sm shadow-blue-200 transition-colors hover:bg-blue-700 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>866-640-3952</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
