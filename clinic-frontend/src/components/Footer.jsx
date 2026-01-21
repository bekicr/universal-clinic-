import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPlusSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaPlusSquare className="text-xl" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Universal Medium Clinic
            </span>
          </Link>
          <p className="text-gray-400 leading-relaxed">
            Quality healthcare you can trust. We are dedicated to providing compassionate care and advanced medical services to our community.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-white text-xl transition transform hover:scale-110"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl transition transform hover:scale-110"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl transition transform hover:scale-110"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl transition transform hover:scale-110"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-primary inline-block pb-1">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">Home</Link></li>
            <li><Link to="/doctors" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">Find a Doctor</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">Services</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-primary inline-block pb-1">Services</h4>
          <ul className="space-y-3">
            <li><Link to="/services" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">General Medicine</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">Pediatrics</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">Gynecology</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">Laboratory</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-primary transition hover:translate-x-1 inline-block">Emergency Care</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-primary inline-block pb-1">Contact Us</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">A:</span>
              <span>Eteya, in front of Coop Bank</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">P:</span>
              <span>+251 91 234 5678</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">E:</span>
              <span>info@umclinic.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Universal Medium Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
