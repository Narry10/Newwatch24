
'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 20,
    slidesPerGroup: 1,
    direction: 'vertical',
    loop: true,
    navigation: {
        nextEl: ".news-carousel .swiper-prev",
        prevEl: ".news-carousel .swiper-next",
    },
    autoplay: {
        delay: 4000,
        reverseDirection: true,
        disableOnInteraction: false,
    },
    // grabcursor: true,
    speed: 400,
    effect: 'slide',
}
export default function News() {
    return (
        <>
            <section className="news-area">
                <div className="container">
                    <div className="news-carousel swiper">
                        <Swiper {...swiperOptions} className="swiper-wrapper">
                            <SwiperSlide>
                                <div className="hero-text">
                                    <span className="news"><img src="/assets/img/images/news-icon.png" alt="icon" />Top News</span>
                                    <span>The Improbable Rise and Savage Fall of Siegfried. How My Phone’s Most Annoying Feature
                                        Saved My
                                        Life</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="hero-text">
                                    <span className="news"><img src="/assets/img/images/news-icon.png" alt="icon" />Top News</span>
                                    <span>The Improbable Rise and Savage Fall of Siegfried. How My Phone’s Most Annoying Feature
                                        Saved My
                                        Life</span>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div className="swiper-arrow">
                            <div className="swiper-nav swiper-next"><i className="las la-angle-left" /></div>
                            <div className="swiper-nav swiper-prev"><i className="las la-angle-right" /></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
