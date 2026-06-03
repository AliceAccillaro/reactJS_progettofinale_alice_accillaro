import { FaDiscord, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoMdContact } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="footer-panel">
        <div>
          <p className="eyebrow">Rehacktor</p>
          <h2 className="section-title">Un archivio gaming con piu personalita.</h2>
          <p className="page-subtitle">
            Catalogo, profili, preferiti e recensioni dentro un'interfaccia da control room.
          </p>
          <p className="footer-meta">
            (c) 2026 Rehacktor. Crafted for players who like to dig deeper.
          </p>
        </div>

        <div className="footer-links">
          <a href="#" className="footer-link">
            <MdOutlinePrivacyTip />
            Privacy
          </a>

          <a href="#" className="footer-link">
            <IoMdContact />
            Contact
          </a>
        </div>

        <div className="social-links">
          <a href="#" className="social-link">
            <FaDiscord />
            Discord
          </a>

          <a href="#" className="social-link">
            <FaInstagram />
            Instagram
          </a>

          <a href="#" className="social-link">
            <FaXTwitter />
            X / Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
