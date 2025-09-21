"use client"
import { formatDate } from "@/helpers/formatDate";
import {
  trailersService
} from "@/modules/trailers/trailers.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-modal-video/css/modal-video.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const YouTubeIframe = ({ id, title, ...props }) => (
  <div className="media" {...props}>
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=0`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      loading="lazy"
      width={"100%"}
    />
  </div>
);

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

export default function HotTrailers() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    trailersService.getAll(10).then((e) => setItems(e.items));
  }, []);

  return (
    <>
      <section className=" padding">
        <div className="container">
          <div className="trailers-swiper">
            <div className="top-area mb-40 title-border">
              <div className="section-heading">
                <h3 className="section-title">
                  <span className="bg-grey-2">Video Feed</span>
                </h3>
              </div>
              <div className="right-btn white">
                <div className="swiper-arrow">
                  <button
                    className="swiper-nav trailers-swiper-prev"
                    aria-label="Previous"
                  >
                    <i className="las la-angle-left" />
                  </button>
                  <button
                    className="swiper-nav trailers-swiper-next"
                    aria-label="Next"
                  >
                    <i className="las la-angle-right" />
                  </button>
                </div>
                <Link href="/blog-default" className="default-btn">
                  See More
                </Link>
              </div>
            </div>

            <Swiper {...swiperOptions}>
              {items.map((v, index) => (
                <SwiperSlide key={v.id}>
                  <Link target="_blank" href={`https://www.youtube.com/watch?v=${v.youtubeLink}`}>
                    <article className="trailer-card">
                      <YouTubeIframe
                        className="w-100"
                        id={v.youtubeLink}
                        title={v.title}
                        autoPlay
                      />
                      <div
                        className="card-btn bg-red "
                        style={{
                          width: "fit-content",
                        }}
                      >
                        # <strong> {index + 1} Hot Feed</strong>
                      </div>
                      {/* Content */}
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
                            {formatDate(v.date)}
                          </time>
                        </div>
                      </div>
                    </article>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <style jsx>{`
        section.padding {
          padding-top: 30px;
          padding-bottom: 10px;
        }

        .trailers-swiper :global(.swiper) {
          padding-bottom: 8px;
        }
        .trailers-swiper :global(.swiper-slide) {
          height: auto;
        }

        /* Top row: tiêu đề + arrow + nút See more */
        .top-area {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: 10px;
        }
        .section-heading .section-title {
          margin: 0;
        }

        .right-btn {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* ======= CARD kiểu glass (no shadow) ======= */
        .trailer-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 16px;
          overflow: hidden;

          /* glass base */
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.14) 0%,
            rgba(255, 255, 255, 0.08) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          /* remove shadow */
          box-shadow: none;

          transition: transform 0.18s ease, border-color 0.18s ease,
            background 0.18s ease;
        }

        /* Dark mode support (nền tối -> glass tối) */
        :global(html[class*="dark"]) .trailer-card,
        :global(body.dark) .trailer-card {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.06) 100%
          );
          border-color: rgba(255, 255, 255, 0.18);
        }

        .trailer-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.35);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.1) 100%
          );
        }

        /* media: giữ tỉ lệ 16:9 + bo góc đồng bộ */
        .media {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }
        .media img,
        .media iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 0;
          display: block;
        }

        /* content */
        .content {
          padding: 10px 14px 14px;
        }
        .title {
          font-size: 16px;
          line-height: 1.25;
          font-weight: 800;
          margin: 0 0 6px;
          color: #111;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        :global(html[class*="dark"]) .title,
        :global(body.dark) .title {
          color: #f5f5f5;
        }

        .meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .meta .author strong {
          color: #111;
        }
        :global(html[class*="dark"]) .meta {
          color: #bdbdbd;
        }
        :global(html[class*="dark"]) .meta .author strong {
          color: #fff;
        }
        .meta .dot {
          opacity: 0.5;
        }

        /* ======= Arrow glass ======= */
        .swiper-arrow {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .swiper-nav {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          color: #111;
          transition: background 0.15s ease, border-color 0.15s ease,
            transform 0.15s ease;
        }
        :global(html[class*="dark"]) .swiper-nav,
        :global(body.dark) .swiper-nav {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(30, 30, 30, 0.35);
        }
        .swiper-nav:hover {
          transform: translateY(-1px);
          border-color: rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.18);
        }
      `}</style>
    </>
  );
}
