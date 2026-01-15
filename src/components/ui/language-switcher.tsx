"use client"

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

const locales = {
  bs: { name: 'Bosanski', flag: '🇧🇦' },
  en: { name: 'English', flag: '🇬🇧' }
} as const;

export function LanguageSwitcher() {
  const locale = useLocale() as 'bs' | 'en';
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: 'bs' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-3 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-lg transition-all duration-200"
        >
          <span className="text-xl mr-1">{locales[locale].flag}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#1a0b2e] border-white/10 backdrop-blur-xl"
      >
        {Object.entries(locales).map(([key, { name, flag }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleLocaleChange(key as 'bs' | 'en')}
            className={`flex items-center gap-2 cursor-pointer text-white hover:bg-white/10 ${
              locale === key ? 'bg-white/5' : ''
            }`}
          >
            <span className="text-xl">{flag}</span>
            <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
