
import Link from 'next/link'

export default function FashionBlog1() {
    return (
        <>
            <section className="fashion-blog-area padding">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">Most Read</span></h3>
                        </div>
                        <div className="right-btn">
                            <Link href="/categories" className="default-btn">See More</Link>
                        </div>
                    </div>
                    <div className="row justify-content-center fashion-blog-top">
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/fasion-post-1.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-pink">Lifestyle</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Timeless and Chic Outfits for Your an Endless Wardrobe</Link>
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
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/fasion-post-2.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-pink">Lifestyle</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Accessorizing for Impact with Top Trends of the Fall
                                            Season</Link>
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
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/fasion-post-3.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-pink">Lifestyle</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Your Body Type Flatter Your Figure with man Style</Link>
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
                    <div className="row fashion-blog-bottom justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="list-post-card">
                                <div className="post-img">
                                    <Link href="/single-post-1"><img src="/assets/img/post/fasion-post-4.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <h3 className="title">
                                        <Link href="/single-post-1">Fashion Essentials the Top Accessories</Link>
                                    </h3>
                                    <span>July 29, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="list-post-card">
                                <div className="post-img">
                                    <Link href="/single-post-1"><img src="/assets/img/post/fasion-post-5.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <h3 className="title">
                                        <Link href="/single-post-1">Confidence and Authority through Tailored Fashion</Link>
                                    </h3>
                                    <span>July 29, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="list-post-card card-2">
                                <div className="post-img">
                                    <Link href="/single-post-1"><img src="/assets/img/post/fasion-post-6.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <h3 className="title">
                                        <Link href="/single-post-1">Wardrobe Refreshing Your Style for a New Season</Link>
                                    </h3>
                                    <span>July 29, 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
