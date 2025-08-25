'use client';

import { useRouter } from 'next/navigation';
import { User } from '../models/user.model';

export default function Page() {
  const { push } = useRouter();

  const user: User = JSON.stringify(window.localStorage.getItem('user'));

  const onLogout = () => {
    window.localStorage.clear();
    push('/sign-up');
  };

  return (
    <div className="text-center mt-16">
      <h5 className="text-2xl">
        Welcome <span className="underline">{user}</span>
      </h5>

      <button
        onClick={onLogout}
        className="mt-8 px-6 py-2 rounded-3xl cursor-pointer transition bg-red-100 hover:bg-red-200 border border-transparent hover:border-red-400"
      >
        Exit
      </button>
    </div>
  );
}
