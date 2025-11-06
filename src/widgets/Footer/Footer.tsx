import { CustomLink } from '@/shared/ui/CustomLink';

type FooterLink = { href: string; name: string };
const FOOTER_LINKS: FooterLink[] = [
  { href: '/about', name: 'About' },
  { href: '/help-center', name: 'Help Center' },
  { href: '/terms', name: 'Terms of Service' },
  { href: '/privacy', name: 'Privacy Policy' },
  { href: '/cookies', name: 'Cookie Policy' },
  { href: '/ads-info', name: 'Ads info' },
  { href: '/blog', name: 'Blog' },
  { href: '/status', name: 'Status' },
  { href: '/careers', name: 'Careers' },
  { href: '/brand-resources', name: 'Brand Resources' },
  { href: '/advertising', name: 'Advertising' },
  { href: '/marketing', name: 'Marketing' },
  { href: '/twitter-for-business', name: 'Twitter for Business' },
  { href: '/developers', name: 'Developers' },
  { href: '/settings', name: 'Settings' },
];

export function Footer() {
  return (
    <div className="flex justify-center flex-wrap text-xs py-5">
      {FOOTER_LINKS.map((link) => (
        <CustomLink
          key={link.href}
          href={link.href}
          name={link.name}
          additionalClassName={'mx-2'}
        />
      ))}
    </div>
  );
}
