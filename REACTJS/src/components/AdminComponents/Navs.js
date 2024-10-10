import React from 'react'
import 'bootstrap/js/dist/dropdown'
function Nav() {
  return (
        
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent text-white px-3">
      <i className="navbar-brand bi bi-justify-left fs-4"></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        
          
      </div>
    </nav>

  )
}

export default Nav
