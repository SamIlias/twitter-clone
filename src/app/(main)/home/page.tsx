'use client';

import { useEffect, useState } from 'react';

import { getTweets } from '@/api/getTweets';
import { getUsers } from '@/api/getUsers';
import { useNav } from '@/app/(main)/context/NavContext';
import { MainContentHeader } from '@/app/(main)/profile/MainContentHeader';
import { Tweet } from '@/entities/Tweet/model/types';
import { AddTweetForm } from '@/entities/Tweet/ui/AddTweetForm';
import { TweetList } from '@/entities/Tweet/ui/TweetList';
import { User } from '@/entities/User/model/types';
import { CustomErrorMessage } from '@/shared/ui/ErrorMessage';

import { useUser } from '../context/UserContext';

export default function HomePage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<unknown>(null);

  const { user } = useUser();
  const { toggleNav } = useNav();

  useEffect(() => {
    const loadTweets = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets);
      } catch (error) {
        setError(error);
      }
    };

    if (user) loadTweets();
  }, [user]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        setError(error);
      }
    };

    if (user) loadUsers();
  }, [user]);

  const handleSettingCreatedTweet = (newTweet: Tweet) => {
    setTweets((prevState) => [newTweet, ...prevState]);
  };

  if (!user) return null;

  return (
    <div className="h-full border-2 border-[var(--color-content-border)]">
      <CustomErrorMessage error={error} />
      <MainContentHeader handleBurgerClick={toggleNav}>
        <p className="text-xl font-bold">Home</p>
      </MainContentHeader>
      <AddTweetForm user={user} addTweet={handleSettingCreatedTweet} />
      <TweetList title={'Tweets from all users'} tweets={tweets} users={users} />
    </div>
  );
}
