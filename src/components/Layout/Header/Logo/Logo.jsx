import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}  className='flex items-center gap-2'>
      <img
        className="flex items-center justify-center w-10 h-10"
        src="/images/logo/logo.svg"
        alt="logo"
      />
      <span className="text-2xl font-semibold text-[var(--color-text-dark)]">DonateSmart</span>
    </Link>
    
  );
};

export default Logo;
