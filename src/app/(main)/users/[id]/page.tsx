'use client';
import { use, useEffect, useState } from 'react';

import { getTweetsByUserId } from '@/api/getTweets';
import { useNav } from '@/app/(main)/context/NavContext';
import { useUser } from '@/app/(main)/context/UserContext';
import { MainContentHeader } from '@/app/(main)/profile/MainContentHeader';
import { Tweet } from '@/entities/Tweet/model/types';
import { TweetList } from '@/entities/Tweet/ui/TweetList';
import { follow } from '@/entities/User/api/follow';
import { getUserById } from '@/entities/User/api/getUserById';
import { unfollow } from '@/entities/User/api/unfollow';
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

  const { user, refreshUser } = useUser();
  const me = user;

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

  const handleFollow = async () => {
    try {
      await follow(id);
      refreshUser();
      const updatedProfileuser = await getUserById(id);
      setProfileUser(updatedProfileuser);
    } catch (error) {
      setError(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollow(id);
      refreshUser();
      const updatedProfileuser = await getUserById(id);
      setProfileUser(updatedProfileuser);
    } catch (error) {
      setError(error);
    }
  };

  const isFollowing = me?.followingIds.includes(Number(id));

  if (profileUser)
    return (
      <div className="h-full border-2 border-[var(--color-content-border)]">
        <MainContentHeader handleBurgerClick={toggleNav}>
          <BackLink />
        </MainContentHeader>
        <CustomErrorMessage error={error} />;
        <UserProfileInfo user={profileUser}>
          <Button
            variant={isFollowing ? ButtonType.SIMPLE : ButtonType.PRIMARY}
            onClick={isFollowing ? handleUnfollow : handleFollow}
            className="h-[35px] text-sm mt-10"
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </UserProfileInfo>
        <TweetList title={'Tweets'} tweets={tweets} users={[profileUser]} />
      </div>
    );
}
