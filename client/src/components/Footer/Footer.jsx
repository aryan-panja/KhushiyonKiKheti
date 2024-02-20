import React from 'react'
import GeolocationComponent from './GeoLocation/GeoLocationComponent'
import Weather from './Weather/Weather'
import Icon from "../../../public/Images/Icon.png"
import './index.css'

const Footer = () => {
  return (
    <div className="footer-location">
      <div className="footer-title">
        <img src={Icon} />
        <p className="footer-title-text">
          Khushiyon Ki Kheti
          <p className="footer-title-desc">
            An Initiative to help farmers grow
          </p>
        </p>
      </div>
      <div className="footer-info">
        {<GeolocationComponent />}{<Weather />}
      </div>
    </div>
  )
}

export default Footer