import { FC, useState } from 'react';

import { User } from '@/entities/User/model/types';
import { UserCardWithFollow } from '@/entities/User/ui/UserCardWithFollow';

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
        return <UserCardWithFollow key={user.id} user={user} onFollow={handleFollow} />;
      })}

      {users.length > 2 && (
        <button onClick={toggleShowMore} className="text-blue-500 text-sm mt-3 cursor-pointer">
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};
