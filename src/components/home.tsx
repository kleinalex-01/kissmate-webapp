import { HexagonBackground } from "./HexagonBackground";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const Home = () => {
    return (
        <>
        <div className="home__container">
            <div className="home__section1">
                <HexagonBackground fixed={false} />
                
                {/* Hero Content */}
                <div className="home__hero">
                    <div className="home__hero-content">
                        <p className="home__hero-greeting">Üdvözlöm!</p>
                        <h1 className="home__hero-title">
                            <span className="home__hero-title-main">Kiss Máté</span>
                            <span className="home__hero-title-sub">Masszázsterapeuta</span>
                        </h1>
                        <p className="home__hero-description">
                            Professzionális masszázskezelések a testi és lelki harmónia érdekében. 
                            Tapasztalt szakemberként segítek a feszültség oldásában és az egészség megőrzésében.
                        </p>
                        <div className="home__hero-cta">
                            <a href="tel:+36301234567" className="home__hero-btn home__hero-btn--primary">
                                <FaPhone className="home__hero-btn-icon" />
                                <span>Hívás</span>
                            </a>
                            <a href="mailto:kiss.mate@example.com" className="home__hero-btn home__hero-btn--secondary">
                                <FaEnvelope className="home__hero-btn-icon" />
                                <span>E-mail</span>
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
                <p>Section 2 Content</p>

                <div className="section2__divider-bottom">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="section2__divider-bottom-path"></path>
                    </svg>
                </div>

            </div>

            <div className="home__section3">

            </div>

        </div>
        </>
    )
}

export default Home