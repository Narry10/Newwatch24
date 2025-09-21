
import Link from 'next/link'

export default function Categories() {
    return (
        <>
            <section className="categories-section padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="categorie-item">
                                <div className="categorie-thumb">
                                    <Link href="/blog-default"><img src="/assets/img/images/categori-img-1.jpg" alt="img" /></Link>
                                </div>
                                <div className="categorie-content">
                                    <span>3 Post</span>
                                    <h3 className="categorie-title"><Link href="/blog-default">Business Post</Link></h3>
                                    <Link href="/blog-default" className="default-btn categorie-btn">See All Post</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="categorie-item">
                                <div className="categorie-thumb">
                                    <Link href="/blog-default"><img src="/assets/img/images/categori-img-2.jpg" alt="img" /></Link>
                                </div>
                                <div className="categorie-content">
                                    <span>3 Post</span>
                                    <h3 className="categorie-title"><Link href="/blog-default">Business Post</Link></h3>
                                    <Link href="/blog-default" className="default-btn categorie-btn">See All Post</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="categorie-item">
                                <div className="categorie-thumb">
                                    <Link href="/blog-default"><img src="/assets/img/images/categori-img-3.jpg" alt="img" /></Link>
                                </div>
                                <div className="categorie-content">
                                    <span>3 Post</span>
                                    <h3 className="categorie-title"><Link href="/blog-default">Business Post</Link></h3>
                                    <Link href="/blog-default" className="default-btn categorie-btn">See All Post</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="categorie-item">
                                <div className="categorie-thumb">
                                    <Link href="/blog-default"><img src="/assets/img/images/categori-img-8.jpg" alt="img" /></Link>
                                </div>
                                <div className="categorie-content">
                                    <span>3 Post</span>
                                    <h3 className="categorie-title"><Link href="/blog-default">Business Post</Link></h3>
                                    <Link href="/blog-default" className="default-btn categorie-btn">See All Post</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
