// components/Footer.js
import React from 'react';
import '../Footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer role="contentinfo" className="footer">
      <div className="footer__top-wrapper">
        <section className="footer__top">
          <div className="footer__links-list">
            <div className="footer__links-list-title">Helpful Links</div>
            <nav className="footer__links-list-nav">
              <div className="footer__links-list-item">
                <a target="_blank" rel="noopener" href="/">
                  Certifications
                </a>
              </div>
              <div className="footer__links-list-item">
                <a target="_blank" rel="noopener" href="/">
                  Instructors
                </a>
              </div>
              <div className="footer__links-list-item">
                <a target="_blank" rel="noopener" onClick={()=>{navigate("/careers")}}>
                  Careers
                </a>
              </div>
            </nav>
          </div>

          <div className="footer__links-list">
            <div className="footer__links-list-title">Plans</div>
            <nav className="footer__links-list-nav">
              <div className="footer__links-list-item">
                <a target="_blank" rel="noopener" href="/">
                  Plans & Pricing
                </a>
              </div>
              <div className="footer__links-list-item">
                <a target="_blank" rel="noopener" href="/">
                  Business Solutions
                </a>
              </div>
            </nav>
          </div>

          <div className="footer__links-list">
            <div className="footer__links-list-title">Support</div>
            <nav className="footer__links-list-nav">
              <div className="footer__links-list-item">
                <a target="_blank" rel="noopener" href="/">
                  Releases
                </a>
              </div>
              <div className="footer__links-list-item">
                <a target="_blank" rel="noopener" href="/">
                  Help Center
                </a>
              </div>
              <div className="footer__links-list-item">
                <a target="_blank" rel="noopener" onClick={()=> navigate('/contactus')}>
                  Contact
                </a>
              </div>
            </nav>
          </div>

          <div className="footer__community-section">
            <div className="footer__community-title">Join the community</div>
            <div className="footer__community-text">
              Interact with instructors, students, and IT experts in the Amna's Network Community!
            </div>
            <div className="footer__community-button">
              <a
                href="https://community.ine.com/"
                target="_blank"
                rel="noopener nofollow"
                className="btn btn--primary footer__community-button-cta"
              >
                Amna's Network Community
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="footer__bottom-wrapper">
        <section className="footer__bottom">
          <div className="footer__all-rights-reserved">
            © 2025 Amna's Network. All Rights Reserved. All logos, trademarks and registered trademarks are the property of their respective owners.
          </div>

          <div className="footer__links-policies">
            <a
              target="_blank"
              rel="noopener nofollow"
              href="/"
              className="footer__links-policies-item"
            >
              Terms of service
            </a>
            <a
              target="_blank"
              rel="noopener nofollow"
              href="/"
              className="footer__links-policies-item"
            >
              Privacy Policy
            </a>
          </div>

          <div className="footer__links-social">
            <a
              target="_blank"
              rel="noopener nofollow"
              href="https://www.facebook.com/profile.php?id=61562132672245&mibextid=ZbWKwL"
              className="footer__links-social-item"
            >
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer__links-social-item--facebook">
                <path d="M16.5 8c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 4 2.9 7.3 6.7 7.9v-5.6h-2V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V8h2.2l-.4 2.3H9.6V16c4-.6 6.9-4 6.9-8z" fill="#fff"></path>
              </svg>
            </a>

            <a
              target="_blank"
              rel="noopener nofollow"
              href="https://x.com/AmnaNetwork?t=te-rjS1wEzFxyJ0ki6fnyg&s=09"
              className="footer__links-social-item"
            >
              <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer__links-social-item--twitter">
                <path d="M16.5 2c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-2.1 0-3.7 2-3.2 4-2.7-.1-5.1-1.4-6.8-3.4-.9 1.5-.4 3.4 1 4.4-.5 0-1-.2-1.5-.4C1 6.6 2.1 8 3.6 8.4c-.5.1-1 .2-1.5.1.4 1.3 1.6 2.3 3.1 2.3-1.2.9-3 1.4-4.7 1.2 1.5.9 3.2 1.5 5 1.5 6.1 0 9.5-5.1 9.3-9.8.7-.4 1.3-1 1.7-1.7z" fill="#fff"></path>
              </svg>
            </a>

            <a
              target="_blank"
              rel="noopener nofollow"
              href="https://www.linkedin.com/in/amna-s-network-1b992434b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
              className="footer__links-social-item"
            >
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer__links-social-item--linkedin">
                <path d="M4.1 16H.7V5.3h3.4V16zM2.4 3.8C1.3 3.8.5 3 .5 1.9.5.8 1.4 0 2.4 0c1.1 0 1.9.8 1.9 1.9 0 1.1-.8 1.9-1.9 1.9zM16.5 16h-3.4v-5.8c0-1.7-.7-2.2-1.7-2.2s-2 .8-2 2.3V16H6V5.3h3.2v1.5c.3-.7 1.5-1.8 3.2-1.8 1.9 0 3.9 1.1 3.9 4.4V16h.2z" fill="#fff"></path>
              </svg>
            </a>

            <a
              target="_blank"
              rel="noopener nofollow"
              href="https://www.tiktok.com/@amnas.network?_r=1&_d=ek266e7e29c704&sec_uid=MS4wLjABAAAAwpis6e7uGzZwgPEhnwAeAZjX-Oz7D19RlCyOmBWHR5LmLZp4POks4fRaE0FI9pYz&share_author_id=7336779699157238789&sharer_language=en&source=h5_m&u_code=eci3b607g6l960&timestamp=1753422705&user_id=7336779699157238789&sec_user_id=MS4wLjABAAAAwpis6e7uGzZwgPEhnwAeAZjX-Oz7D19RlCyOmBWHR5LmLZp4POks4fRaE0FI9pYz&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7526449760452003602&share_link_id=e8eb9bb4-b993-4251-8f9f-a5f535270b96&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1 "
              className="footer__links-social-item"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="footer__links-social-item--tiktok"
                fill="white"
              >
                <path d="M224 80.6a48.2 48.2 0 0 1-28.8-9.6 47.8 47.8 0 0 1-19.2-38V28a12 12 0 0 0-12-12h-28a12 12 0 0 0-12 12v124a28 28 0 1 1-20.4-27A12 12 0 0 0 116 113V84a12 12 0 0 0-14.7-11.7A72 72 0 1 0 164 140V112a72.6 72.6 0 0 0 28 5.7 12 12 0 0 0 12-12V92a12 12 0 0 0-12-11.4z" />
              </svg>

            </a>

            <a
              target="_blank"
              rel="noopener nofollow"
              href="https://www.instagram.com/amnasnetwork?igsh=eG56MWt0emduYnVp"
              className="footer__links-social-item"
            >
              <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer__links-social-item--instagram">
                <path d="M8.5 2.2h3.4c.8 0 1.2.2 1.5.3.4.2.7.3 1 .6.3.3.5.6.6 1 .1.3.2.7.3 1.5v6.8c0 .8-.2 1.2-.3 1.5-.2.4-.3.7-.6 1-.3.3-.6.5-1 .6-.3.1-.7.2-1.5.3H5.1c-.8 0-1.2-.2-1.5-.3-.4-.2-.7-.3-1-.6-.3-.3-.5-.6-.6-1-.1-.3-.2-.7-.3-1.5V9 5.6c0-.8.2-1.2.3-1.5.2-.4.3-.7.6-1 .3-.3.6-.5 1-.6.3-.1.7-.2 1.5-.3h3.4zm0-1.5H5.1c-.9 0-1.5.2-2 .4s-1 .5-1.5 1-.7.9-1 1.5c-.2.5-.3 1.1-.4 2v6.8c0 .9.2 1.5.4 2s.5 1 1 1.5.9.7 1.5 1c.5.2 1.1.3 2 .4h6.8c.9 0 1.5-.2 2-.4s1-.5 1.5-1 .7-.9 1-1.5c.2-.5.3-1.1.4-2V9 5.6c0-.9-.2-1.5-.4-2s-.5-1-1-1.5-.9-.7-1.5-1c-.5-.2-1.1-.3-2-.4H8.5z" fill="#fff"></path>
                <path d="M8.5 4.7C6.1 4.7 4.2 6.6 4.2 9s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3-1.9-4.3-4.3-4.3zm0 7.1C7 11.8 5.7 10.6 5.7 9c0-1.5 1.2-2.8 2.8-2.8 1.5 0 2.8 1.2 2.8 2.8 0 1.5-1.3 2.8-2.8 2.8zM12.9 5.6a1 1 0 100-2 1 1 0 000 2z" fill="#fff"></path>
              </svg>
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;