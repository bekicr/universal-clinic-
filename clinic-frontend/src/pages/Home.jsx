import { Link } from 'react-router-dom';
import { FaUserMd, FaStethoscope, FaHospital, FaClock, FaPhone, FaMapMarkerAlt, FaMicroscope, FaBaby, FaAmbulance, FaHeartbeat } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/30"></div>
        </div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 relative z-10 text-white"
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
              Universal Medium Clinic
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light border-l-4 border-primary pl-6">
              Compassionate care. Advanced medicine. Trusted professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/book-appointment" 
                className="bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl text-center"
              >
                Book Appointment
              </Link>
              <Link 
                to="/doctors" 
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-4 px-8 rounded-full transition transform hover:-translate-y-1 text-center backdrop-blur-sm"
              >
                Find a Doctor
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 container mx-auto px-6 -mt-20 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { title: "Experienced Doctors", icon: <FaUserMd />, desc: "Top-tier medical professionals dedicated to your health." },
            { title: "Modern Equipment", icon: <FaMicroscope />, desc: "Advanced technology for accurate diagnosis and treatment." },
            { title: "Patient-Centered", icon: <FaHeartbeat />, desc: "Care plans tailored specifically to your individual needs." },
            { title: "Accessible Location", icon: <FaMapMarkerAlt />, desc: "Conveniently located in Eteya, right in front of Coop Bank." }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-primary"
            >
              <div className="text-4xl text-primary mb-6 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Our Specialties</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Comprehensive Medical Services</h2>
            <p className="text-gray-600 mt-4 text-lg">We offer a wide range of medical services to ensure your health is always in good hands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
             {[
               { title: "General Medicine", icon: <FaUserMd />, desc: "Primary care for all ages." },
               { title: "Pediatrics", icon: <FaBaby />, desc: "Care for infants & children." },
               { title: "Gynecology", icon: <FaStethoscope />, desc: "Women's health services." },
               { title: "Laboratory", icon: <FaMicroscope />, desc: "Accurate & fast results." },
               { title: "Emergency", icon: <FaAmbulance />, desc: "24/7 critical care." }
             ].map((service, index) => (
               <div key={index} className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-100">
                 <div className="text-3xl text-gray-400 group-hover:text-primary mb-4 transition-colors">
                   {service.icon}
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                 <p className="text-sm text-gray-500">{service.desc}</p>
               </div>
             ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="text-primary font-bold hover:text-blue-700 flex items-center justify-center gap-2 transition">
              View All Services <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">Our Team</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Meet Our Doctors</h2>
            </div>
            <Link to="/doctors" className="hidden md:block bg-white text-primary border border-gray-200 hover:border-primary font-bold py-3 px-6 rounded-full shadow-sm hover:shadow-md transition">
              View All Doctors
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Static Doctor Cards for Preview */}
            {[
              { name: "Dr. Sarah Johnson", specialty: "Cardiologist", avail: "Available Today" },
              { name: "Dr. Mark Williams", specialty: "Pediatrician", avail: "Next Slot: 2 PM" },
              { name: "Dr. Emily Chen", specialty: "Neurologist", avail: "Available Tomorrow" },
              { name: "Dr. James Wilson", specialty: "General Practitioner", avail: "Available Today" }
            ].map((doc, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                   {/* Avatar Placeholder */}
                   <div className="absolute inset-0 flex items-center justify-center bg-blue-100 text-blue-300">
                     <FaUserMd className="text-6xl" />
                   </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                  </div>
                  <p className="text-primary font-medium mb-4">{doc.specialty}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      {doc.avail}
                    </span>
                    <button className="text-gray-500 hover:text-primary font-semibold text-sm transition">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 md:hidden text-center">
             <Link to="/doctors" className="bg-white text-primary border border-gray-200 font-bold py-3 px-6 rounded-full shadow-sm hover:shadow-md transition inline-block">
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-blue-600 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Visit Universal Medium Clinic</h2>
              <p className="text-blue-100 mb-8 text-lg">
                We are conveniently located to serve you better. Drop by or contact us for any inquiries.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Address</h4>
                    <p className="text-blue-100">Eteya, in front of Coop Bank</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Phone</h4>
                    <p className="text-blue-100">+251 91 234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Opening Hours</h4>
                    <p className="text-blue-100">Mon - Sat: 8:00 AM - 8:00 PM</p>
                    <p className="text-blue-200 text-sm">Sunday: Emergency Only</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-gray-200 min-h-[400px] relative">
               {/* Google Map Placeholder */}
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15839.062253245005!2d39.2274!3d7.9654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTcnNTUuNCJOIDM5wrAxMyczOC42IkU!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy"
                 title="Clinic Location"
                 className="absolute inset-0"
               ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
