import { motion } from "motion/react";
import { HexagonBackground } from "./HexagonBackground";
import { FaSpa, FaRunning, FaBone, FaClock, FaTicketAlt, FaCar, FaHandPaper } from "react-icons/fa";
import { useSEO } from "../hooks/useDocumentTitle";

interface PriceOption {
  duration: string;
  price: string;
  priceValue: number; // For structured data
  label?: string;
}

interface MembershipOption {
  sessions: string;
  price: string;
  priceValue: number; // For structured data
  savings?: string;
}

interface PriceCard {
  id: number;
  title: string;
  icon: React.ReactNode;
  prices: PriceOption[];
  detailedPrices?: PriceOption[];
  memberships?: MembershipOption[];
  note?: string;
  comingSoon?: boolean;
  comingSoonDate?: string;
}

interface CallOutFee {
  persons: string;
  price: string;
}

const callOutFees: CallOutFee[] = [
  { persons: "4 fő alatt", price: "220 Ft/km" },
  { persons: "4 fő felett", price: "175 Ft/km" }
];

const pricesData: PriceCard[] = [
  {
    id: 1,
    title: "Svéd Masszázs",
    icon: <FaSpa aria-hidden="true" />,
    prices: [
      { duration: "30 perc", price: "6.500 Ft", priceValue: 6500 },
      { duration: "50 perc", price: "10.000 Ft", priceValue: 10000 }
    ],
    detailedPrices: [
      { duration: "80 perc", price: "13.500 Ft", priceValue: 13500, label: "Egész test" },
      { duration: "50 perc", price: "9.000 Ft", priceValue: 9000, label: "Teljes hát" },
      { duration: "50 perc", price: "9.000 Ft", priceValue: 9000, label: "Teljes láb" },
      { duration: "30 perc", price: "6.500 Ft", priceValue: 6500, label: "Trapéz / Vádli / Váll / Kar" }
    ],
    memberships: [
      { sessions: "5 alkalom (5 óra)", price: "55.000 Ft", priceValue: 55000, savings: "5.000 Ft megtakarítás" },
      { sessions: "10 alkalom (10 óra)", price: "100.000 Ft", priceValue: 100000, savings: "10.000 Ft megtakarítás" }
    ]
  },
  {
    id: 2,
    title: "Sportmasszázs",
    icon: <FaRunning aria-hidden="true" />,
    prices: [
      { duration: "40-80 perc", price: "9.000-18.000 Ft", priceValue: 9000 }
    ],
    memberships: [
      { sessions: "5 alkalom (5 óra)", price: "62.500 Ft", priceValue: 62500, savings: "7.500 Ft megtakarítás" },
      { sessions: "10 alkalom (10 óra)", price: "115.000 Ft", priceValue: 115000, savings: "15.000 Ft megtakarítás" }
    ],
    note: "Az időtartam egyéni felmérés alapján alakul"
  },
  {
    id: 3,
    title: "Csontkovácsolás",
    icon: <FaBone aria-hidden="true" />,
    prices: [],
    comingSoon: true,
    comingSoonDate: "2026. Január"
  }
];

// Generate JSON-LD structured data for services
const generateStructuredData = () => {
  const services = pricesData
    .filter(service => !service.comingSoon)
    .map(service => ({
      "@type": "Service",
      "name": service.title,
      "provider": {
        "@type": "Person",
        "name": "Kiss Máté",
        "jobTitle": "Masszázsterapeuta"
      },
      "areaServed": {
        "@type": "City",
        "name": "Budapest"
      },
      "offers": service.prices.map(price => ({
        "@type": "Offer",
        "name": price.label || price.duration,
        "price": price.priceValue,
        "priceCurrency": "HUF",
        "availability": "https://schema.org/InStock"
      }))
    }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Masszázs szolgáltatások és árak",
    "description": "Kiss Máté masszázsterapeuta szolgáltatásainak árai Budapesten",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": service
    }))
  };
};

const Prices = () => {
  useSEO({
    title: 'Árak',
    description: 'Masszázs árak és bérletek Budapesten. Svéd masszázs, sportmasszázs árak, testrész szerinti árazás és előnyös bérletlehetőségek. Kiszállási díj információk.'
  });

  const structuredData = generateStructuredData();
  
  return (
    <main className="prices">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <HexagonBackground fixed={false} />
      <div className="prices__container">
        <motion.header 
          className="prices__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="prices__title">Árak</h1>
          <p className="prices__subtitle">
            Átlátható árazás, prémium minőségű szolgáltatás
          </p>
        </motion.header>

        <div className="prices__cards" role="list" aria-label="Szolgáltatások és árak">
          {pricesData.map((service, index) => (
            <motion.article
              key={service.id}
              className={`prices__card ${service.comingSoon ? 'prices__card--coming-soon' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15, ease: "easeOut" }}
              role="listitem"
              aria-labelledby={`service-title-${service.id}`}
            >
              {service.comingSoon && (
                <div className="prices__card-badge" role="status" aria-label="Hamarosan elérhető szolgáltatás">
                  Hamarosan
                </div>
              )}

              <div className="prices__card-icon-wrapper" aria-hidden="true">
                <div className="prices__card-icon">
                  {service.icon}
                </div>
              </div>

              <h2 id={`service-title-${service.id}`} className="prices__card-title">{service.title}</h2>

              {service.comingSoon ? (
                <div className="prices__card-coming-soon">
                  <p className="prices__card-coming-soon-text">
                    Elérhető: <strong>{service.comingSoonDate}</strong>
                  </p>
                </div>
              ) : (
                <>
                  {/* Single session prices */}
                  <section className="prices__card-section" aria-labelledby={`single-prices-${service.id}`}>
                    <div className="prices__card-section-header">
                      <FaClock className="prices__card-section-icon" aria-hidden="true" />
                      <h3 id={`single-prices-${service.id}`}>Alkalmankénti árak</h3>
                    </div>
                    <dl className="prices__card-prices">
                      {service.prices.map((option, idx) => (
                        <div key={idx} className="prices__card-price-row">
                          <dt className="prices__card-duration">{option.duration}</dt>
                          <dd className="prices__card-price">{option.price}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>

                  {/* Detailed body part prices */}
                  {service.detailedPrices && (
                    <section className="prices__card-section prices__card-section--detailed" aria-labelledby={`detailed-prices-${service.id}`}>
                      <div className="prices__card-section-header">
                        <FaHandPaper className="prices__card-section-icon" aria-hidden="true" />
                        <h3 id={`detailed-prices-${service.id}`}>Testrész szerinti árak</h3>
                      </div>
                      <dl className="prices__card-prices">
                        {service.detailedPrices.map((option, idx) => (
                          <div key={idx} className="prices__card-price-row prices__card-price-row--detailed">
                            <dt className="prices__card-price-info">
                              {option.label && (
                                <span className="prices__card-label">{option.label}</span>
                              )}
                              <span className="prices__card-duration">{option.duration}</span>
                            </dt>
                            <dd className="prices__card-price">{option.price}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  )}

                  {/* Membership prices */}
                  {service.memberships && (
                    <section className="prices__card-section prices__card-section--membership" aria-labelledby={`membership-prices-${service.id}`}>
                      <div className="prices__card-section-header">
                        <FaTicketAlt className="prices__card-section-icon" aria-hidden="true" />
                        <h3 id={`membership-prices-${service.id}`}>Bérlet árak</h3>
                      </div>
                      <dl className="prices__card-memberships">
                        {service.memberships.map((membership, idx) => (
                          <div key={idx} className="prices__card-membership">
                            <dt className="prices__card-membership-info">
                              <span className="prices__card-membership-sessions">{membership.sessions}</span>
                              {membership.savings && (
                                <span className="prices__card-membership-savings">{membership.savings}</span>
                              )}
                            </dt>
                            <dd className="prices__card-membership-price">{membership.price}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  )}

                  {service.note && (
                    <p className="prices__card-note" role="note">{service.note}</p>
                  )}
                </>
              )}
            </motion.article>
          ))}
        </div>

        {/* Call-out fees section */}
        <motion.section 
          className="prices__callout"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          aria-labelledby="callout-title"
        >
          <div className="prices__callout-header">
            <FaCar className="prices__callout-icon" aria-hidden="true" />
            <h2 id="callout-title" className="prices__callout-title">Kiszállási díj</h2>
          </div>
          <dl className="prices__callout-fees">
            {callOutFees.map((fee, idx) => (
              <div key={idx} className="prices__callout-fee">
                <dt className="prices__callout-persons">{fee.persons}</dt>
                <dd className="prices__callout-price">{fee.price}</dd>
              </div>
            ))}
          </dl>
          <p className="prices__callout-note">
            A kiszállási díj a masszázs árához adódik hozzá a távolság függvényében.
          </p>
        </motion.section>
      </div>
    </main>
  );
};

export default Prices;