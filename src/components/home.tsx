import { HexagonBackground } from "./HexagonBackground";
import { FaPhone, FaHeartbeat, FaShieldAlt, FaBolt, FaDumbbell, FaBrain, FaLeaf, FaHandHoldingHeart, FaSpa, FaHeart, FaHandsHelping } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useSEO } from "../hooks/useDocumentTitle";

// JSON-LD structured data for the home page
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kiss Máté",
    "jobTitle": "Masszázsterapeuta",
    "description": "Minősített masszőr Budapesten. Professzionális svéd masszázs és sportmasszázs kiszállással.",
    "url": "https://kissmate-masszazs.hu",
    "telephone": "+36303517803",
    "email": "kmmasszazs@gmail.com",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Budapest",
        "addressCountry": "HU"
    },
    "image": "https://kissmate-masszazs.hu/pictures/kissmate-profilkep.JPG",
    "sameAs": [],
    "knowsAbout": ["Svéd masszázs", "Sportmasszázs", "Relaxációs masszázs"],
    "makesOffer": [
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": "Svéd Masszázs",
                "description": "Klasszikus relaxációs masszázs lágy, áramló mozdulatokkal"
            },
            "price": "6500",
            "priceCurrency": "HUF"
        },
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": "Sportmasszázs",
                "description": "Speciálisan sportolóknak tervezett intenzív masszázs"
            },
            "price": "9000",
            "priceCurrency": "HUF"
        }
    ]
};

const Home = () => {
    useSEO({
        title: "Bemutatozás",
        description: "Kiss Máté masszázsterapeuta Budapesten. Professzionális svéd masszázs és sportmasszázs kiszállással. Foglalj időpontot: 06 30 351 7803"
    });

    const benefitsRef = useRef<HTMLUListElement>(null);
    const benefitsSectionRef = useRef<HTMLElement>(null);
    const [cardsVisible, setCardsVisible] = useState<boolean[]>(new Array(6).fill(false));
    const [showFloatingCTA, setShowFloatingCTA] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.home__benefit-card');
                        cards.forEach((_, index) => {
                            setTimeout(() => {
                                setCardsVisible(prev => {
                                    const newState = [...prev];
                                    newState[index] = true;
                                    return newState;
                                });
                            }, index * 150); // 150ms delay between each card
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (benefitsRef.current) {
            observer.observe(benefitsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Floating CTA visibility observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setShowFloatingCTA(entry.isIntersecting || entry.boundingClientRect.top < 0);
                });
            },
            { threshold: 0.5, rootMargin: '0px' }  // 50% visibility = middle of section
        );

        if (benefitsSectionRef.current) {
            observer.observe(benefitsSectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
        {/* JSON-LD Structured Data for SEO */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <main className="home__container">
            <section className="home__section1" aria-labelledby="hero-title">
                <HexagonBackground fixed={false} />
                
                {/* Hero Content */}
                <motion.header 
                    className="home__hero"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="home__hero-content">
                        {/* Massage Icons - Decorative */}
                        <motion.div 
                            className="home__hero-icons"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            aria-hidden="true"
                        >
                            <FaHandHoldingHeart className="home__hero-icon" />
                            <FaSpa className="home__hero-icon" />
                            <FaLeaf className="home__hero-icon" />
                            <FaHeart className="home__hero-icon" />
                            <FaHandsHelping className="home__hero-icon" />
                        </motion.div>
                        
                        <h1 id="hero-title" className="home__hero-title">
                            <span className="home__hero-title-main">Kiss Máté</span>
                            <span className="home__hero-title-sub">Masszázsterapeuta</span>
                        </h1>
                        <p className="home__hero-description">
                            <strong>Minősített masszőr</strong> vagyok,
                            segítek a mindennapi <strong>stressz</strong> és <strong>feszültség leküzdésében</strong>, hogy újra energiával tele érezd magad.
                        </p>
                        <div className="home__hero-cta">
                            <a 
                                href="tel:+36303517803" 
                                className="home__hero-btn home__hero-btn--primary"
                                aria-label="Foglalj időpontot telefonon: 06 30 351 7803"
                            >
                                <FaPhone className="home__hero-btn-icon" aria-hidden="true" />
                                <span>Foglalj időpontot most!</span>
                            </a>
                        </div>
                    </div>
                </motion.header>
                
                {/* Hero / About divider - Decorative */}
                <div className="section1__divider-bottom" aria-hidden="true">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="section1__divider-bottom-path"></path>
                    </svg>
                </div>

                <div className="section1__divider-top" aria-hidden="true">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="section1__divider-top-path"></path>
                    </svg>
                </div>
            </section>

            <section className="home__section2" ref={benefitsSectionRef} aria-labelledby="benefits-title">
                <motion.div 
                    className="home__benefits"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.header 
                        className="home__benefits-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 id="benefits-title" className="home__benefits-title">Miért járj masszázsra?</h2>
                        <p className="home__benefits-subtitle">
                            A rendszeres masszázs számtalan előnnyel rendelkezik mind a tested, mind a lelked egészségére
                        </p>
                    </motion.header>

                    <ul className="home__benefits-grid" ref={benefitsRef} aria-label="A masszázs előnyei">
                        <li className={`home__benefit-card ${cardsVisible[0] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon" aria-hidden="true">
                                <FaHeartbeat />
                            </div>
                            <h3 className="home__benefit-title">Jobb Vérkeringés</h3>
                            <p className="home__benefit-description">
                                Fokozza a vérkeringést és az oxigénellátást, segítve a szövetek regenerációját
                            </p>
                        </li>

                        <li className={`home__benefit-card ${cardsVisible[1] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon" aria-hidden="true">
                                <FaShieldAlt />
                            </div>
                            <h3 className="home__benefit-title">Fájdalomcsillapítás</h3>
                            <p className="home__benefit-description">
                                Enyhíti az izomfájdalmat, csökkenti a gyulladást és a krónikus fájdalmakat
                            </p>
                        </li>

                        <li className={`home__benefit-card ${cardsVisible[2] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon" aria-hidden="true">
                                <FaBolt />
                            </div>
                            <h3 className="home__benefit-title">Energiaszint Növelés</h3>
                            <p className="home__benefit-description">
                                Növeli az energiaszintet és javítja a teljesítményt a stressz csökkentésével
                            </p>
                        </li>

                        <li className={`home__benefit-card ${cardsVisible[3] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon" aria-hidden="true">
                                <FaDumbbell />
                            </div>
                            <h3 className="home__benefit-title">Sportteljesítmény</h3>
                            <p className="home__benefit-description">
                                Javítja a rugalmasságot, csökkenti a sérülések kockázatát sportolóknál
                            </p>
                        </li>

                        <li className={`home__benefit-card ${cardsVisible[4] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon" aria-hidden="true">
                                <FaBrain />
                            </div>
                            <h3 className="home__benefit-title">Stresszoldás</h3>
                            <p className="home__benefit-description">
                                Csökkenti a kortizol szintet és elősegíti a mély relaxációt
                            </p>
                        </li>

                        <li className={`home__benefit-card ${cardsVisible[5] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon" aria-hidden="true">
                                <FaLeaf />
                            </div>
                            <h3 className="home__benefit-title">Természetes Gyógyulás</h3>
                            <p className="home__benefit-description">
                                Támogatja a test természetes gyógyulási folyamatait gyógyszerek nélkül
                            </p>
                        </li>
                    </ul>
                </motion.div>


            </section>

            <section className="home__section3" aria-label="Bemutatkozás és szolgáltatások">
                <div className="home__section3__divider-top" aria-hidden="true">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" className="home__section3__divider-top"></path>
                    </svg>
                </div>
                <HexagonBackground fixed={false} />

                {/* Services & About Section */}
                <motion.div 
                    className="home__services-about"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* About Section */}
                    <motion.article 
                        className="home__about"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        aria-labelledby="about-title"
                    >
                        <div className="home__about-content">
                            <div className="home__about-text">
                                <h2 id="about-title" className="home__about-title">Ismerj Meg</h2>
                                <p className="home__about-description">
                                    Szia! Kiss Máté vagyok, <strong>minősített masszőr</strong> növekvő tapasztalattal. 
                                    Hiszem, hogy a masszázs nem csak testi, hanem lelki gyógyulás is. Minden kezelésemet 
                                    az egyéni igények figyelembevételével, professzionális hozzáállással végzem.
                                </p>
                                <p className="home__about-description">
                                    Célom, hogy segítsem az embereket a mindennapi stressz és feszültség leküzdésében, 
                                    hogy újra energiával telve érezzék magukat. Minden kezelés egyedi, személyre szabott 
                                    élmény, ahol az Ön komfortja és gyógyulása a legfontosabb.
                                </p>
                                <ul className="home__about-credentials" aria-label="Képesítések">
                                    <li className="home__about-credential">
                                        <FaShieldAlt className="home__about-credential-icon" aria-hidden="true" />
                                        <span>Minősített Terapeuta</span>
                                    </li>
                                    <li className="home__about-credential">
                                        <FaHeartbeat className="home__about-credential-icon" aria-hidden="true" />
                                        <span>Folyamatos Képzések</span>
                                    </li>
                                    <li className="home__about-credential">
                                        <FaLeaf className="home__about-credential-icon" aria-hidden="true" />
                                        <span>Naturális Megközelítés</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="home__about-image">
                                <img 
                                    src="/pictures/kissmate-profilkep.JPG" 
                                    alt="Kiss Máté masszázsterapeuta portréfotója" 
                                    className="home__about-photo"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </motion.article>

                    {/* Services Section */}
                    <motion.div 
                        className="home__services"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        aria-labelledby="home-services-title"
                    >
                        <header className="home__services-header">
                            <h2 id="home-services-title" className="home__services-title">Szolgáltatások</h2>
                            <p className="home__services-subtitle">
                                Gondos és professzionális masszázs az egészség megőrzéséért
                            </p>
                        </header>

                        <div className="home__services-grid" role="list" aria-label="Elérhető szolgáltatások">
                            <motion.article 
                                className="home__service-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                                role="listitem"
                                aria-labelledby="home-service-sved"
                            >
                                <div className="home__service-icon" aria-hidden="true">
                                    <FaHandHoldingHeart />
                                </div>
                                <h3 id="home-service-sved" className="home__service-title">Svéd Masszázs</h3>
                                <p className="home__service-description">
                                    Klasszikus relaxációs masszázs lágy, áramló mozdulatokkal. Fájdalomcsillapítás, 
                                    stresszoldás és általános jólét javítása érdekében.
                                </p>
                                <div className="home__service-features" aria-label="Árak">
                                    <span className="home__service-feature">30 perc / 6.500 Ft</span>
                                    <span className="home__service-feature">50 perc / 10.000 Ft</span>
                                </div>
                            </motion.article>

                            <motion.article 
                                className="home__service-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                                role="listitem"
                                aria-labelledby="home-service-sport"
                            >
                                <div className="home__service-icon" aria-hidden="true">
                                    <FaDumbbell />
                                </div>
                                <h3 id="home-service-sport" className="home__service-title">Sportmasszázs</h3>
                                <p className="home__service-description">
                                    Speciálisan sportolóknak tervezett masszázs. Fokozza a teljesítményt, 
                                    gyorsítja a regenerációt. Az időtartam egyéni igények szerint alakul.
                                </p>
                                <div className="home__service-features" aria-label="Árak">
                                    <span className="home__service-feature">40-80 perc</span>
                                    <span className="home__service-feature">9.000-18.000 Ft</span>
                                </div>
                            </motion.article>

                            <motion.article 
                                className="home__service-card home__service-card--coming-soon"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                                role="listitem"
                                aria-labelledby="home-service-csont"
                            >
                                <div className="home__service-badge" role="status" aria-label="Hamarosan elérhető">Hamarosan</div>
                                <div className="home__service-icon" aria-hidden="true">
                                    <FaShieldAlt />
                                </div>
                                <h3 id="home-service-csont" className="home__service-title">Csontkovácsolás</h3>
                                <p className="home__service-description">
                                    Hagyományos csontkovácsolási technikák az ízületek és a gerinc 
                                    egészségéért. Jelenleg képzés alatt – hamarosan elérhető!
                                </p>
                                <div className="home__service-features">
                                    <span className="home__service-feature">Képzés alatt</span>
                                </div>
                            </motion.article>
                        </div>
                    </motion.div>
                </motion.div>

            </section>

        </main>

            {/* Floating CTA */}
            <motion.a
                href="tel:+36303517803"
                className="home__floating-cta"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                    opacity: showFloatingCTA ? 1 : 0, 
                    scale: showFloatingCTA ? 1 : 0.8,
                    y: showFloatingCTA ? 0 : 20
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ pointerEvents: showFloatingCTA ? 'auto' : 'none' }}
                aria-label="Telefonos foglalás: 06 30 351 7803"
            >
                <FaPhone className="home__floating-cta-icon" aria-hidden="true" />
                <span className="home__floating-cta-text">Foglalás</span>
            </motion.a>
    </>
    )
}

export default Home