'use client';

import { use, useEffect, useState } from 'react';

import { getTweetById } from '@/entities/Tweet/api/getTweetById';
import { Tweet } from '@/entities/Tweet/model/types';
import { TweetComponent } from '@/entities/Tweet/ui/Tweet';
import { getUserById } from '@/entities/User/api/getUserById';
import { User } from '@/entities/User/model/types';
import { BackLink } from '@/shared/ui/Buttons/BackLink';
import { CustomErrorMessage } from '@/shared/ui/ErrorMessage';

interface TweetPageProps {
  params: Promise<{ id: string }>;
}

export default function TweetPage({ params }: TweetPageProps) {
  const [error, setError] = useState<unknown>(null);
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [tweetUser, setTweetUser] = useState<User | null>(null);

  const { id } = use(params);

  useEffect(() => {
    const loadTweet = async () => {
      try {
        const tweet = await getTweetById(id);
        setTweet(tweet);
      } catch (error) {
        setError(error);
      }
    };

    loadTweet();
  }, [id]);

  useEffect(() => {
    const loadTweetUser = async () => {
      if (!tweet) return;
      try {
        const curUser = await getUserById(tweet?.userId);
        setTweetUser(curUser);
      } catch (error) {
        setError(error);
      }
    };

    loadTweetUser();
  }, [tweet]);

  return (
    <div className="h-full border-2 border-[var(--color-content-border)]">
      <CustomErrorMessage error={error} />
      <div className="py-4 px-6 flex justify-between">
        <BackLink />
      </div>
      {tweet && tweetUser && (
        <div className="p-6">
          <TweetComponent tweet={tweet} user={tweetUser} />
        </div>
      )}
    </div>
  );
}
