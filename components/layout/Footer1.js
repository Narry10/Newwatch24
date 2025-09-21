import Link from "next/link";

export default function Footer1() {
return (
    <>
        <footer className="footer-section">
            <div className="footer-top padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-item">
                                <h3 className="footer-header">About Us</h3>
                                <div className="footer-content">
                                    <p className="desc">
                                        NEWWATCH24 - Your daily source for movie trailers,
                                        entertainment news, and trending stories. Stay updated
                                        with the latest in cinema and digital content.
                                    </p>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                         
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-item">
                                <h3 className="footer-header">Contact</h3>
                                <div className="footer-content">
                                    <ul className="contact-list">
                                        <li>
                                            Email Us:{" "}
                                            <Link href="mailto:contacts.usnewswatch24@gmail.com">
                                                contacts.usnewswatch24@gmail.com
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ./ footer-top */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-wrap">
                        <div className="footer-logo">
                            <Link href="/">
                                <img src="/assets/img/logo/logo-3.png" alt="logo" />
                            </Link>
                        </div>
                        <ul className="footer-menu-list">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/categories">Categories</Link>
                            </li>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* ./ footer-bottom */}
            <div className="copyright-area">
                <div className="container">
                    <div className="copyright-wrap">
                        <p>
                            <span>newwatch24 </span> {new Date().getFullYear()}. All Rights
                            Reserved.
                        </p>
                        <ul className="list">
                            <li>
                                <Link href="/privacy-policy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="/dmca">DMCA</Link>
                            </li>
                            <li>
                                <Link href="/about">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* ./ copyright-area */}
        </footer>
    </>
);
}
