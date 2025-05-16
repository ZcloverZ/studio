'use client';

import React from 'react'; // Added this line
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
// Removed type React from 'react'; as it's not needed when React is imported directly

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = React.useState(initialQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="جستجو بر اساس عنوان، نویسنده، یا شابک..."
        className="ps-10 py-3 text-base rounded-lg shadow-sm"
        aria-label="جستجوی کتاب"
      />
      <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    </div>
  );
}
