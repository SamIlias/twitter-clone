import { FC } from 'react';

import { User } from '@/entities/User/model/types';
import { tweets } from '@/shared/constants/exampleUserData';
import { ButtonWithScaling } from '@/shared/ui/Buttons/ButtonWithScaling';
import { BurgerIcon } from '@/shared/ui/Icons/SVG';
import { ThemeToggleButton } from '@/shared/ui/ThemeToggleButton';

interface HeaderProps {
  user: User;
  handleBurgerClick: () => void;
}

export const ProfileContentHeader: FC<HeaderProps> = ({ user, handleBurgerClick }) => {
  const userTweets = tweets.filter((t) => t.userId === user.id);
  return (
    <div className="py-4 px-6 flex justify-between">
      <div>
        <p className="font-bold text-md">{`${user.firstName} ${user.secondName}`}</p>
        <p className="text-sm">{`${userTweets.length} tweets`}</p>
      </div>
      <ButtonWithScaling handleClick={handleBurgerClick} className="focus:outline-none md:hidden">
        <BurgerIcon height={32} width={20} />
      </ButtonWithScaling>
      <ThemeToggleButton className="hidden md:block" />
    </div>
  );
};
