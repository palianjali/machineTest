import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [initial, setInitial] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name'); // Save this during login
    if (name) setInitial(name.charAt(0).toUpperCase());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
      <div className="text-2xl font-bold">🍲 Recipe App</div>
      {isLoggedIn && (
        <div className="flex items-center gap-6">
          <Link to="/all-recipe" className="hover:underline">Home</Link>
          <Link to="/add-recipe" className="hover:underline">Add Recipe</Link>
          <Link to="/my-recipes" className="hover:underline">My Recipes</Link>
          <button onClick={handleLogout} className="hover:underline">Logout</button>
          <div className="w-8 h-8 rounded-full bg-white text-blue-600 font-bold flex items-center justify-center">
            {initial}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
