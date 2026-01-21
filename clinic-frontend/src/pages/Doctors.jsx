import { useState, useEffect } from 'react';
import api from '../services/api';
import { FaUserMd, FaCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get('/doctors');
        setDoctors(data);
      } catch (err) {
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.specialty.toLowerCase().includes(filter.toLowerCase()) ||
    doc.name.toLowerCase().includes(filter.toLowerCase())
  );

  const specialties = [...new Set(doctors.map(d => d.specialty))];

  if (loading) return <div className="text-center py-20">Loading doctors...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Doctors</h1>
      
      {/* Filter */}
      <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4">
        <input 
          type="text" 
          placeholder="Search by name or specialty..." 
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-primary"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select 
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="">All Specialties</option>
          {specialties.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map(doctor => (
          <div key={doctor._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 flex flex-col">
            <div className="bg-gray-100 h-48 flex items-center justify-center">
              <FaUserMd className="text-6xl text-gray-400" />
            </div>
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
              <p className="text-primary font-medium mb-4">{doctor.specialty}</p>
              <div className="text-sm text-gray-500 mb-6">
                <span className="font-semibold text-gray-700">Availability:</span> {doctor.availability}
              </div>
            </div>
            <div className="p-6 pt-0 mt-auto">
               <Link 
                 to={`/book-appointment?doctor=${doctor._id}`}
                 className="block w-full text-center bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
               >
                 <FaCalendarCheck /> Book Appointment
               </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredDoctors.length === 0 && (
        <div className="text-center text-gray-500 mt-12">No doctors found matching your criteria.</div>
      )}
    </div>
  );
};

export default Doctors;
