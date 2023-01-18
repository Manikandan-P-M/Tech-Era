import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="app-container">
    <nav className="header">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
    </nav>
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-desc">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
