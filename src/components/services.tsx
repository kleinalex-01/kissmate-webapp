import { motion } from "motion/react";
import { HexagonBackground } from "./HexagonBackground";
import { FaSpa, FaRunning, FaBone, FaPhone } from "react-icons/fa";
import { useSEO } from "../hooks/useDocumentTitle";

interface ServiceCard {
  id: number;
  title: string;
  icon: React.ReactNode;
  benefits: string[];
  description: string;
  duration: string;
  priceFrom: string;
  priceValue?: number; // For structured data
  popular?: boolean;
  comingSoon?: boolean;
}

const servicesData: ServiceCard[] = [
  {
    id: 1,
    title: "Svéd Masszázs",
    icon: <FaSpa aria-hidden="true" />,
    benefits: ["Relaxáció", "Stresszoldás", "Vérkeringés", "Regeneráció"],
    description: "A klasszikus svéd masszázs lágy, áramló mozdulatokkal oldja a feszültséget és segíti a test természetes gyógyulási folyamatait.",
    duration: "30-50 perc",
    priceFrom: "6.500 Ft",
    priceValue: 6500,
    popular: true
  },
  {
    id: 2,
    title: "Sportmasszázs",
    icon: <FaRunning aria-hidden="true" />,
    benefits: ["Teljesítmény", "Regeneráció", "Sérülésmegelőzés", "Izomtónus"],
    description: "Speciálisan aktív életmódot élőknek és sportolóknak tervezett intenzív masszázs. Gyorsítja a regenerációt és fokozza a teljesítményt.",
    duration: "40-80 perc",
    priceFrom: "9.000 Ft",
    priceValue: 9000
  },
  {
    id: 3,
    title: "Csontkovácsolás",
    icon: <FaBone aria-hidden="true" />,
    benefits: ["Ízületek", "Gerinc", "Mobilitás", "Fájdalomcsillapítás"],
    description: "Hagyományos magyar csontkovácsolási technikák az ízületek és a gerinc egészségéért. Segít helyreállítani a test egyensúlyát.",
    duration: "Egyéni",
    priceFrom: "Hamarosan",
    comingSoon: true
  }
];

// Generate JSON-LD structured data for services
const generateStructuredData = () => {
  const services = servicesData.map((service, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "Person",
        "name": "Kiss Máté",
        "jobTitle": "Masszázsterapeuta"
      },
      "areaServed": {
        "@type": "City",
        "name": "Budapest"
      },
      ...(service.priceValue && {
        "offers": {
          "@type": "Offer",
          "price": service.priceValue,
          "priceCurrency": "HUF",
          "availability": service.comingSoon 
            ? "https://schema.org/PreOrder" 
            : "https://schema.org/InStock"
        }
      })
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Masszázs szolgáltatások Budapesten",
    "description": "Kiss Máté masszázsterapeuta szolgáltatásai",
    "itemListElement": services
  };
};

const Services = () => {
  useSEO({
    title: 'Szolgáltatások',
    description: 'Professzionális masszázs szolgáltatások Budapesten: svéd masszázs, sportmasszázs, hamarosan frissítő és wellness masszázs. Testre szabott kezelések az Ön igényei szerint.'
  });

  const structuredData = generateStructuredData();
  
  return (
    <main className="services">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HexagonBackground fixed={false} />
      <div className="services__container">
        <motion.header 
          className="services__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="services__title">Szolgáltatások</h1>
          <p className="services__subtitle">
            Fedezd fel a testre szabott masszázs élményt, amely segít visszanyerni az egyensúlyt és energiát
          </p>
        </motion.header>

        <div className="services__cards" role="list" aria-label="Elérhető masszázs szolgáltatások">
          {servicesData.map((service, index) => (
            <motion.article
              key={service.id}
              className={`services__card ${service.comingSoon ? 'services__card--coming-soon' : ''} ${service.popular ? 'services__card--popular' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15, ease: "easeOut" }}
              role="listitem"
              aria-labelledby={`service-title-${service.id}`}
            >
              <span className="services__card-number" aria-hidden="true">0{service.id}</span>
              
              {service.popular && (
                <div 
                  className="services__card-badge services__card-badge--popular" 
                  role="status" 
                  aria-label="Legnépszerűbb szolgáltatás"
                >
                  Legnépszerűbb
                </div>
              )}
              {service.comingSoon && (
                <div 
                  className="services__card-badge" 
                  role="status" 
                  aria-label="Hamarosan elérhető szolgáltatás"
                >
                  Hamarosan
                </div>
              )}
              
              <div className="services__card-icon-wrapper" aria-hidden="true">
                <div className="services__card-icon">
                  {service.icon}
                </div>
              </div>

              <div className="services__card-divider" aria-hidden="true"></div>

              <h2 id={`service-title-${service.id}`} className="services__card-title">{service.title}</h2>

              <ul className="services__card-benefits" aria-label={`${service.title} előnyei`}>
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="services__card-benefit">{benefit}</li>
                ))}
              </ul>

              <div className="services__card-divider" aria-hidden="true"></div>

              <p className="services__card-description">{service.description}</p>

              <dl className="services__card-info">
                <div className="services__card-duration">
                  <dt className="services__card-info-label">Időtartam</dt>
                  <dd className="services__card-info-value">{service.duration}</dd>
                </div>
                <div className="services__card-price">
                  <dt className="services__card-info-label">Ártól</dt>
                  <dd className="services__card-info-value">{service.priceFrom}</dd>
                </div>
              </dl>

              {!service.comingSoon && (
                <a 
                  href="tel:+36303517803" 
                  className="services__card-cta"
                  aria-label={`Időpontfoglalás ${service.title} masszázsra telefonon: 06 30 351 7803`}
                >
                  <FaPhone className="services__card-cta-icon" aria-hidden="true" />
                  <span>Időpontfoglalás</span>
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Services;