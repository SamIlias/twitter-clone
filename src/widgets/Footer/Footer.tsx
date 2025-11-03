export function Footer() {
  const linkClasses =
    'mr-[15px] text-[color:var(--color-text-primary)] no-underline hover:underline';

  return (
    <div className="flex justify-center flex-wrap text-xs py-5">
      <a className={linkClasses} href="#">
        About
      </a>
      <a className={linkClasses} href="#">
        Help Center
      </a>
      <a className={linkClasses} href="#">
        Terms of Service
      </a>
      <a className={linkClasses} href="#">
        Privacy Policy
      </a>
      <a className={linkClasses} href="#">
        Cookie Policy
      </a>
      <a className={linkClasses} href="#">
        Ads info
      </a>
      <a className={linkClasses} href="#">
        Blog
      </a>
      <a className={linkClasses} href="#">
        Status
      </a>
      <a className={linkClasses} href="#">
        Careers
      </a>
      <a className={linkClasses} href="#">
        Brand Resources
      </a>
      <a className={linkClasses} href="#">
        Advertising
      </a>
      <a className={linkClasses} href="#">
        Marketing
      </a>
      <a className={linkClasses} href="#">
        Twitter for Business
      </a>
      <a className={linkClasses} href="#">
        Developers
      </a>
      <a className={linkClasses} href="#">
        Settings
      </a>
    </div>
  );
}
