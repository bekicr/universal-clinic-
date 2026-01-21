import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
             <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="bg-blue-100 p-3 rounded-full text-primary"><FaMapMarkerAlt className="text-xl" /></div>
                   <div>
                      <h4 className="font-bold text-gray-900">Address</h4>
                      <p className="text-gray-600">123 Medical Plaza, Health City, HC 90210</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-green-100 p-3 rounded-full text-secondary"><FaPhone className="text-xl" /></div>
                   <div>
                      <h4 className="font-bold text-gray-900">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-teal-100 p-3 rounded-full text-accent"><FaEnvelope className="text-xl" /></div>
                   <div>
                      <h4 className="font-bold text-gray-900">Email</h4>
                      <p className="text-gray-600">info@umclinic.com</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-gray-100 p-3 rounded-full text-gray-600"><FaClock className="text-xl" /></div>
                   <div>
                      <h4 className="font-bold text-gray-900">Opening Hours</h4>
                      <p className="text-gray-600">Mon - Fri: 8:00 AM - 8:00 PM</p>
                      <p className="text-gray-600">Sat - Sun: 9:00 AM - 5:00 PM</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-full min-h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-md">
           {/* Google Maps Embed Placeholder */}
           <iframe 
             title="Google Map"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d341f37e4c0!2sFlinders%20Street%20Station!5e0!3m2!1sen!2sus!4v1629876543210!5m2!1sen!2sus" 
             width="100%" 
             height="100%" 
             style={{ border: 0, minHeight: '400px' }} 
             allowFullScreen="" 
             loading="lazy"
           ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
