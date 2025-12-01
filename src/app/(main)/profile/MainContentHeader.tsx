import { FC, ReactNode } from 'react';

import { ButtonWithScaling } from '@/shared/ui/Buttons/ButtonWithScaling';
import { BurgerIcon } from '@/shared/ui/Icons/SVG';
import { ThemeToggleButton } from '@/shared/ui/ThemeToggleButton';

interface HeaderProps {
  handleBurgerClick: () => void;
  children?: ReactNode;
}

export const MainContentHeader: FC<HeaderProps> = ({ handleBurgerClick, children }) => {
  return (
    <div className="py-4 px-6 flex justify-between">
      {children}
      <ButtonWithScaling handleClick={handleBurgerClick} className="focus:outline-none md:hidden">
        <BurgerIcon height={32} width={20} />
      </ButtonWithScaling>
      <ThemeToggleButton className="hidden md:block" />
    </div>
  );
};
