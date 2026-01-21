import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaCheck, FaTimes, FaClock, FaUserMd, FaCalendarAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('doctors');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'doctors') {
        const res = await api.get('/doctors/admin/pending');
        setPendingDoctors(res.data);
      } else {
        const res = await api.get('/appointments');
        setAppointments(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorStatus = async (id, status) => {
    try {
      await api.put(`/doctors/admin/${id}/status`, { status });
      setPendingDoctors(pendingDoctors.filter(doc => doc._id !== id));
      alert(`Doctor ${status} successfully`);
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`pb-4 px-4 font-bold text-lg transition ${
              activeTab === 'doctors' 
                ? 'text-primary border-b-4 border-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Doctor Requests
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-4 px-4 font-bold text-lg transition ${
              activeTab === 'appointments' 
                ? 'text-primary border-b-4 border-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All Appointments
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {activeTab === 'doctors' && (
              <div className="space-y-6">
                {pendingDoctors.length === 0 ? (
                  <p className="text-gray-500 text-lg">No pending doctor approvals.</p>
                ) : (
                  pendingDoctors.map((doc) => (
                    <div key={doc._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded uppercase">Pending</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                          <p><span className="font-semibold">Specialty:</span> {doc.specialty}</p>
                          <p><span className="font-semibold">Experience:</span> {doc.experience} years</p>
                          <p><span className="font-semibold">Education:</span> {doc.education}</p>
                          <p><span className="font-semibold">Email:</span> {doc.email}</p>
                          <p><span className="font-semibold">Phone:</span> {doc.phone}</p>
                          <p><span className="font-semibold">Age/Gender:</span> {doc.age} / {doc.gender}</p>
                        </div>
                        {doc.educationFile && (
                          <a 
                            href={`http://localhost:5001/${doc.educationFile}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-block mt-3 text-primary hover:underline text-sm font-bold"
                          >
                            View Educational Certificate
                          </a>
                        )}
                      </div>
                      
                      <div className="flex gap-3 w-full md:w-auto">
                        <button
                          onClick={() => handleDoctorStatus(doc._id, 'approved')}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold transition shadow-sm"
                        >
                          <FaCheck /> Approve
                        </button>
                        <button
                          onClick={() => handleDoctorStatus(doc._id, 'rejected')}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold transition shadow-sm"
                        >
                          <FaTimes /> Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Doctor</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appt) => (
                      <tr key={appt._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{appt.patientId?.name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{appt.patientId?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{appt.doctorId?.name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{appt.doctorId?.specialty}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(appt.appointmentDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${appt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              appt.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {appt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
