import { HexagonBackground } from "./HexagonBackground";
import { FaPhone, FaHeartbeat, FaShieldAlt, FaBolt, FaDumbbell, FaBrain, FaLeaf, FaHandHoldingHeart, FaSpa, FaHeart, FaHandsHelping } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const Home = () => {
    const benefitsRef = useRef<HTMLDivElement>(null);
    const benefitsSectionRef = useRef<HTMLDivElement>(null);
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
        <div className="home__container">
            <div className="home__section1">
                <HexagonBackground fixed={false} />
                
                {/* Hero Content */}
                <motion.div 
                    className="home__hero"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="home__hero-content">
                        {/* Massage Icons */}
                        <motion.div 
                            className="home__hero-icons"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        >
                            <FaHandHoldingHeart className="home__hero-icon" />
                            <FaSpa className="home__hero-icon" />
                            <FaLeaf className="home__hero-icon" />
                            <FaHeart className="home__hero-icon" />
                            <FaHandsHelping className="home__hero-icon" />
                        </motion.div>
                        
                        <h1 className="home__hero-title">
                            <span className="home__hero-title-main">Kiss Máté</span>
                            <span className="home__hero-title-sub">Masszázsterapeuta</span>
                        </h1>
                        <p className="home__hero-description">
                            <strong>Minősített masszőr</strong> vagyok,
                            segítek a mindennapi <strong>stressz</strong> és <strong>feszültség leküzdésében</strong>, hogy újra energiával tele érezd magad.
                        </p>
                        <div className="home__hero-cta">
                            <a href="tel:+36301234567" className="home__hero-btn home__hero-btn--primary">
                                <FaPhone className="home__hero-btn-icon" />
                                <span>Foglalj időpontot most!</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
                
                {/* Hero / About divider */}
                <div className="section1__divider-bottom">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="section1__divider-bottom-path"></path>
                    </svg>
                </div>

                <div className="section1__divider-top">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="section1__divider-top-path"></path>
                    </svg>
                </div>
            </div>

            <div className="home__section2" ref={benefitsSectionRef}>
                <motion.div 
                    className="home__benefits"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div 
                        className="home__benefits-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="home__benefits-title">Miért járj masszázsra?</h2>
                        <p className="home__benefits-subtitle">
                            A rendszeres masszázs számtalan előnnyel rendelkezik mind a tested, mind a lelked egészségére
                        </p>
                    </motion.div>

                    <div className="home__benefits-grid" ref={benefitsRef}>
                        <div className={`home__benefit-card ${cardsVisible[0] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon">
                                <FaHeartbeat />
                            </div>
                            <h3 className="home__benefit-title">Jobb Vérkeringés</h3>
                            <p className="home__benefit-description">
                                Fokozza a vérkeringést és az oxigénellátást, segítve a szövetek regenerációját
                            </p>
                        </div>

                        <div className={`home__benefit-card ${cardsVisible[1] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon">
                                <FaShieldAlt />
                            </div>
                            <h3 className="home__benefit-title">Fájdalomcsillapítás</h3>
                            <p className="home__benefit-description">
                                Enyhíti az izomfájdalmat, csökkenti a gyulladást és a krónikus fájdalmakat
                            </p>
                        </div>

                        <div className={`home__benefit-card ${cardsVisible[2] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon">
                                <FaBolt />
                            </div>
                            <h3 className="home__benefit-title">Energiaszint Növelés</h3>
                            <p className="home__benefit-description">
                                Növeli az energiaszintet és javítja a teljesítményt a stressz csökkentésével
                            </p>
                        </div>

                        <div className={`home__benefit-card ${cardsVisible[3] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon">
                                <FaDumbbell />
                            </div>
                            <h3 className="home__benefit-title">Sportteljesítmény</h3>
                            <p className="home__benefit-description">
                                Javítja a rugalmasságot, csökkenti a sérülések kockázatát sportolóknál
                            </p>
                        </div>

                        <div className={`home__benefit-card ${cardsVisible[4] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon">
                                <FaBrain />
                            </div>
                            <h3 className="home__benefit-title">Stresszoldás</h3>
                            <p className="home__benefit-description">
                                Csökkenti a kortizol szintet és elősegíti a mély relaxációt
                            </p>
                        </div>

                        <div className={`home__benefit-card ${cardsVisible[5] ? 'reveal' : ''}`}>
                            <div className="home__benefit-icon">
                                <FaLeaf />
                            </div>
                            <h3 className="home__benefit-title">Természetes Gyógyulás</h3>
                            <p className="home__benefit-description">
                                Támogatja a test természetes gyógyulási folyamatait gyógyszerek nélkül
                            </p>
                        </div>
                    </div>
                </motion.div>


            </div>

            <div className="home__section3">
                <div className="home__section3__divider-top">
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
                    <motion.div 
                        className="home__about"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="home__about-content">
                            <div className="home__about-text">
                                <h2 className="home__about-title">Ismerj Meg</h2>
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
                                <div className="home__about-credentials">
                                    <div className="home__about-credential">
                                        <FaShieldAlt className="home__about-credential-icon" />
                                        <span>Minősített Terapeuta</span>
                                    </div>
                                    <div className="home__about-credential">
                                        <FaHeartbeat className="home__about-credential-icon" />
                                        <span>Folyamatos Képzések</span>
                                    </div>
                                    <div className="home__about-credential">
                                        <FaLeaf className="home__about-credential-icon" />
                                        <span>Naturális Megközelítés</span>
                                    </div>
                                </div>
                            </div>
                            <div className="home__about-image">
                                <img 
                                    src="/pictures/kissmate-profilkep.JPG" 
                                    alt="Kiss Máté - Masszázsterapeuta" 
                                    className="home__about-photo"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Services Section */}
                    <motion.div 
                        className="home__services"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                        <div className="home__services-header">
                            <h2 className="home__services-title">Szolgáltatások</h2>
                            <p className="home__services-subtitle">
                                Gondos és professzionális masszázs az egészség megőrzéséért
                            </p>
                        </div>

                        <div className="home__services-grid">
                            <motion.div 
                                className="home__service-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                            >
                                <div className="home__service-icon">
                                    <FaHandHoldingHeart />
                                </div>
                                <h3 className="home__service-title">Svéd Masszázs</h3>
                                <p className="home__service-description">
                                    Klasszikus relaxációs masszázs lágy, áramló mozdulatokkal. Fájdalomcsillapítás, 
                                    stresszoldás és általános jólét javítása érdekében.
                                </p>
                                <div className="home__service-features">
                                    <span className="home__service-feature">30 perc / 6.500 Ft</span>
                                    <span className="home__service-feature">50 perc / 10.000 Ft</span>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="home__service-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                            >
                                <div className="home__service-icon">
                                    <FaDumbbell />
                                </div>
                                <h3 className="home__service-title">Sportmasszázs</h3>
                                <p className="home__service-description">
                                    Speciálisan sportolóknak tervezett masszázs. Fokozza a teljesítményt, 
                                    gyorsítja a regenerációt. Az időtartam egyéni igények szerint alakul.
                                </p>
                                <div className="home__service-features">
                                    <span className="home__service-feature">40-80 perc</span>
                                    <span className="home__service-feature">9.000-18.000 Ft</span>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="home__service-card home__service-card--coming-soon"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                            >
                                <div className="home__service-badge">Hamarosan</div>
                                <div className="home__service-icon">
                                    <FaShieldAlt />
                                </div>
                                <h3 className="home__service-title">Csontkovácsolás</h3>
                                <p className="home__service-description">
                                    Hagyományos csontkovácsolási technikák az ízületek és a gerinc 
                                    egészségéért. Jelenleg képzés alatt – hamarosan elérhető!
                                </p>
                                <div className="home__service-features">
                                    <span className="home__service-feature">Képzés alatt</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

            </div>

        </div>

            {/* Floating CTA */}
            <motion.a
                href="tel:+36301234567"
                className="home__floating-cta"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                    opacity: showFloatingCTA ? 1 : 0, 
                    scale: showFloatingCTA ? 1 : 0.8,
                    y: showFloatingCTA ? 0 : 20
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ pointerEvents: showFloatingCTA ? 'auto' : 'none' }}
            >
                <FaPhone className="home__floating-cta-icon" />
                <span className="home__floating-cta-text">Foglalás</span>
            </motion.a>
    </>
    )
}

export default Home