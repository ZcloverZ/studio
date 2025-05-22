import Link from 'next/link';
import { BookOpen, Star, Layers, Book, Globe } from 'lucide-react';
import { useState, useRef } from 'react';

const genreGroups = [
  {
    title: 'داستانی',
    icon: <BookOpen className="h-6 w-6 text-green-400" />,
    genres: [
      { name: 'فانتزی', slug: 'Fantasy' },
      { name: 'کلاسیک', slug: 'Classic' },
      { name: 'ویران‌شهری', slug: 'Dystopian' },
    ],
  },
  {
    title: 'غیرداستانی',
    icon: <Globe className="h-6 w-6 text-blue-400" />,
    genres: [
      { name: 'خودسازی', slug: 'Self-Help' },
      { name: 'علمی', slug: 'Science' },
    ],
  },
  {
    title: 'محبوب',
    icon: <Star className="h-6 w-6 text-yellow-400" />,
    genres: [
      { name: 'پرفروش', slug: 'Bestseller' },
      { name: 'جدید', slug: 'New' },
    ],
  },
];

const trendingGenres = [
  { name: 'فانتزی', slug: 'Fantasy' },
  { name: 'پرفروش', slug: 'Bestseller' },
  { name: 'خودسازی', slug: 'Self-Help' },
];

export default function GenreMegaMenu() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleGroups = showAll ? genreGroups : genreGroups.slice(0, 2);

  return (
    <div ref={containerRef} className="w-full flex flex-col space-y-6">
      <div className="bg-green-900/30 p-4 rounded-xl shadow-lg border border-green-700/50">
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-5 w-5 text-yellow-400 drop-shadow" />
          <h3 className="text-md font-semibold text-green-100">محبوب‌ترین ژانرها</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingGenres.map((genre) => (
            <Link
              key={genre.slug}
              href={`/genre/${genre.slug}`}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-700/50 text-green-100 text-xs font-medium hover:bg-green-600/70 hover:text-white transition-colors shadow-sm border border-green-600/80"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {visibleGroups.map((group) => (
          <div key={group.title} className="bg-green-900/30 rounded-xl p-4 shadow-lg border border-green-700/50">
            <div className="flex items-center mb-3 gap-3">
              {group.icon}
              <h4 className="font-bold text-lg text-green-100">{group.title}</h4>
            </div>
            <ul className="space-y-2">
              {group.genres.map((genre) => (
                <li key={genre.slug}>
                  <Link
                    href={`/genre/${genre.slug}`}
                    className="flex items-center px-3 py-2.5 rounded-lg transition-colors text-sm text-green-200 hover:text-white hover:bg-green-700/50 group border border-transparent hover:border-green-600/80"
                  >
                    <Book className="h-5 w-5 me-3 text-green-400 transition-transform duration-150 group-hover:scale-105 group-hover:text-green-300" />
                    <span>{genre.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {!showAll && genreGroups.length > visibleGroups.length && (
        <div className="flex justify-center pt-2">
          <button
            className="px-5 py-2.5 rounded-lg bg-green-700/60 text-green-100 text-sm font-semibold hover:bg-green-600/80 hover:text-white transition-colors shadow-md border border-green-600/90"
            onClick={() => setShowAll(true)}
          >
            نمایش همه دسته‌بندی‌ها
          </button>
        </div>
      )}
    </div>
  );
} 