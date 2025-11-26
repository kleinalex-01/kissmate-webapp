import { motion } from "motion/react";
import { HexagonBackground } from "./HexagonBackground";
import { FaSpa, FaRunning, FaBone, FaPhone } from "react-icons/fa";

interface ServiceCard {
  id: number;
  title: string;
  icon: React.ReactNode;
  benefits: string[];
  description: string;
  duration: string;
  priceFrom: string;
  popular?: boolean;
  comingSoon?: boolean;
}

const servicesData: ServiceCard[] = [
  {
    id: 1,
    title: "Svéd Masszázs",
    icon: <FaSpa />,
    benefits: ["Relaxáció", "Stresszoldás", "Vérkeringés", "Regeneráció"],
    description: "A klasszikus svéd masszázs lágy, áramló mozdulatokkal oldja a feszültséget és segíti a test természetes gyógyulási folyamatait.",
    duration: "30-50 perc",
    priceFrom: "6.500 Ft",
    popular: true
  },
  {
    id: 2,
    title: "Sportmasszázs",
    icon: <FaRunning />,
    benefits: ["Teljesítmény", "Regeneráció", "Sérülésmegelőzés", "Izomtónus"],
    description: "Speciálisan aktív életmódot élőknek és sportolóknak tervezett intenzív masszázs. Gyorsítja a regenerációt és fokozza a teljesítményt.",
    duration: "40-80 perc",
    priceFrom: "9.000 Ft"
  },
  {
    id: 3,
    title: "Csontkovácsolás",
    icon: <FaBone />,
    benefits: ["Ízületek", "Gerinc", "Mobilitás", "Fájdalomcsillapítás"],
    description: "Hagyományos magyar csontkovácsolási technikák az ízületek és a gerinc egészségéért. Segít helyreállítani a test egyensúlyát.",
    duration: "Egyéni",
    priceFrom: "Hamarosan",
    comingSoon: true
  }
];

const Services = () => {
  return (
    <div className="services">
      <HexagonBackground fixed={false} />
      <div className="services__container">
        <motion.div 
          className="services__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="services__title">Szolgáltatások</h1>
          <p className="services__subtitle">
            Fedezd fel a testre szabott masszázs élményt, amely segít visszanyerni az egyensúlyt és energiát
          </p>
        </motion.div>

        <div className="services__cards">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className={`services__card ${service.comingSoon ? 'services__card--coming-soon' : ''} ${service.popular ? 'services__card--popular' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15, ease: "easeOut" }}
            >
              <span className="services__card-number">0{service.id}</span>
              
              {service.popular && (
                <div className="services__card-badge services__card-badge--popular">Legnépszerűbb</div>
              )}
              {service.comingSoon && (
                <div className="services__card-badge">Hamarosan</div>
              )}
              
              <div className="services__card-icon-wrapper">
                <div className="services__card-icon">
                  {service.icon}
                </div>
              </div>

              <div className="services__card-divider"></div>

              <h2 className="services__card-title">{service.title}</h2>

              <div className="services__card-benefits">
                {service.benefits.map((benefit, idx) => (
                  <span key={idx} className="services__card-benefit">{benefit}</span>
                ))}
              </div>

              <div className="services__card-divider"></div>

              <p className="services__card-description">{service.description}</p>

              <div className="services__card-info">
                <div className="services__card-duration">
                  <span className="services__card-info-label">Időtartam</span>
                  <span className="services__card-info-value">{service.duration}</span>
                </div>
                <div className="services__card-price">
                  <span className="services__card-info-label">Ártól</span>
                  <span className="services__card-info-value">{service.priceFrom}</span>
                </div>
              </div>

              {!service.comingSoon && (
                <a href="tel:+36301234567" className="services__card-cta">
                  <FaPhone className="services__card-cta-icon" />
                  <span>Időpontfoglalás</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;