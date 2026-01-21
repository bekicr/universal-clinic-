import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserMd, FaClock, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        password: ''
      });
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments');
      // Sort by date descending
      data.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
      setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...profileForm };
      if (!payload.password) delete payload.password; // Don't send empty password

      await api.put('/auth/profile', payload);
      alert('Profile updated successfully!');
      setEditingProfile(false);
      window.location.reload(); // Simple reload to refresh auth context (or could update context)
    } catch (err) {
      alert('Failed to update profile');
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const upcomingAppointments = appointments.filter(a => new Date(a.appointmentDate) > new Date() && a.status !== 'cancelled');
  const pastAppointments = appointments.filter(a => new Date(a.appointmentDate) <= new Date() || a.status === 'cancelled');

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
           <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Link to="/book-appointment" className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          Book New Appointment
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
              <button 
                onClick={() => setEditingProfile(!editingProfile)}
                className="text-primary hover:text-blue-700 transition"
              >
                {editingProfile ? <FaTimes /> : <FaEdit />}
              </button>
            </div>
            
            {editingProfile ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+251..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">New Password (Optional)</label>
                  <input
                    type="password"
                    value={profileForm.password}
                    onChange={(e) => setProfileForm({...profileForm, password: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Leave blank to keep current"
                  />
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition shadow-md">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full text-primary">
                    <FaUserMd />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Name</span>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full text-primary">
                    <span className="font-bold">@</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Email</span>
                    <p className="font-semibold text-gray-900 break-all">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full text-primary">
                    <span className="font-bold">#</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Phone</span>
                    <p className="font-semibold text-gray-900">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2">
           <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
             <div className="flex border-b border-gray-100">
               <button 
                 className={`flex-1 py-4 font-bold text-center transition ${activeTab === 'upcoming' ? 'text-primary border-b-2 border-primary bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}
                 onClick={() => setActiveTab('upcoming')}
               >
                 Upcoming Appointments ({upcomingAppointments.length})
               </button>
               <button 
                 className={`flex-1 py-4 font-bold text-center transition ${activeTab === 'history' ? 'text-primary border-b-2 border-primary bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}
                 onClick={() => setActiveTab('history')}
               >
                 Appointment History ({pastAppointments.length})
               </button>
             </div>

             <div className="p-6">
               {loading ? (
                 <div className="text-center py-8 text-gray-500">Loading appointments...</div>
               ) : (activeTab === 'upcoming' ? upcomingAppointments : pastAppointments).length === 0 ? (
                 <div className="text-center py-12">
                   <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                     <FaCalendarAlt className="text-gray-400 text-2xl" />
                   </div>
                   <p className="text-gray-500 mb-4">No {activeTab} appointments found.</p>
                   {activeTab === 'upcoming' && (
                     <Link to="/book-appointment" className="text-primary font-bold hover:underline">
                       Book now &rarr;
                     </Link>
                   )}
                 </div>
               ) : (
                 <div className="space-y-4">
                   {(activeTab === 'upcoming' ? upcomingAppointments : pastAppointments).map(appt => (
                     <div key={appt._id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition group">
                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <div className="flex items-start gap-4">
                           <div className="bg-blue-50 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                             <FaCalendarAlt className="text-xl" />
                           </div>
                           <div>
                             <h3 className="font-bold text-lg text-gray-900">{appt.doctorId?.name || 'Unknown Doctor'}</h3>
                             <p className="text-primary text-sm font-medium flex items-center gap-2 mb-1">
                               <FaUserMd /> {appt.doctorId?.specialty || 'General'}
                             </p>
                             <div className="text-gray-500 text-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                               <span className="flex items-center gap-1"><FaClock className="text-gray-400" /> {formatDate(appt.appointmentDate)}</span>
                             </div>
                             {appt.reason && (
                               <div className="mt-2 bg-gray-50 p-2 rounded text-sm text-gray-600 border-l-2 border-primary">
                                 <span className="font-bold text-xs uppercase text-gray-400 block mb-1">Reason for Visit</span>
                                 "{appt.reason}"
                               </div>
                             )}
                           </div>
                         </div>
                         <div className="self-end md:self-center">
                           <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize border ${getStatusColor(appt.status)} flex items-center gap-2`}>
                             {appt.status === 'confirmed' && <FaCheck />}
                             {appt.status === 'cancelled' && <FaTimes />}
                             {appt.status === 'pending' && <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>}
                             {appt.status}
                           </span>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
