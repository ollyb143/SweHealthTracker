import React from 'react'
import "../footer.css"; 

const Footer = () => {
    return (
        <footer className="footer">
            <aside className="footer-content">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>
        </footer>
    );
};

export default Footer;
