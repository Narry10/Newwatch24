import Link from "next/link";
import ThemeSwitch from "../elements/ThemeSwitch";
import Menu from "./Menu";

export default function Header1({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isSidebar,
  handleSidebar,
  isSearch,
  handleSearch,
}) {
  return (
    <>
      <header className="main-header transparent">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="container">
            <div className="top-bar-wrap">
              <div className="top-bar-left">
                <h4 className="link-title">
                  <span>Explore:</span>
                </h4>
                <ul>
                  <li>
                    <Link href="/categories">What is Newwatch24?</Link>
                  </li>
                  <li>
                    <Link href="/contact">Collaborate with Us</Link>
                  </li>
                  <li>
                    <Link href="/">Top Stories Today</Link>
                  </li>
                </ul>
              </div>
              <div className="top-bar-right">
                <span className="date">
                  <i className="las la-calendar" />
                  Stay Sharp – Updated Daily
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mid Header */}
        <div className="mid-header">
          <div className="container">
            <div className="mid-header-wrap">
              <div className="mid-header-left">
                <ul className="header-social">
                  <li>
                    <Link
                      target="_blank"
                      href="https://www.facebook.com/DailyNewsFan"
                      className="facebook"
                      title="Facebook"
                    >
                      <i className="lab la-facebook-f" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Logo giữ nguyên */}
              <div className="site-logo">
                <Link
                  href="/"
                >
                  <img
                    className="logo-3"
                    src="/assets/img/logo/logo-3.png"
                    alt="logo"
                  />
                </Link>
              </div>

              <div className="mid-header-right">
                <Link
                  href="https://www.facebook.com/DailyNewsFan"
                  className="default-btn header-btn"
                >
                  Join the Feed
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Header */}
        <div className={`${scroll ? "sticky-header sticky-fixed-top" : ""} `}>
          <div className="bottom-header">
            <div className="container">
              <div className="navigation-wrapper">
                <div className="navigation-inner">
                  <div className="sidebar-icon">
                    <button
                      className="sidebar-trigger open"
                      onClick={handleSidebar}
                    >
                      <span />
                      <span />
                      <span />
                    </button>
                  </div>

                  <nav className="navigation-menu">
                    <Menu />
                  </nav>

                  <div className="header-right">
                    <ThemeSwitch />
                    <div
                      className="search-icon dl-search-icon"
                      onClick={handleSearch}
                      title="Search"
                    >
                      <i className="las la-search" />
                    </div>
                    <div
                      className="mobile-menu-icon bg-black p-2 rounded "
                      onClick={handleMobileMenu}
                      title="Menu"
                    >
                      <div className="burger-menu">
                        <div className="line-menu line-half first-line" />
                        <div className="line-menu" />
                        <div className="line-menu line-half last-line" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
