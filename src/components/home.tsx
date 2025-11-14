import { HexagonBackground } from "./HexagonBackground";
import { FaPhone, FaHeartbeat, FaShieldAlt, FaBolt, FaDumbbell, FaBrain, FaLeaf, FaHandHoldingHeart, FaSpa, FaHeart, FaHandsHelping } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Home = () => {
    const benefitsRef = useRef<HTMLDivElement>(null);
    const [cardsVisible, setCardsVisible] = useState<boolean[]>(new Array(6).fill(false));

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

    return (
        <>
        <div className="home__container">
            <div className="home__section1">
                <HexagonBackground fixed={false} />
                
                {/* Hero Content */}
                <div className="home__hero">
                    <div className="home__hero-content">
                        {/* Massage Icons */}
                        <div className="home__hero-icons">
                            <FaHandHoldingHeart className="home__hero-icon" />
                            <FaSpa className="home__hero-icon" />
                            <FaLeaf className="home__hero-icon" />
                            <FaHeart className="home__hero-icon" />
                            <FaHandsHelping className="home__hero-icon" />
                        </div>
                        
                        <h1 className="home__hero-title">
                            <span className="home__hero-title-main">Kiss Máté</span>
                            <span className="home__hero-title-sub">Masszázsterapeuta</span>
                        </h1>
                        <p className="home__hero-description">
                            Minősített masszőr vagyok,
                            segítek a mindennapi stressz és feszültség leküzdésében, hogy újra energiával tele érezd magad.
                        </p>
                        <div className="home__hero-cta">
                            <a href="tel:+36301234567" className="home__hero-btn home__hero-btn--primary">
                                <FaPhone className="home__hero-btn-icon" />
                                <span>Foglalj időpontot most!</span>
                            </a>
                        </div>
                    </div>
                </div>
                
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

            <div className="home__section2">
                <div className="home__benefits">
                    <div className="home__benefits-header">
                        <h2 className="home__benefits-title">Miért járj masszázsra?</h2>
                        <p className="home__benefits-subtitle">
                            A rendszeres masszázs számtalan előnnyel rendelkezik mind a tested, mind a lelked egészségére
                        </p>
                    </div>

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
                </div>


            </div>

        </div>
    </>
    )
}

export default Home