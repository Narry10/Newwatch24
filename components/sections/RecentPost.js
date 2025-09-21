
import Link from 'next/link'

export default function RecentPost() {
    return (
        <>
            <section className="recent-post-area padding">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">Recent Post</span></h3>
                        </div>
                        <div className="right-btn">
                            <Link href="/categories" className="default-btn">See More</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="news-post-wrap">
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-1.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-blue">Tech</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">The 6 Best &amp; Worst Foods for Your Skin and Health</Link>
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
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-2.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-blue-light">Business</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">Bad Credit Shouldn’t Health Insurance, Experts Say</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/single-post-1">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                            <li><i className="las la-comments" />5</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-3.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-green">Sports</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">How Product Designers Can Gamification for any
                                                Good.</Link>
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
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-4.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-yellow">Food</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">New Must-See Architecture more Designs in Europe</Link>
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
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-5.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-pink">Lifestyle</Link>
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
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="news-post-wrap">
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-6.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-blue">Tech</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">How To Change The Icons For Your Favorite Apps On
                                                MacOS</Link>
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
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-7.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-blue-light">Business</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">How Product Designers Can Gamification for any
                                                Good.</Link>
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
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-8.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-green">Sports</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">Classic Training Programs for Professional NFL
                                                Players</Link>
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
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-9.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-yellow">Food</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">The 6 Best &amp; Worst Foods for Your Skin and Health</Link>
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
                                <div className="post-card news-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/news-post-10.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-pink">Lifestyle</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">Navigation System Doesn Work in Space? We’ll See
                                                works.</Link>
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
                    <div className="recent-post-btn text-center mt-50">
                        <Link href="/blog-layout-3" className="default-btn">Load More</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
