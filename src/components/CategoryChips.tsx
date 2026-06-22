"use client";

import { CATEGORIES } from "@/types";

interface CategoryChipsProps {
  selected: string;
  onChange: (cat: string) => void;
}

export default function CategoryChips({ selected, onChange }: CategoryChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2">
      {CATEGORIES.map((cat) => {
        const active = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold font-jakarta transition-all border ${
              active
                ? "bg-ink text-white border-ink"
                : "bg-white text-ink border-ink/20 hover:border-ink/40"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
