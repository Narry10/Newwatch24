"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css"; import "swiper/css/navigation"; import "swiper/css/pagination";

const opts = {
  modules:[Autoplay,Pagination,Navigation],
  slidesPerView:4, spaceBetween:16, loop:false, autoplay:true, speed:600,
  navigation:{ nextEl:".trailers-swiper-next", prevEl:".trailers-swiper-prev" },
  breakpoints:{320:{slidesPerView:1.1,spaceBetween:12},640:{slidesPerView:2,spaceBetween:12},1024:{slidesPerView:3,spaceBetween:14},1280:{slidesPerView:4,spaceBetween:16}}
};

const Iframe = ({ id, title }) => (
  <div className="media">
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`}
      title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" width="100%" height="100%"
    />
  </div>
);

export default function HotTrailersClient({ items=[] }) {
  const [playing, setPlaying] = useState(items[0]?.id || null);
  useEffect(()=> setPlaying(items[0]?.id || null), [items]);

  if (!items.length) return null;

  return (
    <Swiper {...opts}>
      {items.map((v,i)=>(
        <SwiperSlide key={v.id}>
          <article className="trailer-card">
            {playing === v.id ? (
              <Iframe id={v.id} title={v.title}/>
            ) : (
              <button className="media" onClick={()=>setPlaying(v.id)} aria-label={`Play ${v.title}`}>
                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy"/>
              </button>
            )}
            <div className="card-btn bg-red" style={{width:"fit-content"}}># <strong>{i+1} Hot Feed</strong></div>
            <div className="content">
              <h3 className="title">{v.title}</h3>
              <div className="meta">
                <div className="author">by <strong>{v.author||"YouTube"}</strong></div>
                <div className="dot" aria-hidden>•</div>
                <time className="date">
                  {new Date(v.dateISO).toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})}
                </time>
              </div>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
