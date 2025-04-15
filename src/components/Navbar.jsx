import { Film, Menu, Search, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  const [searchShow, setSearchShow] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-200">
      <div className="flex h-16 items-center justify-between px-6 md:px-12 lg:px-24">
        <Link className="flex items-center gap-2 text-xl font-bold" to="/">
          <Film className="h-6 w-6" />
          <span>MovieNest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link to="/" className="text-sm font-medium text-primary">
            Home
          </Link>
          <Link to="/movies" className="text-sm font-medium text-primary">
            Movies
          </Link>
          <Link to="/tv" className="text-sm font-medium text-primary">
            Series
          </Link>
          <Link to="/watchlist" className="text-sm font-medium text-primary">
            My Watchlist
          </Link>
        </nav>

        {/* Search and Mobile Menu */}
        <div className="flex items-center gap-2">
          {searchShow ? (
            <div className="absolute inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 lg:px-24">
              <Input
                type="search"
                placeholder="Search for movies or tv-shows"
                className="flex-1 border-gray-700 bg-gray-900 text-white placeholder:text-gray-400 focus-visible:ring-primary"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchShow(false)}
                className="ml-2 text-white hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close Search</span>
              </Button>
            </div>
          ) : (
            <Button
              varint="ghost"
              size="icon"
              onClick={() => setSearchShow(true)}
              className="ml-2 text-white hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">search</span>
            </Button>
          )}

          {/* <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-gray-800"
              >
                <Menu className="h-5 w-55" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-gray-900 text-white"
            >
              <nav className="mt-12 flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/movies"
                  className="text-lg font-medium hover:text-primary"
                >
                  Movies
                </Link>
                <Link
                  href="/tv-shows"
                  className="text-lg font-medium hover:text-primary"
                >
                  TV Shows
                </Link>
                <Link
                  href="/watchlist"
                  className="text-lg font-medium hover:text-primary"
                >
                  My Watchlist
                </Link>
                <div className="mt-4 space-y-2">
                  <Button className="w-full" variant="default">
                    Sign In
                  </Button>
                  <Button className="w-full" variant="outline">
                    Sign Up
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
