"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ModalVideo = dynamic(() => import("react-modal-video"), { ssr: false });
import "react-modal-video/css/modal-video.css";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 4,
  spaceBetween: 16,
  loop: false,
  autoplay: true,
  speed: 600,
  navigation: {
    nextEl: ".trailers-swiper-next",
    prevEl: ".trailers-swiper-prev",
  },
  breakpoints: {
    320: { slidesPerView: 1.1, spaceBetween: 12 },
    640: { slidesPerView: 2, spaceBetween: 12 },
    1024: { slidesPerView: 3, spaceBetween: 14 },
    1280: { slidesPerView: 4, spaceBetween: 16 },
  },
};

export default function HotTrailersClient({ items }) {
  return (
    <Swiper {...swiperOptions}>
      {items.map((v, index) => (
        <SwiperSlide key={v.id}>
          <article className="trailer-card">
            <div className="media">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.youtubeLink}?rel=0&modestbranding=1&autoplay=0`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                width={"100%"}
                height={"100%"}
              />
            </div>
            <div className="card-btn bg-red" style={{ width: "fit-content" }}>
              # <strong>{index + 1} Hot Feed</strong>
            </div>
            <div className="content">
              <h3 className="title">{v.title}</h3>
              <div className="meta">
                <div className="author">
                  by <strong>{v.author || "YouTube"}</strong>
                </div>
                <div className="dot" aria-hidden>
                  •
                </div>
                <time className="date">
                  {new Date(v.dateISO).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
