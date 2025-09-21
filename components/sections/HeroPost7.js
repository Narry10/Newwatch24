"use client";

import { useEffect, useMemo, useState } from "react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules"; // 👈 thêm Autoplay
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSlide from "./HeroSlide";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { useLatestPosts } from "@/hooks/useLatestPosts";

const fixContent = {
  id: "fixed-1",
  slug: "super-bowl-lix-2025-when-football-meets-a-global-stage",
  title: "Super Bowl LIX 2025: When Football Meets a Global Stage",
  featuredImageUrl: "/assets/img/images/supperbowl.png",
  category: "Sports",
  createdBy: "David Bin",
  publishAt: "2024-07-29T10:00:00",
  fixed: true,
};

export default function NewsHeroShowcase() {
  const [thumbs, setThumbs] = useState(null);
  const { posts = [], isLoading, isError } = useLatestPosts();

  const slides = useMemo(() => {
    const cleanPosts = Array.isArray(posts) ? posts : [];
    return [fixContent, ...cleanPosts];
  }, [posts]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (isError) return null;

  return (
    <section className="hero-showcase container">
      {/* Top slider */}
      <div className="hero-top">
        <Swiper
          spaceBetween={12}
          navigation={false}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]} // 👈 thêm Autoplay
          thumbs={{
            swiper: thumbs && !thumbs.destroyed ? thumbs : null,
            slideThumbActiveClass: "swiper-slide-thumb-active",
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }} // 👈 autoplay
          className="hero-top-swiper"
          onSlideChange={(swiper) => {
            if (thumbs && !thumbs.destroyed && swiper?.realIndex != null) {
              thumbs.slideTo(swiper.realIndex);
            }
          }}
        >
          {slides.map((post) => (
            <SwiperSlide key={post.id}>
              <HeroSlide post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom thumb slider */}
      <div className="hero-bottom">
        <Swiper
          onSwiper={(swiper) => {
            if (swiper?.slides?.length > 0) setThumbs(swiper);
          }}
          spaceBetween={10}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs, Autoplay]} // 👈 thêm Autoplay
          className="hero-bottom-swiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }} // 👈 autoplay
        >
          {slides.map((post, idx) => (
            <SwiperSlide key={`thumb-${post.id}`}>
              <div className="sports-thumb">
                <span className="card-btn bg-red">#{idx + 1} Ranking</span>
                <h3 className="sports-thumb-title">{post.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
