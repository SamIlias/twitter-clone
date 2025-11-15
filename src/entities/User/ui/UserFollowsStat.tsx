import { FC } from 'react';

interface UserFollowsStatProps {
  value: number;
  title: string;
}

export const UserFollowsStat: FC<UserFollowsStatProps> = ({ value, title }) => {
  return (
    <div>
      <span className="font-bold">{value}</span>
      <span className="text-sm text-[var(--color-text-placeholder)]">{` ${title}`}</span>
    </div>
  );
};
