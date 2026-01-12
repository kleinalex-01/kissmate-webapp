import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'
import { useSEO } from '../hooks/useDocumentTitle'

const NotFound = () => {
  useSEO({
    title: '404 - Oldal nem található',
    description: 'Az oldal, amit keresél, nem létezik. Térj vissza a kezdőlapra.'
  })

  return (
    <main className="not-found">
      <motion.div
        className="not-found__container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="not-found__content">
          <motion.div
            className="not-found__icon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <FaExclamationTriangle />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Oldal nem található</p>
            <p className="not-found__description">
              Sajnos az oldal, amit kerestel, nem létezik vagy átköltözött.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <Link to="/" className="not-found__button">
              <FaHome aria-hidden="true" />
              <span>Vissza a kezdőlapra</span>
            </Link>
          </motion.div>

          <motion.div
            className="not-found__suggestions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            <p className="not-found__suggestions-title">Talán ezek érdeklik:</p>
            <ul className="not-found__suggestions-list" role="list">
              <li role="listitem">
                <Link to="/services" className="not-found__link">Szolgáltatások</Link>
              </li>
              <li role="listitem">
                <Link to="/prices" className="not-found__link">Árak</Link>
              </li>
              <li role="listitem">
                <Link to="/contact" className="not-found__link">Kapcsolat</Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}

export default NotFound
