import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Removed extra space
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100">
      <form
        onSubmit={handleSignup}
        className="backdrop-blur-md bg-white/30 shadow-xl rounded-2xl p-10 w-full max-w-md flex flex-col"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 font-serif">
          Create an Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-md text-xl font-semibold hover:text-blue-500 hover:bg-white hover:border-blue-500 hover:border-1 transition duration-300"
        >
          Sign Up
        </button>

        <div className="mt-5 text-center">
          <p className="text-gray-700 text-sm">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
