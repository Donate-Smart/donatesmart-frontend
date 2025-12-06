import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import toast from 'react-hot-toast'

export default function EditProfile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState(currentUser?.name || "");
    const [email, setEmail] = useState(currentUser?.email || "");


    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.put(
          "api/auth/update",
          { name, email },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        dispatch(setUser(res.data.user));
        toast.success("Successfully updated info");
        navigate("/profile");

      } catch (err) {
          const message = err.response?.data?.message || err.message || "Login failed";
          console.log(err);
          toast.error(message);
      }
    };

  return (
    <div className="flex flex-col items-center mt-24 min-h-[78vh]">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="w-1/3 bg-white p-9 shadow-md rounded-md"
      >
        <label className="block mb-3">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </label>

        <button
          type="submit"
          className='bg-[var(--color-primary)] w-full py-3 rounded-lg text-18 font-medium border text-white border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
