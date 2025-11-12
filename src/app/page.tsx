import { SignUpMainContent } from '@/app/SignUpMainContent';
import { SignUpMainCover } from '@/app/SignUpMainCover';
import { Footer } from '@/widgets/Footer/Footer';

function SignUpMain() {
  return (
    <div className="w-full min-h-screen h-screen flex flex-col">
      <div className="w-full h-full mx-auto flex flex-col md:flex-row">
        <SignUpMainCover />
        <SignUpMainContent />
      </div>
      <Footer />
    </div>
  );
}

export default SignUpMain;
