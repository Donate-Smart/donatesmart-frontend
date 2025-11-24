import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from './Logo/Logo'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import Signin from '../../Auth/SignIn/SignIn'
import SignUp from '../../Auth/SignUp/SignUp'
import { logoutUser } from "../../../redux/userSlice";
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast'


const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  // instead of writing document.getElementById("nav")
  const navbarRef = useRef(null)
  const signInRef = useRef(null)
  const signUpRef = useRef(null)
  const mobileMenuRef = useRef(null)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let headerData = [];

  if(currentUser?.role === "user")
  {
    headerData = [
      { label: 'Home', href: '/home' },
      { label: 'Cases', href: '/add-case' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Profile', href: '/profile'},
    ]
  }
  else if(currentUser?.role === "admin")
  {
     headerData = [
      { label: 'Admin Panel', href: '/admin'},
      { label: 'Cases', href: '/cases' },
      { label: 'Profile', href: '/admin_profile'},
    ]
  }
  else{
     headerData = [
      { label: 'Home', href: '\\' },
      { label: 'Cases', href: '/#Cases' },
      { label: 'Testimonial', href: '/#testimonial-section' },
      { label: 'Contact Us', href: '/#contact' },
    ]
  }

  const handleScroll = () => {
    setSticky(window.scrollY >= 10)
  }

  //close signin/up menu when clicking outside
  const handleClickOutside = (event) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target) &&
      !event.target.closest(".toast")
    ) {
      setIsSignInOpen(false)
    }
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target) &&
      !event.target.closest(".toast")
    ) {
      setIsSignUpOpen(false)
      console.log(event.target);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      navbarOpen &&
      !event.target.closest(".toast")
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen, isSignInOpen, isSignUpOpen])

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen])

  const signOutUser = () => {
      dispatch(logoutUser());
      toast.success("user logged out");
      navigate("/");
  };

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky ? ' shadow-lg bg-white py-4' : 'shadow-none py-4'
      }`}>
      <div>
        <div className='container mx-auto max-w-7xl px-4 flex items-center justify-between'>
          <Logo  />
          <nav className='hidden lg:flex grow items-center gap-8 justify-start ml-14'>
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          {/* sign in/up buttons and popup menu */}
          <div className='flex items-center gap-4'>
            {!currentUser && (<button
              className='hidden lg:block bg-transparent text-[var(--color-primary)] border hover:bg-[var(--color-primary)] border-[var(--color-primary)] hover:text-white duration-300 px-6 py-2 rounded-lg hover:cursor-pointer'
              onClick={() => {
                setIsSignInOpen(true)
              }}>
              Sign In
            </button>)}
            {currentUser && (<button
              className='hidden lg:block bg-transparent text-[var(--color-primary)] border hover:bg-[var(--color-primary)] border-[var(--color-primary)] hover:text-white duration-300 px-6 py-2 rounded-lg hover:cursor-pointer'
              onClick={() => {
                signOutUser();
              }}>
              Sign out
            </button>)}
            {isSignInOpen && (
              <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
                <div
                  ref={signInRef}
                  className='relative mx-auto w-full max-w-md overflow-hidden rounded-lg px-8 pt-14 pb-8 text-center bg-dark_grey/90 backdrop-blur-md bg-white'>
                  <button
                    onClick={() => setIsSignInOpen(false)}
                    className='absolute top-0 right-0 mr-8 mt-8'
                    aria-label='Close Sign In Modal'>
                    <Icon
                      icon='material-symbols:close-rounded'
                      width={24}
                      height={24}
                      className='text-black hover:text-[var(--color-primary)] inline-block hover:cursor-pointer'
                    />
                  </button>
                  <Signin  setIsSignInOpen={setIsSignInOpen} setIsSignUpOpen={setIsSignUpOpen} />
                </div>
              </div>
            )}
            {!currentUser && (<button
              className='hidden lg:block bg-[var(--color-primary)] text-white text-base font-medium hover:bg-transparent duration-300 hover:text-[var(--color-primary)] border border-[var(--color-primary)] px-6 py-2 rounded-lg hover:cursor-pointer'
              onClick={() => {
                setIsSignUpOpen(true)
              }}>
              Sign Up
            </button>)}
            {isSignUpOpen && (
              <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
                <div
                  ref={signUpRef}
                  className='relative mx-auto bg-white w-full max-w-md overflow-hidden rounded-lg bg-dark_grey/90 backdrop-blur-md px-8 pt-14 pb-8 text-center'>
                  <button
                    onClick={() => setIsSignUpOpen(false)}
                    className='absolute top-0 right-0 mr-8 mt-8'
                    aria-label='Close Sign Up Modal'>
                    <Icon
                      icon='material-symbols:close-rounded'
                      width={24}
                      height={24}
                      className='text-black hover:text-[var(--color-primary)] inline-block hover:cursor-pointer'
                    />
                  </button>
                  <SignUp setIsSignInOpen={setIsSignInOpen} setIsSignUpOpen={setIsSignUpOpen} />
                </div>
              </div>
            )}
            {/* mobile navbar */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className='block lg:hidden p-2 rounded-lg'
              aria-label='Toggle mobile menu'>
              <span className='block w-6 h-0.5 bg-black'></span>
              <span className='block w-6 h-0.5 bg-black mt-1.5'></span>
              <span className='block w-6 h-0.5 bg-black mt-1.5'></span>
            </button>
          </div>
        </div>
        {navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50`}>
          <div className='flex items-center justify-between p-4'>
            <h2 className='text-lg font-bold text-midnight_text'>
              <Logo />
            </h2>
            <button
              onClick={() => setNavbarOpen(false)}
              className='bg-black/30 rounded-full p-1 text-white'
              aria-label='Close menu Modal'>
              <Icon
                icon={'material-symbols:close-rounded'}
                width={24}
                height={24}
              />
            </button>
          </div>
          <nav className='flex flex-col items-start p-4'>
            {headerData.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className='mt-4 flex flex-col gap-4 w-full'>
              {currentUser && (<button
                className='bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg border  border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'
                onClick={() => {
                  signOutUser();
                }}>
                Sign Out
              </button>)}
              {!currentUser && (<button
                className='bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg border  border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'
                onClick={() => {
                  setIsSignInOpen(true)
                  setNavbarOpen(false)
                }}>
                Sign In
              </button>)}
              {!currentUser && (<button
                className='bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg border  border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'
                onClick={() => {
                  setIsSignUpOpen(true)
                  setNavbarOpen(false)
                }}>
                Sign Up
              </button>)}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar;


/*import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        DonateSmart
      </h2>

      <div style={styles.links}>
        <Link style={styles.link} to="/">
          Home
        </Link>

        {currentUser && (
          <Link style={styles.link} to="/add-case">
            Add Case
          </Link>
        )}

        {currentUser && (
          <Link style={styles.link} to="/profile">
            Profile
          </Link>
        )}

        {!currentUser && (
          <>
            <Link style={styles.link} to="/login">
              Login
            </Link>
            <Link style={styles.link} to="/register">
              Register
            </Link>
          </>
        )}

        {currentUser && (
          <button style={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    borderRadius: "0 0 22px 22px",
    padding: "0px 25px",
    background: "#7fdb34ff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  logo: {
    cursor: "pointer",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logout: {
    background: "white",
    color: "#7fdb34ff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};*/
