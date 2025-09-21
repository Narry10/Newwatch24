
import Link from 'next/link'

export default function HeroPost3() {
    return (
        <>
            <section className="hero-post-area area-2">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">Travel</span></h3>
                        </div>
                        <div className="right-btn">
                            <Link href="/categories" className="default-btn">See More</Link>
                        </div>
                    </div>
                    <div className="post-area-wrap wrap-2">
                        <div className="post-carousel-card">
                            <div className="post-carousel-thumb">
                                <Link href="/single-post-1"><img src="/assets/img/post/travel-post-1.jpg" alt="img" /></Link>
                            </div>
                            <div className="post-carousel-content">
                                <Link href="/single-post-1" className="card-btn bg-green">Travel</Link>
                                <h3 className="title">
                                    <Link href="/single-post-1">Visit These 10 Sunny &amp; Charming Beach Towns in Viet Nam</Link>
                                </h3>
                                <ul className="post-list">
                                    <li className="author">
                                        by <span><Link href="/author-details">David Bin</Link></span>
                                    </li>
                                    <li className="date">July 29, 2024</li>
                                    <li><i className="las la-comments" />5</li>
                                </ul>
                            </div>
                            {/* /. post-card-content */}
                        </div>
                        <div className="post-area-right">
                            <div className="post-card-wrap wrap-2">
                                <div className="post-card">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/travel-post-2.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-blue">Tech</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">15 ways you can your phone any your productivity</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                            <li><i className="las la-comments" />5</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="post-card">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/travel-post-3.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-pink">Lifestyle</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Power of Big Data in Discovery and Decision
                                                Making</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                            <li><i className="las la-comments" />5</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="post-card-wrap wrap-2">
                                <div className="post-card">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/travel-post-4.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-blue">Tech</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">15 ways you can your phone any your productivity</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                            <li><i className="las la-comments" />5</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="post-card">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/travel-post-5.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-pink">Lifestyle</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Power of Big Data in Discovery and Decision
                                                Making</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                            <li><i className="las la-comments" />5</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
