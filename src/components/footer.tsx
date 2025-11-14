import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "motion/react";

const Footer = () => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const handleCertClick = (certPath: string) => {
    setSelectedCert(certPath);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__content">
          {/* Brand & Contact */}
          <div className="footer__info">
            <h3 className="footer__brand-name">Kiss Máté</h3>
            <p className="footer__brand-title">Masszázsterapeuta</p>
            
            <div className="footer__contact">
              <a href="tel:+36301234567" className="footer__contact-link">
                <FaPhone className="footer__contact-icon" />
                +36 30 123 4567
              </a>
              <a href="mailto:info@kissmate.hu" className="footer__contact-link">
                <FaEnvelope className="footer__contact-icon" />
                info@kissmate.hu
              </a>
              <span className="footer__contact-text">
                <FaMapMarkerAlt className="footer__contact-icon" />
                Budapest, Magyarország
              </span>
            </div>
          </div>

          {/* Certifications */}
          <div className="footer__certifications-wrapper">
            <div className="footer__certifications">
              <div 
                className="footer__certification-item"
                onClick={() => handleCertClick("/pictures/kissmate-tanusitvany1.jpg")}
              >
                <img
                  src="/pictures/kissmate-tanusitvany1.jpg"
                  alt="Masszázs terapeuta tanúsítvány 1"
                  className="footer__certification-image"
                />
              </div>
              <div 
                className="footer__certification-item"
                onClick={() => handleCertClick("/pictures/kissmate-tanusitvany2.jpg")}
              >
                <img
                  src="/pictures/kissmate-tanusitvany2.jpg"
                  alt="Masszázs terapeuta tanúsítvány 2"
                  className="footer__certification-image"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="footer__nav">
            <a href="/" className="footer__nav-link">Kezdőlap</a>
            <a href="/services" className="footer__nav-link">Szolgáltatások</a>
            <a href="/prices" className="footer__nav-link">Árak</a>
            <a href="/contact" className="footer__nav-link">Kapcsolat</a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="footer__bottom">
          <p>&copy; 2025 Kiss Máté. Minden jog fenntartva.</p>
        </div>
      </div>

      {/* Certification Modal */}
      {selectedCert && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer'
          }}
          onClick={handleCloseModal}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              cursor: 'default'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#d4af37',
                color: 'white',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '24px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onClick={handleCloseModal}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#c49b2e';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#d4af37';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
            <img 
              src={selectedCert} 
              alt="Tanúsítvány" 
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </motion.footer>
  );
};

export default Footer;