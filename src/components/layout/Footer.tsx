export default function Footer() {
  return (
    <footer className="relative bg-[#022d2bcc] backdrop-blur-xl border-t-4 border-green-500/70 shadow-[0_-8px_32px_0_rgba(2,45,43,0.15)] mt-16 rounded-t-3xl overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-green-700 rounded-b-full blur-sm opacity-80" />
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-block">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="8" width="28" height="20" rx="7" fill="url(#footerGreenGrad)" />
              <path d="M18 12 Q25 15 18 20 Q11 25 18 28" stroke="#a7f3d0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <ellipse cx="25" cy="13" rx="2.2" ry="1.1" fill="#22c55e" transform="rotate(-20 25 13)" />
              <defs>
                <linearGradient id="footerGreenGrad" x1="4" y1="8" x2="32" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#022d2b" />
                  <stop offset="1" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="text-2xl font-black text-white tracking-tight drop-shadow-lg select-none font-sans">سبز</span>
        </div>
        <nav className="flex flex-wrap gap-6 text-green-100 text-lg font-bold">
          <a href="/" className="hover:text-green-400 transition-colors">خانه</a>
          <a href="/genre/Fiction" className="hover:text-green-400 transition-colors">ژانرها</a>
          <a href="/cart" className="hover:text-green-400 transition-colors">سبد خرید</a>
          <a href="mailto:info@sabz.com" className="hover:text-green-400 transition-colors">ارتباط با ما</a>
        </nav>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="اینستاگرام" className="text-green-300 hover:text-green-400 transition-colors">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="6" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="7" r="1.5" fill="currentColor"/></svg>
          </a>
          <a href="https://t.me" target="_blank" rel="noopener" aria-label="تلگرام" className="text-green-300 hover:text-green-400 transition-colors">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M21 4L3 12l5 2 2 5 3-4 4 3 4-14z" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
          </a>
        </div>
      </div>
      <div className="text-center text-green-200 text-sm py-4 bg-[#022d2b]/80 border-t border-green-900/40">
        <span>&copy; {new Date().getFullYear()} سبز. تمام حقوق محفوظ است.</span>
      </div>
    </footer>
  );
}
