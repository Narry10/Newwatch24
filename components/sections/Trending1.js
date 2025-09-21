'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
    spaceBetween: 90,
    slidesPerGroup: 1,
    loop: true,
    autoplay: true,
    // grabcursor: true,
    speed: 400,
    breakpoints: {
        320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 25,
        },
        767: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            slidesPerGroup: 1,
        },
        1200: {
            slidesPerView: 3,
            slidesPerGroup: 1,
        },
    },
}

export default function Trending1() {
    return (
        <>
            <section className="trending-area">
                <div className="container">
                    <div className="trending-carousel swiper">
                        <Swiper {...swiperOptions} className="swiper-wrapper swiper-container">
                            <SwiperSlide>
                                <div className="trending-item">
                                    <div className="trending-thumb">
                                        <Link href="/single-post-1" ><img src="/assets/img/trending/trending-img-1.jpg" alt="trend" /></Link>
                                    </div>
                                    <div className="post-content trending-content">
                                        <span>Business</span>
                                        <h4 className="title trending-title">
                                            <Link href="/single-post-1">What Happens When Fed Raises any Rates?</Link>
                                        </h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="trending-item">
                                    <div className="trending-thumb">
                                        <Link href="/single-post-1" ><img src="/assets/img/trending/trending-img-2.jpg" alt="trend" /></Link>
                                    </div>
                                    <div className="post-content trending-content">
                                        <span>Sports</span>
                                        <h4 className="title trending-title">
                                            <Link href="/single-post-1">The Big Project to Link UK to Huge a Solar Farm.</Link>
                                        </h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="trending-item">
                                    <div className="trending-thumb">
                                        <Link href="/single-post-1" ><img src="/assets/img/trending/trending-img-3.jpg" alt="trend" /></Link>
                                    </div>
                                    <div className="post-content trending-content">
                                        <span>Lifestyle</span>
                                        <h4 className="title trending-title">
                                            <Link href="/single-post-1">The sim plest keep your family problem now.</Link>
                                        </h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="trending-item">
                                    <div className="trending-thumb">
                                        <Link href="/single-post-1" ><img src="/assets/img/trending/trending-img-4.jpg" alt="trend" /></Link>
                                    </div>
                                    <div className="post-content trending-content">
                                        <span>Health</span>
                                        <h4 className="title trending-title">
                                            <Link href="/single-post-1">EV Makers to Sparking Mobility Revolution</Link>
                                        </h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}
