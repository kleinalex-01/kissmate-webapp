import { motion } from "motion/react";
import { HexagonBackground } from "./HexagonBackground";
import { FaSpa, FaRunning, FaBone, FaClock, FaTicketAlt, FaCar, FaHandPaper } from "react-icons/fa";
import { useSEO } from "../hooks/useDocumentTitle";

interface PriceOption {
  duration: string;
  price: string;
  label?: string;
}

interface MembershipOption {
  sessions: string;
  price: string;
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
    icon: <FaSpa />,
    prices: [
      { duration: "30 perc", price: "6.500 Ft" },
      { duration: "50 perc", price: "10.000 Ft" }
    ],
    detailedPrices: [
      { duration: "80 perc", price: "13.500 Ft", label: "Egész test" },
      { duration: "50 perc", price: "9.000 Ft", label: "Teljes hát" },
      { duration: "50 perc", price: "9.000 Ft", label: "Teljes láb" },
      { duration: "30 perc", price: "6.500 Ft", label: "Trapéz / Vádli / Váll / Kar" }
    ],
    memberships: [
      { sessions: "5 alkalom (5 óra)", price: "55.000 Ft", savings: "5.000 Ft megtakarítás" },
      { sessions: "10 alkalom (10 óra)", price: "100.000 Ft", savings: "10.000 Ft megtakarítás" }
    ]
  },
  {
    id: 2,
    title: "Sportmasszázs",
    icon: <FaRunning />,
    prices: [
      { duration: "40-80 perc", price: "9.000-18.000 Ft" }
    ],
    memberships: [
      { sessions: "5 alkalom (5 óra)", price: "62.500 Ft", savings: "7.500 Ft megtakarítás" },
      { sessions: "10 alkalom (10 óra)", price: "115.000 Ft", savings: "15.000 Ft megtakarítás" }
    ],
    note: "Az időtartam egyéni felmérés alapján alakul"
  },
  {
    id: 3,
    title: "Csontkovácsolás",
    icon: <FaBone />,
    prices: [],
    comingSoon: true,
    comingSoonDate: "2026. Január"
  }
];

const Prices = () => {
  useSEO({
    title: 'Árak',
    description: 'Masszázs árak és bérletek Budapesten. Svéd masszázs, sportmasszázs árak, testrész szerinti árazás és előnyös bérletlehetőségek. Kiszállási díj információk.'
  });
  
  return (
    <div className="prices">
      <HexagonBackground fixed={false} />
      <div className="prices__container">
        <motion.div 
          className="prices__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="prices__title">Árak</h1>
          <p className="prices__subtitle">
            Átlátható árazás, prémium minőségű szolgáltatás
          </p>
        </motion.div>

        <div className="prices__cards">
          {pricesData.map((service, index) => (
            <motion.div
              key={service.id}
              className={`prices__card ${service.comingSoon ? 'prices__card--coming-soon' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15, ease: "easeOut" }}
            >
              {service.comingSoon && (
                <div className="prices__card-badge">Hamarosan</div>
              )}

              <div className="prices__card-icon-wrapper">
                <div className="prices__card-icon">
                  {service.icon}
                </div>
              </div>

              <h2 className="prices__card-title">{service.title}</h2>

              {service.comingSoon ? (
                <div className="prices__card-coming-soon">
                  <p className="prices__card-coming-soon-text">
                    Elérhető: <strong>{service.comingSoonDate}</strong>
                  </p>
                </div>
              ) : (
                <>
                  {/* Single session prices */}
                  <div className="prices__card-section">
                    <div className="prices__card-section-header">
                      <FaClock className="prices__card-section-icon" />
                      <span>Alkalmankénti árak</span>
                    </div>
                    <div className="prices__card-prices">
                      {service.prices.map((option, idx) => (
                        <div key={idx} className="prices__card-price-row">
                          <span className="prices__card-duration">{option.duration}</span>
                          <span className="prices__card-price">{option.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed body part prices */}
                  {service.detailedPrices && (
                    <div className="prices__card-section prices__card-section--detailed">
                      <div className="prices__card-section-header">
                        <FaHandPaper className="prices__card-section-icon" />
                        <span>Testrész szerinti árak</span>
                      </div>
                      <div className="prices__card-prices">
                        {service.detailedPrices.map((option, idx) => (
                          <div key={idx} className="prices__card-price-row prices__card-price-row--detailed">
                            <div className="prices__card-price-info">
                              {option.label && (
                                <span className="prices__card-label">{option.label}</span>
                              )}
                              <span className="prices__card-duration">{option.duration}</span>
                            </div>
                            <span className="prices__card-price">{option.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Membership prices */}
                  {service.memberships && (
                    <div className="prices__card-section prices__card-section--membership">
                      <div className="prices__card-section-header">
                        <FaTicketAlt className="prices__card-section-icon" />
                        <span>Bérlet árak</span>
                      </div>
                      <div className="prices__card-memberships">
                        {service.memberships.map((membership, idx) => (
                          <div key={idx} className="prices__card-membership">
                            <div className="prices__card-membership-info">
                              <span className="prices__card-membership-sessions">{membership.sessions}</span>
                              {membership.savings && (
                                <span className="prices__card-membership-savings">{membership.savings}</span>
                              )}
                            </div>
                            <span className="prices__card-membership-price">{membership.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.note && (
                    <p className="prices__card-note">{service.note}</p>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call-out fees section */}
        <motion.div 
          className="prices__callout"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <div className="prices__callout-header">
            <FaCar className="prices__callout-icon" />
            <h2 className="prices__callout-title">Kiszállási díj</h2>
          </div>
          <div className="prices__callout-fees">
            {callOutFees.map((fee, idx) => (
              <div key={idx} className="prices__callout-fee">
                <span className="prices__callout-persons">{fee.persons}</span>
                <span className="prices__callout-price">{fee.price}</span>
              </div>
            ))}
          </div>
          <p className="prices__callout-note">
            A kiszállási díj a masszázs árához adódik hozzá a távolság függvényében.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Prices;