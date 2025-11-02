import Image from 'next/image';

import { GoogleAuthButton, WithEmailAuthButton } from '@/features/auth';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';

import s from './page.module.scss';

function SignUpMain() {
  return (
    <div className={s.pageContainer}>
      <div className={s.cover}>
        <div className={s.background}>
          <Image src="/cover.png" alt="cover" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={s.wrapper}>
          <div className={s.logoCover}>
            <h1>Modsen</h1>
            <Image src="/logo.png" alt="logo" fill style={{ objectFit: 'contain', zIndex: 2 }} />
          </div>
        </div>
      </div>

      <div className={s.content}>
        <div className={s.logo}>
          <TwitterLogo />
        </div>

        <h1 className={s.heading1}>Happening now</h1>

        <div className={s.contentInfo}>
          <p className={s.heading2}>Join Twitter today</p>

          <GoogleAuthButton />
          <WithEmailAuthButton />

          <p className={s.text}>
            By signing up you agree to the <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>, including <a href="#">Cookie Use</a>.
          </p>

          <p className={s.text}>
            Already have an account? <a href="#">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpMain;
