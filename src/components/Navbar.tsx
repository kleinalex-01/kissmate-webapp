import { Link } from 'react-router-dom'
import { FaHome, FaHandSparkles, FaMoneyBillWave, FaEnvelope } from 'react-icons/fa'
import { useState, useEffect, useMemo } from 'react'

const Navbar = () => {
    const titles = useMemo(() => ["Masszőr", "Sportmasszőr"], [])
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
    const [displayText, setDisplayText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [typingSpeed, setTypingSpeed] = useState(150)

    useEffect(() => {
        const currentTitle = titles[currentTitleIndex]
        
        const handleTyping = () => {
            if (!isDeleting) {
                // Typing
                if (displayText.length < currentTitle.length) {
                    setDisplayText(currentTitle.substring(0, displayText.length + 1))
                    setTypingSpeed(150)
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), 2000)
                }
            } else {
                // Deleting
                if (displayText.length > 0) {
                    setDisplayText(currentTitle.substring(0, displayText.length - 1))
                    setTypingSpeed(100)
                } else {
                    setIsDeleting(false)
                    setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length)
                }
            }
        }

        const timer = setTimeout(handleTyping, typingSpeed)
        return () => clearTimeout(timer)
    }, [displayText, isDeleting, currentTitleIndex, titles, typingSpeed])

    return (
        <div className="home__header">
            {/* Left side: Image and Name */}
            <div className="home__header-left">
                <img 
                    src="/pictures/kissmate-profilkep.JPG" 
                    alt="Kiss Máté" 
                    className="home__header-image"
                />
                <div className="home__header-name-container">
                    <h1 className="home__header-name">
                        Kiss Máté
                        <span className="home__header-title-separator"> - </span>
                        <span className="home__header-typewriter-title">
                            {displayText}
                            <span className="home__header-typewriter-cursor">|</span>
                        </span>
                    </h1>
                </div>
            </div>

            {/* Right side: Navigation Icons/Links */}
            <nav className="home__header-nav">
                <Link to="/" className="home__header-nav-item">
                    <FaHome className="home__header-icon" />
                    <span className="home__header-text">Bemutatkozás</span>
                </Link>
                <Link to="/services" className="home__header-nav-item">
                    <FaHandSparkles className="home__header-icon" />
                    <span className="home__header-text">Szolgáltatások</span>
                </Link>
                <Link to="/prices" className="home__header-nav-item">
                    <FaMoneyBillWave className="home__header-icon" />
                    <span className="home__header-text">Árak</span>
                </Link>
                <Link to="/contact" className="home__header-nav-item">
                    <FaEnvelope className="home__header-icon" />
                    <span className="home__header-text">Kapcsolat</span>
                </Link>
            </nav>
        </div>
    )
}

export default Navbar
