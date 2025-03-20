import { Facebook, Film, Twitter, Instagram, Youtube } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <Film className="h-6 w-6 text-primary" />
              <span className="">MovieNest</span>
            </Link>
            <p className="mt-4 text-sm">
              Your ultimate destination for movies and TV shows. Watch anywhere,
              anytime.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-primary">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className="hover:text-primary">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="hover:text-primary">
                  My Watchlist
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/action" className="hover:text-primary">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/category/comedy" className="hover:text-primary">
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/category/drama" className="hover:text-primary">
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/category/horror" className="hover:text-primary">
                  Horror
                </Link>
              </li>
              <li>
                <Link href="/category/sci-fi" className="hover:text-primary">
                  Sci-Fi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} MovieNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
