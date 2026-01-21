import { FaUserMd, FaStethoscope, FaHeartbeat, FaVial, FaAmbulance, FaTooth } from 'react-icons/fa';

const Services = () => {
  const services = [
    { title: "General Medicine", icon: <FaUserMd />, desc: "Comprehensive health checkups and primary care for all ages." },
    { title: "Pediatrics", icon: <FaStethoscope />, desc: "Expert care for your little ones, from newborns to adolescents." },
    { title: "Gynecology", icon: <FaHeartbeat />, desc: "Women's health services including prenatal and postnatal care." },
    { title: "Laboratory Services", icon: <FaVial />, desc: "Advanced diagnostic testing and pathology services." },
    { title: "Emergency Care", icon: <FaAmbulance />, desc: "24/7 emergency response and critical care unit." },
    { title: "Dental Care", icon: <FaTooth />, desc: "Complete dental services including cleaning, fillings, and surgery." },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We offer a wide range of medical services to ensure you receive the best care possible under one roof.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-4xl text-primary mb-6">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
