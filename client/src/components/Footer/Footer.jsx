import React from 'react'
import GeolocationComponent from './GeoLocation/GeoLocationComponent'
import Weather from './Weather/Weather'
import './index.css'

const Footer = () => {
  return (
    <div className="footer-location">
        {<GeolocationComponent/>}{<Weather/>}
    </div>
  )
}

export default Footer