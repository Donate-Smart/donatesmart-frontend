import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo/Logo";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import Signin from "../../Auth/SignIn/SignIn";
import SignUp from "../../Auth/SignUp/SignUp";
import { logoutUser } from "../../../redux/userSlice";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const signInRef = useRef(null);
  const signUpRef = useRef(null);
  const mobileMenuRef = useRef(null);

  let headerData = [];

  if (currentUser?.role === "user") {
    headerData = [
      { label: "Home", href: "/" },
      { label: "Cases", href: "/cases" },
      { label: "Add Case", href: "/add-case" },
      { label: "Contact Us", href: "/contact" },
      { label: "Profile", href: "/profile" },
    ];
  } else if (currentUser?.role === "admin") {
    headerData = [
      { label: "Home", href: "/" },
      { label: "Admin Panel", href: "/admin" },
      { label: "Cases", href: "/cases" },
      { label: "Profile", href: "/profile" },
    ];
  } else {
    headerData = [
      { label: "Home", href: "/" },
      { label: "All Cases", href: "/cases" },
      { label: "Contact Us", href: "/contact" },
    ];
  }

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY >= 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setNavbarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (navbarOpen || isSignInOpen || isSignUpOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  const signOutUser = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header
        className={`sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm transition-shadow ${sticky ? "shadow-lg" : "shadow-sm"
          }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />

            <nav className="hidden md:flex items-center gap-8">
              {headerData.map((item, index) => (
                <HeaderLink key={index} item={item} />
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {!currentUser && (
                <button
                  className="hidden md:block border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition"
                  onClick={() => setIsSignInOpen(true)}
                >
                  Sign In
                </button>
              )}

              {currentUser && (
                <button
                  className="hidden md:block border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition"
                  onClick={signOutUser}
                >
                  Sign Out
                </button>
              )}

              {!currentUser && (
                <button
                  className="hidden md:block bg-[var(--color-primary)] text-white px-6 py-2 rounded-full border border-[var(--color-primary)] hover:bg-transparent hover:text-[var(--color-primary)] transition"
                  onClick={() => setIsSignUpOpen(true)}
                >
                  Sign Up
                </button>
              )}

              <button
                className="block md:hidden p-2"
                onClick={() => {
                  setNavbarOpen(true);
                  setTimeout(() => setMenuVisible(true), 10);
                }}
              >
                <span className="block w-6 h-0.5 bg-black" />
                <span className="block w-6 h-0.5 bg-black mt-1.5" />
                <span className="block w-6 h-0.5 bg-black mt-1.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== FULLSCREEN MOBILE MENU ===== */}
      {navbarOpen && (
        <div
          ref={mobileMenuRef}
          className={`md:hidden fixed inset-0 bg-white z-[9999]
  transition-all duration-200 ease-out
  ${menuVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
  `}
        >

          <div className="flex items-center justify-between p-4 border-b">
            <Logo />
            <button
              onClick={() => {
                setMenuVisible(false);
                setTimeout(() => setNavbarOpen(false), 200);
              }}

              className="bg-black/20 rounded-full p-1"
            >
              <Icon icon="material-symbols:close-rounded" width={24} />
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-4">
            {headerData.map((item, index) => (
              <MobileHeaderLink
                key={index}
                item={item}
                closeMenu={() => setNavbarOpen(false)}
              />
            ))}

            <div className="mt-6 flex flex-col gap-4">
              {currentUser ? (
                <button
                  className="bg-[var(--color-primary)] text-white py-2 rounded-lg"
                  onClick={signOutUser}
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    className="bg-[var(--color-primary)] text-white py-2 rounded-lg"
                    onClick={() => {
                      setIsSignInOpen(true);
                      setNavbarOpen(false);
                    }}
                  >
                    Sign In
                  </button>

                  <button
                    className="border border-[var(--color-primary)] text-[var(--color-primary)] py-2 rounded-lg"
                    onClick={() => {
                      setIsSignUpOpen(true);
                      setNavbarOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>

        </div>
      )}

      {/* ===== MODALS ===== */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center">
          <div ref={signInRef} className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setIsSignInOpen(false)}
              className="absolute top-4 right-4"
            >
              <Icon icon="material-symbols:close-rounded" width={24} />
            </button>
            <Signin
              setIsSignInOpen={setIsSignInOpen}
              setIsSignUpOpen={setIsSignUpOpen}
            />
          </div>
        </div>
      )}

      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center">
          <div ref={signUpRef} className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="absolute top-4 right-4"
            >
              <Icon icon="material-symbols:close-rounded" width={24} />
            </button>
            <SignUp
              setIsSignInOpen={setIsSignInOpen}
              setIsSignUpOpen={setIsSignUpOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
