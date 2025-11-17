'use client';

import { FC } from 'react';

import { AvaImage } from '@/entities/User/ui/AvaImage';
import { UserNameBlock } from '@/entities/User/ui/UserNameBlock';
import { ROUTES } from '@/shared/constants';
import { users } from '@/shared/constants/exampleUserData';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import {
  BellIcon,
  BookmarksIcon,
  ExploreIcon,
  HomeIcon,
  ListsIcon,
  MessageIcon,
  MoreIcon,
  ProfileIcon,
} from '@/shared/ui/Icons/SVG';
import { SearchInput } from '@/shared/ui/SearchInput';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';
import { AltTweetButton } from '@/widgets/Navbar/AltTweetButton';
import { NavButton } from '@/widgets/Navbar/NavButton';

const links = {
  HOME: { i: HomeIcon, t: 'Home' },
  EXPLORE: { i: ExploreIcon, t: 'Explore' },
  NOTIFICATION: { i: BellIcon, t: 'Notification' },
  MESSAGES: { i: MessageIcon, t: 'Messages' },
  BOOKMARKS: { i: BookmarksIcon, t: 'Bookmarks' },
  LISTS: { i: ListsIcon, t: 'Lists' },
  PROFILE: { i: ProfileIcon, t: 'Profile' },
  MORE: { i: MoreIcon, t: 'More' },
};

export const Navbar: FC<{ isOpen: boolean; toggleNavAction: () => void }> = ({
  isOpen,
  toggleNavAction,
}) => {
  const user = users[0];

  const handleClick = () => {
    console.log('New tweet');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden z-10 ${
          isOpen ? 'opacity-90 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleNavAction}
      ></div>

      <nav
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out md:sticky md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={toggleNavAction}
          className="md:hidden absolute z-20 top-2 right-2 bg-gray-800 bg-opacity-75 hover:bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition cursor-pointer"
        >
          ×
        </button>

        <div className="h-full flex flex-col px-4 py-3">
          <div className="mb-6 md:block">
            <TwitterLogo />
          </div>

          <div className="mb-4 md:hidden">
            <SearchInput onSearch={() => {}} placeholder="Search Twitter" />
          </div>

          <div className="flex flex-col space-y-2 overflow-y-auto">
            <NavButton Icon={links.HOME.i} title={links.HOME.t} href={ROUTES.HOME} />
            <NavButton Icon={links.EXPLORE.i} title={links.EXPLORE.t} href={ROUTES.EXPLORE} />
            <NavButton
              Icon={links.NOTIFICATION.i}
              title={links.NOTIFICATION.t}
              href={ROUTES.NOTIFICATION}
            />
            <NavButton Icon={links.MESSAGES.i} title={links.MESSAGES.t} href={ROUTES.MESSAGES} />
            <NavButton Icon={links.BOOKMARKS.i} title={links.BOOKMARKS.t} href={ROUTES.BOOKMARKS} />
            <NavButton Icon={links.LISTS.i} title={links.LISTS.t} href={ROUTES.LISTS} />
            <NavButton Icon={links.PROFILE.i} title={links.PROFILE.t} href={ROUTES.PROFILE} />
            <NavButton Icon={links.MORE.i} title={links.MORE.t} href={ROUTES.MORE} />
          </div>

          <div className="mt-4 mb-6 hidden md:block">
            <Button variant={ButtonType.PRIMARY} onClick={handleClick}>
              New tweet
            </Button>
          </div>

          <div className="mt-4 mb-6 md:hidden">
            <AltTweetButton handleClick={handleClick} />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center gap-3 mb-4 px-2">
              <AvaImage avaUrl={user.avaUrl} size={40} />
              <UserNameBlock
                firstName={user.firstName}
                secondName={user.secondName}
                telegramLink={user.telegramLink}
              />
            </div>
            <Button variant={ButtonType.SECONDARY} onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};
