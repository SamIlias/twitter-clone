'use client';

import { useEffect, useState } from 'react';

import { getTweetsByUserId } from '@/api/getTweets';
import { useNav } from '@/app/(main)/context/NavContext';
import { useUser } from '@/app/(main)/context/UserContext';
import { EditUserForm } from '@/app/(main)/profile/EditUserForm';
import { EditPasswordForm } from '@/app/(main)/profile/EditUserForm/EditPasswordForm';
import { MainContentHeader } from '@/app/(main)/profile/MainContentHeader';
import { Tweet } from '@/entities/Tweet/model/types';
import { AddTweetForm } from '@/entities/Tweet/ui/AddTweetForm';
import { TweetList } from '@/entities/Tweet/ui/TweetList';
import { UserProfileInfo } from '@/entities/User/ui';
import { SimpleButton } from '@/shared/ui/Buttons/SimpleButton';
import { EditModal } from '@/shared/ui/EditModal';
import { CustomErrorMessage } from '@/shared/ui/ErrorMessage';

export default function MyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState<boolean>(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [error, setError] = useState<unknown>(null);

  const { user, setUser } = useUser();
  const { toggleNav } = useNav();

  useEffect(() => {
    const loadTweets = async () => {
      try {
        const tweets = await getTweetsByUserId(user!.id);
        setTweets(tweets);
      } catch (error) {
        setError(error);
      }
    };

    if (user) loadTweets();
  }, [user]);

  const handleSettingCreatedTweet = (newTweet: Tweet) => {
    setTweets((prevState) => [newTweet, ...prevState]);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleEditPasswordClick = () => {
    setIsOpenPasswordModal(true);
  };

  const handleEditPasswordClose = () => {
    setIsOpenPasswordModal(false);
  };

  if (user)
    return (
      <div className="h-full border-2 border-[var(--color-content-border)]">
        <CustomErrorMessage error={error} />
        {isEditing && user && (
          <EditModal onClose={handleEditClose}>
            <EditUserForm
              user={user}
              setUser={setUser}
              closeModal={handleEditClose}
              handleEditPasswordClick={handleEditPasswordClick}
            />
          </EditModal>
        )}

        {isOpenPasswordModal && (
          <EditModal onClose={handleEditPasswordClose}>
            <EditPasswordForm closeModal={handleEditPasswordClose} />
          </EditModal>
        )}

        <MainContentHeader handleBurgerClick={toggleNav}>
          <div>
            <p className="font-bold text-md">{`${user.firstName} ${user.secondName}`}</p>
            <p className="text-sm">{`${tweets.length} tweets`}</p>
          </div>
        </MainContentHeader>
        <UserProfileInfo user={user}>
          <SimpleButton
            handleClickAction={handleEditClick}
            title={'Edit profile'}
            className="text-sm h-[35px] py-2 hidden md:block"
          />
        </UserProfileInfo>
        <AddTweetForm user={user} setTweets={handleSettingCreatedTweet} />
        <TweetList title={'Tweets'} tweets={tweets} users={[user]} />
      </div>
    );
}
