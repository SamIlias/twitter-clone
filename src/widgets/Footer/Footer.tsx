import { CustomLink } from '@/shared/ui/CustomLink';

type FooterLink = { href: string; name: string };
const FOOTER_LINKS: FooterLink[] = [
  { href: '#', name: 'About' },
  { href: '#', name: 'Help Center' },
  { href: '#', name: 'Terms of Service' },
  { href: '#', name: 'Privacy Policy' },
  { href: '#', name: 'Cookie Policy' },
  { href: '#', name: 'Ads info' },
  { href: '#', name: 'Blog' },
  { href: '#', name: 'Status' },
  { href: '#', name: 'Careers' },
  { href: '#', name: 'Brand Resources' },
  { href: '#', name: 'Advertising' },
  { href: '#', name: 'Marketing' },
  { href: '#', name: 'Twitter for Business' },
  { href: '#', name: 'Developers' },
  { href: '#', name: 'Settings' },
];

export function Footer() {
  return (
    <div className="flex justify-center flex-wrap text-xs py-5">
      {FOOTER_LINKS.map((link) => (
        <CustomLink
          key={link.name}
          href={link.href}
          name={link.name}
          additionalClassName={'mx-2'}
        />
      ))}
    </div>
  );
}
