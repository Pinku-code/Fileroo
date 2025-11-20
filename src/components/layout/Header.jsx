import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { name: "About", to: "/about" },
    { name: "Privacy", to: "/privacy" },
    { name: "Contact", to: "/contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    // navigate(`/search?query=${encodeURIComponent(search)}`);
    navigate(`/search?q=${encodeURIComponent(search)}`);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          {/* <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center font-black text-xl">
            F
          </div> */}
          <img className="w-10 h-10" src="/logo.png" alt="" />
          <span className="font-extrabold text-xl pr-5">Fileroo</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {/* Nav Items */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-gray-700 hover:text-black font-medium transition"
            >
              {item.name}
            </Link>
          ))}

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative w-64 flex items-center bg-gray-100 rounded-full px-4 py-2 
             focus-within:ring-2 focus-within:ring-lime-400 transition"
          >
            <Search className="w-5 h-5 text-gray-500 mr-2" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search tools..."
              className="flex-1 bg-transparent outline-none border-none focus:ring-0 text-sm placeholder-gray-500"
            />


            <button type="submit" className="hidden"></button>
          </form>


          {/* Clerk Auth */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-xl bg-lime-400 font-semibold hover:bg-lime-500 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg bg-lime-400 hover:bg-lime-300"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="p-4 flex flex-col gap-5">

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-gray-800"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-100 rounded-full px-4 py-2 
             focus-within:ring-2 focus-within:ring-lime-400 transition"
            >
              <Search className="w-5 h-5 text-gray-500 mr-2" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search tools..."
                className="flex-1 bg-transparent outline-none border-none focus:ring-0 text-sm placeholder-gray-500"
              />


              <button type="submit" className="px-4 py-2 bg-lime-400 rounded-full ml-2">
                <Search size={18} className="text-white" />
              </button>
            </form>


            {/* Mobile Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full px-4 py-3 rounded-xl bg-lime-400 font-semibold hover:bg-lime-500">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

          </div>
        </div>
      )}
    </nav>
  );
}