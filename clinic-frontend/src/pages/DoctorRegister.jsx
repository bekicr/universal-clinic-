import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserMd, FaFileUpload } from 'react-icons/fa';
import api from '../services/api';

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialty: '',
    age: '',
    experience: '',
    gender: 'Male',
    education: '',
    bio: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (file) {
        data.append('educationFile', file);
      }

      await api.post('/doctors/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Registration successful! Please wait for admin approval.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-primary py-6 px-8">
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <FaUserMd /> Join as a Doctor
          </h2>
          <p className="text-blue-100 mt-2">Complete your profile to join our medical team.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Personal Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" name="phone" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input type="number" name="age" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select name="gender" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Professional Details</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700">Specialty</label>
                <select name="specialty" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange}>
                  <option value="">Select Specialty</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input type="number" name="experience" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Education (Degree/University)</label>
                <input type="text" name="education" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Educational Certificate</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer bg-gray-50">
                  <div className="space-y-1 text-center">
                    <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-600 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="file-upload" name="educationFile" type="file" className="sr-only" onChange={handleFileChange} required />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                    {file && <p className="text-sm font-bold text-green-600 mt-2">{file.name}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio (Optional)</label>
            <textarea name="bio" rows="3" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" onChange={handleChange}></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition transform hover:-translate-y-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default DoctorRegister;
