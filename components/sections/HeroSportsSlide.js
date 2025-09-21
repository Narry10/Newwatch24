import Link from 'next/link'
import { useFormattedDate } from '@/hooks/useFormattedDate'

export default function HeroSportsSlide({ post, activeIdx, index }) {
  const formattedDate = useFormattedDate(post.publishAt)

  return (
    <div className="relative h-full flex items-end">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0">
        <img
          src={post.featuredImageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.6)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute left-0 right-0 bottom-0 md:left-8 md:right-auto md:bottom-8 md:max-w-[720px] p-4 md:p-0">
        <div className="backdrop-blur-xl bg-white/10 border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.35)] rounded-2xl md:rounded-3xl p-4 md:p-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-emerald-500 to-lime-500 shadow">
              {post.category ?? 'Sports'}
            </span>
            {post.publishAt && (
              <time className="text-white/80 text-xs">
                {formattedDate}
              </time>
            )}
          </div>

          <h1 className="mt-3 md:mt-4 text-white font-extrabold leading-tight text-2xl sm:text-3xl md:text-5xl drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]">
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </h1>

          <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-2">
            <Link
              href={`/category/${post.category?.toLowerCase()}`}
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white/90 border border-white/20 hover:bg-white/10 transition-colors"
            >
              {post.category}
            </Link>
          </div>
        </div>
      </div>

      {/* Loading Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
        <div 
          className={`h-full bg-gradient-to-r from-emerald-400 to-lime-400 transition-all duration-300 ${
            activeIdx === index ? 'w-full' : 'w-0'
          }`}
          style={{ width: activeIdx === index ? '100%' : '0%' }}
        />
      </div>
    </div>
  )
}