
import Link from 'next/link'

export default function HeroPost2() {
    return (
        <>
            <section className="hero-post-area area-2 bg-grey-2">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">Most Read</span></h3>
                        </div>
                        <div className="right-btn">
                            <Link href="/categories" className="default-btn">See More</Link>
                        </div>
                    </div>
                    <div className="post-area-wrap wrap-2">
                        <div className="post-carousel-card">
                            <div className="post-carousel-thumb">
                                <Link href="/single-post-1"><img src="/assets/img/post/read-post-img-1.jpg" alt="img" /></Link>
                            </div>
                            <div className="post-carousel-content">
                                <Link href="/single-post-1" className="card-btn bg-green">Travel</Link>
                                <h3 className="title">
                                    <Link href="/single-post-2">Extraordinary Snoqualmie Falls and Seattle Tour</Link>
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
                                        <Link href="/single-post-1"><img src="/assets/img/post/post-img-3.jpg" alt="post" /></Link>
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
                                        <Link href="/single-post-1"><img src="/assets/img/post/post-img-4.jpg" alt="post" /></Link>
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
                            <div className="list-post-area list-2">
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-6.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Season Courses and Salads wow!</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-7.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">Laptops for Working from Remote Work</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-8.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Power of Big Data in Discovery.</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-9.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">A Guide to Animating Mobile Data.</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-10.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">Marathon Paces for Racing Distance</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-11.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">There May Be More Than You Realize</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
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
