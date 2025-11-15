import { User } from '@/entities/User/model/types';
import ava from '@/shared/assets/exampleUser/avaImage.png';
import banner from '@/shared/assets/exampleUser/userBanner.png';

export const user: User = {
  id: 1,
  firstName: 'Ivan',
  secondName: 'Ivanov',
  telegramLink: '@Ivanov_Ivan',
  status: `I'm a plant breeder`,
  email: 'ivan.ivanov@example.com',
  avaUrl: ava,
  bannerUrl: banner,
  tweets: [
    {
      id: 101,
      userId: 1,
      textContent:
        "I was going through a difficult period when everything around me seemed gray. And suddenly, my spathiphyllum bloomed. I didn't even remember that it could do that. The white flower looked like a little flag of hope. Since then, every week I've made myself tea, put on some music, and just spent time around plants. It has become my little way of getting back to myself.",
      createdAt: '2025-11-14',
      likes: 12,
      image: banner,
    },
    {
      id: 102,
      userId: 1,
      textContent: 'Работаю над новым проектом.',
      createdAt: '2025-11-14',
      likes: 47,
    },
    {
      id: 103,
      userId: 1,
      textContent: 'Хорошая погода сегодня.',
      createdAt: '2025-11-14',
      likes: 5,
    },
  ],
  followingIds: [2, 3],
  followerIds: [4, 5, 6, 7],
};
