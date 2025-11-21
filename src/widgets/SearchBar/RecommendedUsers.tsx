import { FC, useState } from 'react';

import { User } from '@/entities/User/model/types';
import { UserCard } from '@/entities/User/ui/UserCard';
import { Button, ButtonType } from '@/shared/ui/Buttons';

interface RecommendedUsersProps {
  users: User[];
}

export const RecommendedUsers: FC<RecommendedUsersProps> = ({ users }) => {
  const [expanded, setExpanded] = useState(false);

  const handleFollow = () => {};
  const toggleShowMore = () => setExpanded((prev) => !prev);

  const visibleUsers = expanded ? users : users.slice(0, 2);

  return (
    <div className="rounded-lg bg-gray-400/20 p-4">
      <h1 className="text-xl font-bold mb-5">You might like</h1>
      {visibleUsers.map((user) => {
        return (
          <div key={user.id} className="grid grid-cols-[70%_30%] gap-2 my-2">
            <UserCard user={user} className="text-sm" />
            <Button
              variant={ButtonType.PRIMARY}
              onClick={handleFollow}
              className="h-[35px] text-sm"
            >
              Follow
            </Button>
          </div>
        );
      })}

      {users.length > 2 && (
        <button onClick={toggleShowMore} className="text-blue-500 text-sm mt-3 cursor-pointer">
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};
