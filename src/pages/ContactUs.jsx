import { useNavigate } from "react-router-dom";
import { useState, useEffect ,useRef} from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ContactUS() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phnumber: "",
    Message: "",
  });
  const [errors, setErrors] = useState({});
  const [showThanks, setShowThanks] = useState(false);
  const [loader, setLoader] = useState(false);

  const refs = {
    firstname: useRef(null),
    lastname: useRef(null),
    email: useRef(null),
    phnumber: useRef(null),
    Message: useRef(null),
  };
  // تحقق من صحة الفورم
  useEffect(() => {
    if (currentUser?.role === "admin") navigate("/");
  }, [ currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phnumber.trim()) {
      newErrors.phnumber = "Phone number is required";
    }
    if (!formData.Message.trim()) {
      newErrors.Message = "Message is required";
    } 
     setErrors(newErrors);

    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField) {
      refs[firstErrorField].current.focus();
      return false;
    }
    return true;
  };
  const reset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phnumber: "",
      Message: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);

      if (res.data?.success) {
        setShowThanks(true);
        reset();

        setTimeout(() => {
          setShowThanks(false);
        }, 5000);
      }
    } catch (error) {
      console.error(
        "Error submitting contact form:",
        error.response?.data || error.message
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container">
      <section id="contact">
        <div className="container">
          <div className="relative">
            <h2 className="mb-9 text-center font-bold tracking-tight">
              Get in Touch
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap w-full m-auto justify-between"
            >
              <div className="sm:flex gap-3 w-full">
                <div className="mx-0 my-2.5 flex-1">
                  <label
                    htmlFor="fname"
                    className="pb-3 inline-block text-base"
                  >
                    First Name
                  </label>
                  <input
                    id="fname"
                    type="text"
                    name="firstname"
                    ref={refs.firstname}
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Fname"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[var(--color-primary)] focus:outline-0"
                  />{errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                </div>
                <div className="mx-0 my-2.5 flex-1">
                  <label
                    htmlFor="lname"
                    className="pb-3 inline-block text-base"
                  >
                    Last Name
                  </label>
                  <input
                    id="lname"
                    type="text"
                    name="lastname"
                    ref={refs.lastname}
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Lname"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[var(--color-primary)] focus:outline-0"
                  />{errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                </div>
              </div>
              <div className="sm:flex gap-3 w-full">
                <div className="mx-0 my-2.5 flex-1">
                  <label
                    htmlFor="email"
                    className="pb-3 inline-block text-base"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    ref={refs.email}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="YourName@example.com"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[var(--color-primary)] focus:outline-0"
                  />{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mx-0 my-2.5 flex-1">
                  <label
                    htmlFor="Phnumber"
                    className="pb-3 inline-block text-base"
                  >
                    Phone Number
                  </label>
                  <input
                    id="Phnumber"
                    type="tel"
                    name="phnumber"
                    placeholder="+1234567890"
                    ref={refs.phnumber}
                    value={formData.phnumber}
                    onChange={handleChange}
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[var(--color-primary)] focus:outline-0"
                  />{errors.phnumber && <p className="text-red-500 text-sm">{errors.phnumber}</p>}
                </div>
              </div>
              <div className="w-full mx-0 my-2.5 flex-1">
                <label htmlFor="message" className="text-base inline-block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="Message"
                  ref={refs.Message}
                  value={formData.Message}
                  onChange={handleChange}
                  className="w-full mt-2 rounded-2xl px-5 py-3 border-solid border transition-all duration-500 focus:border-[var(--color-primary)] focus:outline-0"
                  placeholder="Feel free to write your message here...We are always ready to assist you !"
                ></textarea>{errors.Message && <p className="text-red-500 text-sm">{errors.Message}</p>}
              </div>
              <div className="text-center my-2.5 w-full">
                <button
                  type="submit"
                  className={`border leading-none px-12 text-lg font-medium py-4 rounded-lg 
    ${
      loader
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:bg-transparent hover:text-[var(--color-primary)] cursor-pointer"
    }`}
                >
                  {loader ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
            {showThanks && (
              <div className="text-white bg-[var(--color-primary)] rounded-full px-4 text-lg mb-4.5 mt-1 absolute flex items-center gap-2">
                Thank you for contacting us! We will get back to you soon.
                <div className="w-3 h-3 rounded-full animate-spin border-2 border-solid border-white border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
