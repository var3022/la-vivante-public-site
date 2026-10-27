"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, CloseIcon } from "./Icons";

interface HeaderProps {
  currentPath?: string;
}

interface NavLinkItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "The stay", href: "/#stay" },
  { label: "Rooms", href: "/rooms" },
  { label: "Experience", href: "/#experience" },
  { label: "Location", href: "/#location" },
  { label: "Contact", href: "/#contact" },
];

export default function Header({ currentPath = "/" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu on Escape key press and restore focus to menu button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close menu on click/tap outside header
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu if window is resized past mobile/tablet breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <Link
        href="/"
        className="brand"
        aria-label="La Vivante Homestay"
        onClick={closeMenu}
      >
        <span className="flex items-center overflow-hidden rounded-lg p-1.5 shadow-xs transition-opacity hover:opacity-90">
          <Image
            src="/images/lavivante-logo 1.png"
            alt="La Vivante Homestay"
            width={60}
            height={58}
            priority
            className="h-10 w-auto object-contain sm:h-12 md:h-14"
          />
        </span>
        <span className="block font-brand font-bold text-base sm:text-xl md:text-2xl whitespace-nowrap">
          La Vivante Homestay
        </span>
      </Link>

      {/* Desktop Navigation (visible at > 1024px) */}
      <nav className="desktop-nav" aria-label="Main navigation">
        {NAV_LINKS.map((link) => {
          const isActive = link.href === "/rooms" && currentPath === "/rooms";
          return (
            <Link
              key={link.label}
              href={link.href}
              className={isActive ? "active-nav-link" : ""}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile/Tablet Menu Button (visible at <= 1024px) */}
      <button
        ref={menuButtonRef}
        type="button"
        id="mobile-menu-button"
        className="mobile-menu-btn"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
      >
        {isOpen ? (
          <CloseIcon className="w-5 h-5" />
        ) : (
          <MenuIcon className="w-5 h-5" />
        )}
      </button>

      {/* Mobile/Tablet Dropdown / Slide-down Navigation Panel */}
      <div
        id="mobile-navigation-menu"
        className={`mobile-nav-panel ${isOpen ? "open" : ""}`}
        role="region"
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
      >
        <nav className="mobile-nav-links" aria-label="Mobile navigation links">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/rooms" && currentPath === "/rooms";
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`mobile-nav-link ${isActive ? "active-mobile-link" : ""}`}
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
              >
                <span>{link.label}</span>
                <span className="mobile-nav-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-nav-cta">
          <Link
            href="/#booking"
            className="mobile-cta-btn"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
          >
            <span>Plan your stay</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
