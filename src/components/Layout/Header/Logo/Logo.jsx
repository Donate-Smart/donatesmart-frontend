import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}  className='w-[4%]'>
      <img
        src="/images/logo/logo.svg"
        alt="logo"
        width={160}
        height={50}
        style={{ width: "auto", height: "auto" }}
      />
    </Link>
    
  );
};

export default Logo;
