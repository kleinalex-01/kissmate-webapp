import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { HexagonBackground } from "./HexagonBackground";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaUser, FaComment, FaExclamationCircle } from "react-icons/fa";
import { useSEO } from "../hooks/useDocumentTitle";

// Web3Forms access key from environment variable
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// Validation helpers
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  // Hungarian phone format: +36, 06, or just numbers with optional spaces/dashes
  const phoneRegex = /^(\+36|06)?[\s-]?(\d{1,2})[\s-]?(\d{3})[\s-]?(\d{3,4})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const Contact = () => {
  useSEO({
    title: 'Kapcsolat',
    description: 'Vegye fel a kapcsolatot Kiss Máté masszázsterapeutával Budapesten. Időpontfoglalás telefonon: 06 30 351 7803 vagy email: kmmasszazs@gmail.com'
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "" // Spam protection
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Validate a single field
  const validateField = useCallback((name: string, value: string): string | undefined => {
    const trimmedValue = value.trim();
    
    switch (name) {
      case "name":
        if (!trimmedValue) return "A név megadása kötelező";
        if (trimmedValue.length < 2) return "A név legalább 2 karakter legyen";
        if (trimmedValue.length > 100) return "A név maximum 100 karakter lehet";
        return undefined;
      
      case "email":
        if (!trimmedValue) return "Az email megadása kötelező";
        if (!validateEmail(trimmedValue)) return "Érvénytelen email formátum";
        return undefined;
      
      case "phone":
        if (trimmedValue && !validatePhone(trimmedValue)) {
          return "Érvénytelen telefonszám formátum";
        }
        return undefined;
      
      case "message":
        if (!trimmedValue) return "Az üzenet megadása kötelező";
        if (trimmedValue.length < 10) return "Az üzenet legalább 10 karakter legyen";
        if (trimmedValue.length > 2000) return "Az üzenet maximum 2000 karakter lehet";
        return undefined;
      
      default:
        return undefined;
    }
  }, []);

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const phoneError = validateField("phone", formData.phone);
    const messageError = validateField("message", formData.message);
    
    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (phoneError) newErrors.phone = phoneError;
    if (messageError) newErrors.message = messageError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing (if field was touched)
    if (touched[name] && errors[name as keyof FormErrors]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      setSubmitStatus("success"); // Fake success for bots
      return;
    }
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true, message: true });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Új üzenet a weboldalról: ${formData.name.trim()}`,
          from_name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || "Nem adott meg telefonszámot",
          message: formData.message.trim(),
          // Redirect to thank you page (optional)
          redirect: false
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "", honeypot: "" });
        setTouched({});
        setErrors({});
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  // Check if form is valid for submit button state
  const isFormValid = formData.name.trim().length >= 2 && 
                      validateEmail(formData.email.trim()) && 
                      formData.message.trim().length >= 10 &&
                      (!formData.phone.trim() || validatePhone(formData.phone.trim()));

  return (
    <div className="contact">
      <HexagonBackground fixed={false} />
      <div className="contact__container">
        <motion.div 
          className="contact__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="contact__title">Kapcsolat</h1>
          <p className="contact__subtitle">
            Vedd fel velem a kapcsolatot időpontfoglaláshoz vagy kérdéseid megválaszolásához
          </p>
        </motion.div>

        <div className="contact__content">
          {/* Contact Info & Phone CTA */}
          <motion.div 
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <div className="contact__info-card">
              <h2 className="contact__info-title">Elérhetőségek</h2>
              
              <div className="contact__info-items">
                <div className="contact__info-item">
                  <div className="contact__info-icon" aria-hidden="true">
                    <FaPhone />
                  </div>
                  <div className="contact__info-content">
                    <h3>Telefon</h3>
                    <p>06 30 351 7803</p>
                  </div>
                </div>

                <div className="contact__info-item">
                  <div className="contact__info-icon" aria-hidden="true">
                    <FaEnvelope />
                  </div>
                  <div className="contact__info-content">
                    <h3>Email</h3>
                    <p>kmmasszazs@gmail.com</p>
                  </div>
                </div>

                <div className="contact__info-item">
                  <div className="contact__info-icon" aria-hidden="true">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact__info-content">
                    <h3>Helyszín</h3>
                    <p>Budapest és környéke<br />Kiszállással</p>
                  </div>
                </div>
              </div>

              {/* Phone CTA Button */}
              <a href="tel:+36303517803" className="contact__phone-cta" aria-label="Telefonos időpontfoglalás: 06 30 351 7803">
                <FaPhone className="contact__phone-cta-icon" aria-hidden="true" />
                <span>Hívj most!</span>
              </a>

              <p className="contact__info-note">
                Telefonon elérhető vagyok hétfőtől szombatig, 9:00-18:00 között.
              </p>
            </div>
          </motion.div>

          {/* Email Form */}
          <motion.div 
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <div className="contact__form-card">
              <h2 className="contact__form-title">Üzenj nekem</h2>
              <p className="contact__form-subtitle">
                Töltsd ki az alábbi űrlapot és hamarosan felveszem veled a kapcsolatot.
              </p>

              <form onSubmit={handleSubmit} className="contact__form">
                {/* Honeypot field - hidden from users, catches bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="contact__form-group">
                  <label htmlFor="name" className="contact__form-label">
                    <FaUser className="contact__form-label-icon" aria-hidden="true" />
                    Név *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="A neved"
                    autoComplete="name"
                    className={`contact__form-input ${touched.name && errors.name ? 'contact__form-input--error' : ''}`}
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {touched.name && errors.name && (
                    <span id="name-error" className="contact__form-error" role="alert">
                      <FaExclamationCircle aria-hidden="true" /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="contact__form-group">
                  <label htmlFor="email" className="contact__form-label">
                    <FaEnvelope className="contact__form-label-icon" aria-hidden="true" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="email@pelda.hu"
                    autoComplete="email"
                    className={`contact__form-input ${touched.email && errors.email ? 'contact__form-input--error' : ''}`}
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {touched.email && errors.email && (
                    <span id="email-error" className="contact__form-error" role="alert">
                      <FaExclamationCircle aria-hidden="true" /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="contact__form-group">
                  <label htmlFor="phone" className="contact__form-label">
                    <FaPhone className="contact__form-label-icon" aria-hidden="true" />
                    Telefonszám (opcionális)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+36 30 123 4567"
                    autoComplete="tel"
                    className={`contact__form-input ${touched.phone && errors.phone ? 'contact__form-input--error' : ''}`}
                    aria-invalid={touched.phone && !!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {touched.phone && errors.phone && (
                    <span id="phone-error" className="contact__form-error" role="alert">
                      <FaExclamationCircle aria-hidden="true" /> {errors.phone}
                    </span>
                  )}
                </div>

                <div className="contact__form-group">
                  <label htmlFor="message" className="contact__form-label">
                    <FaComment className="contact__form-label-icon" aria-hidden="true" />
                    Üzenet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Írd le, miben segíthetek... (minimum 10 karakter)"
                    rows={5}
                    className={`contact__form-textarea ${touched.message && errors.message ? 'contact__form-input--error' : ''}`}
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {touched.message && errors.message && (
                    <span id="message-error" className="contact__form-error" role="alert">
                      <FaExclamationCircle aria-hidden="true" /> {errors.message}
                    </span>
                  )}
                  <span className="contact__form-char-count" aria-live="polite">
                    {formData.message.length}/2000
                  </span>
                </div>

                <button 
                  type="submit" 
                  className={`contact__form-submit ${isSubmitting ? 'contact__form-submit--loading' : ''} ${!isFormValid ? 'contact__form-submit--disabled' : ''}`}
                  disabled={isSubmitting || !isFormValid}
                >
                  {isSubmitting ? (
                    <span>Küldés...</span>
                  ) : (
                    <>
                      <FaPaperPlane className="contact__form-submit-icon" aria-hidden="true" />
                      <span>Üzenet küldése</span>
                    </>
                  )}
                </button>

                {/* Status messages with aria-live for screen readers */}
                <div aria-live="polite" aria-atomic="true">
                  {submitStatus === "success" && (
                    <div className="contact__form-status contact__form-status--success" role="alert">
                      ✓ Üzenet sikeresen elküldve! Hamarosan válaszolok.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="contact__form-status contact__form-status--error" role="alert">
                      ✕ Hiba történt. Kérlek próbáld újra, vagy hívj telefonon.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;