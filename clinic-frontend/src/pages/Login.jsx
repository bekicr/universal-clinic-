import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      // Redirect based on role is handled in component or we can check user here.
      // But useAuth updates state asynchronously. 
      // We can rely on Navbar or useEffect to redirect, OR we assume login sets state.
      // Better to just navigate to home or dashboard. 
      // Actually, after login, we might want to go to dashboard.
      // Let's go to home for now, or check role if possible.
      // Since login is async and returns nothing, we can just navigate.
      // Ideally login function returns user or we await it.
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
