import React from 'react'

const NavBar = () => {
  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
      <span className='navbar-brand'>
        <i className='fas fa-calendar-alt'></i>
        &nbsp;
        Vadick
      </span>

      <button className='btn btn-danger'>
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>salir</span>
      </button>

    </div>
  )
}

export default NavBar