'use client';
import { use, useEffect, useState } from 'react';

import { getTweetsByUserId } from '@/api/getTweets';
import { useNav } from '@/app/(main)/context/NavContext';
import { ProfileContentHeader } from '@/app/(main)/profile/ProfileContentHeader';
import { Tweet } from '@/entities/Tweet/model/types';
import { TweetList } from '@/entities/Tweet/ui/TweetList';
import { getUserById } from '@/entities/User/api/getUserById';
import { User } from '@/entities/User/model/types';
import { UserProfileInfo } from '@/entities/User/ui';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import { BackLink } from '@/shared/ui/Buttons/BackLink';
import { CustomErrorMessage } from '@/shared/ui/ErrorMessage';

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default function UserProfilePage({ params }: UserProfileProps) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [error, setError] = useState<unknown>(null);
  const { id } = use(params);
  const { toggleNav } = useNav();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getUserById(id);
        setProfileUser(profile);
      } catch (error) {
        setError(error);
      }
    };

    if (id) loadProfile();
  }, [id]);

  useEffect(() => {
    const loadTweets = async () => {
      try {
        const tweets = await getTweetsByUserId(Number(id));
        setTweets(tweets);
      } catch (error) {
        setError(error);
      }
    };

    if (id) loadTweets();
  }, [id]);

  const handleFollowClick = () => {};

  if (error) return <CustomErrorMessage error={error} />;

  if (profileUser)
    return (
      <div className="h-full border-2 border-[var(--color-content-border)]">
        <ProfileContentHeader handleBurgerClick={toggleNav}>
          <BackLink />
        </ProfileContentHeader>

        <UserProfileInfo user={profileUser}>
          <Button
            variant={ButtonType.PRIMARY}
            onClick={handleFollowClick}
            className="h-[35px] text-sm mt-10"
          >
            Follow
          </Button>
        </UserProfileInfo>

        <TweetList tweets={tweets} user={profileUser} />
      </div>
    );
}
