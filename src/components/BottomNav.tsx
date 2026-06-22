"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Tag, MessageCircle, User } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/sale", label: "Sale", icon: Tag },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/profil", label: "Profil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-ink border-t border-white/10">
      <div className="max-w-lg mx-auto flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-jakarta transition-colors ${
                active ? "text-saffron" : "text-white/50 hover:text-white/80"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "text-saffron" : ""}
              />
              <span className="font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
