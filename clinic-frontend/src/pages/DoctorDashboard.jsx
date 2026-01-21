import { useState, useEffect } from 'react';
import api from '../services/api';
import { FaCalendarCheck, FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorProfile, setDoctorProfile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileRes = await api.get('/doctors/profile/me');
      setDoctorProfile(profileRes.data);

      if (profileRes.data.status === 'approved') {
        const apptRes = await api.get('/appointments');
        setAppointments(apptRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      setAppointments(appointments.map(appt => 
        appt._id === id ? { ...appt, status } : appt
      ));
      alert(`Appointment ${status}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!doctorProfile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Error loading profile</h2>
      </div>
    );
  }

  if (doctorProfile.status === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaClock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Pending Approval</h2>
          <p className="text-gray-600">
            Thank you for registering. Your account is currently under review by our administrators.
            <br />
            You will receive access to your dashboard once your application is approved.
          </p>
        </div>
      </div>
    );
  }

  if (doctorProfile.status === 'rejected') {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTimes size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Rejected</h2>
          <p className="text-gray-600">
            We regret to inform you that your application to join Universal Clinic has been rejected.
            Please contact support for more information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <FaCalendarCheck className="text-primary" /> Doctor Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome, Dr. {doctorProfile.name}. Manage your patient appointments and schedule.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Appointment Requests</h2>
          </div>

          {appointments.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No appointments found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {appointments.map((appt) => (
                <div key={appt._id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{appt.patientId?.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                        appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex items-center gap-2">
                        <FaClock className="text-primary" /> 
                        {new Date(appt.appointmentDate).toLocaleString()}
                      </p>
                      <p><strong>Reason:</strong> {appt.reason || 'No reason provided'}</p>
                      <p><strong>Contact:</strong> {appt.patientId?.phone || 'N/A'} | {appt.patientId?.email}</p>
                    </div>
                  </div>

                  {appt.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateStatus(appt._id, 'confirmed')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition shadow-sm"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        onClick={() => updateStatus(appt._id, 'cancelled')}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition shadow-sm"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
