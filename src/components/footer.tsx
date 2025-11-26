import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "motion/react";

const Footer = () => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const handleCertClick = (certPath: string) => {
    setSelectedCert(certPath);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedCert(null);
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCert) {
        handleCloseModal();
      }
    };

    if (selectedCert) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert, handleCloseModal]);

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
              <a href="tel:+36303517803" className="footer__contact-link" aria-label="Telefon: 06 30 351 7803">
                <FaPhone className="footer__contact-icon" aria-hidden="true" />
                06 30 351 7803
              </a>
              <a href="mailto:kmmasszazs@gmail.com" className="footer__contact-link" aria-label="Email: kmmasszazs@gmail.com">
                <FaEnvelope className="footer__contact-icon" aria-hidden="true" />
                kmmasszazs@gmail.com
              </a>
              <span className="footer__contact-text">
                <FaMapMarkerAlt className="footer__contact-icon" aria-hidden="true" />
                Budapest, Magyarország
              </span>
            </div>
          </div>

          {/* Certifications */}
          <div className="footer__certifications-wrapper">
            <div className="footer__certifications" role="group" aria-label="Tanúsítványok">
              <button 
                type="button"
                className="footer__certification-item"
                onClick={() => handleCertClick("/pictures/kissmate-tanusitvany1.jpg")}
                aria-label="Masszázs terapeuta tanúsítvány 1 megnyitása"
              >
                <img
                  src="/pictures/kissmate-tanusitvany1.jpg"
                  alt="Masszázs terapeuta tanúsítvány 1"
                  className="footer__certification-image"
                />
              </button>
              <button 
                type="button"
                className="footer__certification-item"
                onClick={() => handleCertClick("/pictures/kissmate-tanusitvany2.jpg")}
                aria-label="Masszázs terapeuta tanúsítvány 2 megnyitása"
              >
                <img
                  src="/pictures/kissmate-tanusitvany2.jpg"
                  alt="Masszázs terapeuta tanúsítvány 2"
                  className="footer__certification-image"
                />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="footer__nav" aria-label="Lábléc navigáció">
            <Link to="/" className="footer__nav-link">Kezdőlap</Link>
            <Link to="/services" className="footer__nav-link">Szolgáltatások</Link>
            <Link to="/prices" className="footer__nav-link">Árak</Link>
            <Link to="/contact" className="footer__nav-link">Kapcsolat</Link>
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
          role="dialog"
          aria-modal="true"
          aria-label="Tanúsítvány megtekintése"
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
          onKeyDown={(e) => {
            if (e.key === "Escape") handleCloseModal();
          }}
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
              type="button"
              aria-label="Bezárás"
              autoFocus
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
              <span aria-hidden="true">×</span>
            </button>
            <img 
              src={selectedCert} 
              alt="Tanúsítvány nagyított nézet" 
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