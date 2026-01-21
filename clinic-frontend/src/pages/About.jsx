import { FaHospital, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="container mx-auto px-4 space-y-16">
      {/* Intro */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Universal Medium Clinic</h1>
        <p className="text-xl text-gray-600">
          Since 1995, we have been dedicated to providing exceptional healthcare services to our community. 
          Our mission is to improve the health and well-being of the people we serve through compassion, excellence, and innovation.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-blue-50 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To provide high-quality, patient-centered care that is accessible, affordable, and effective. 
            We strive to treat every patient with dignity and respect, ensuring their comfort and trust in our services.
          </p>
        </div>
        <div className="bg-green-50 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-secondary mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To be the leading healthcare provider in the region, known for clinical excellence and a commitment to 
            holistic wellness. We aim to pioneer new standards in medical care and patient experience.
          </p>
        </div>
      </div>

      {/* Stats/Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
         <div className="p-6">
            <FaHospital className="text-5xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-gray-900 mb-2">25+</h3>
            <p className="text-gray-600">Years of Service</p>
         </div>
         <div className="p-6">
            <FaUsers className="text-5xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600">Professional Staff</p>
         </div>
         <div className="p-6">
            <FaHandHoldingHeart className="text-5xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-gray-900 mb-2">10k+</h3>
            <p className="text-gray-600">Happy Patients</p>
         </div>
      </div>

      {/* Values */}
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {['Integrity', 'Compassion', 'Excellence', 'Innovation'].map((val, idx) => (
             <div key={idx} className="bg-gray-50 p-6 rounded-xl text-center">
               <h3 className="text-xl font-bold text-gray-800">{val}</h3>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default About;
