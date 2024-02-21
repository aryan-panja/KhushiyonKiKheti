import { useNavigate, Link } from "react-router-dom"

import "../Styles/LandingPage.css"

export default function LandingPage() {
  const Navigate = useNavigate();

  return (
    <div className="landingPage-div">
      <div className="landingPage-routes-div">
        <div className="landingPage-routes-headings">
          Hi there 👋,
          <p className="landingPage-headings-desc-1">
            I am Kishan your Farming Assitant
          </p>
          <p className="landingPage-headings-desc">
            How can I help you today ?
          </p>
        </div>
        <div className="landingPage-routes">
          <Link to="/chatbot" className="landingPage-chatbot-route landingPage-route" onClick={() => Navigate('/')}>
            Kissan Mitra (Chat Bot)
          </Link>

          <Link to="/cart" className="landingPage-purchase-route landingPage-route" onClick={() => Navigate('/')}>
            Purchase From Essentials
          </Link>

          <Link to="/add-product"
            className="landingPage-sellCrops-route landingPage-route"
            onClick={() => Navigate("/")}
          >
            Sell Crops
          </Link>

          <Link to="/"
            className="landingPage-whattosow-route landingPage-route"
            onClick={() => Navigate("/")}
          >
            Help me decide what to sow ?
          </Link>
        </div>
      </div>
    </div>
  );
}
