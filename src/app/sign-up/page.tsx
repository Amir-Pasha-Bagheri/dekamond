'use client';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { phoneNumberRegex } from './regex';
import axios from 'axios';
import { User } from '../models/user.model';
import { useRouter } from 'next/navigation';

function Page() {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const onChangePhone: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    setPhone(newValue);

    if (newValue.match(phoneNumberRegex)) setError('');
    else setError('Eneter a valid phone number.');
  };

  const onEnter: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (error) return;

    if (!phone) {
      setError('Please eneter your phone number.');
      return;
    }

    setLoading(true);
    axios
      .get('https://randomuser.me/api/?results=1&nat=us')
      .then(({ data }) => {
        const user: User = {
          name: '',
          picture: '',
          email: '',
        };

        const incomingUser = data.results[0];

        user.name = `${incomingUser.name.title}. ${incomingUser.name.first} ${incomingUser.name.last}`;
        user.picture = incomingUser.picture.medium;
        user.email = incomingUser.email;

        window.localStorage.setItem('user', JSON.stringify(user));
        push('/dashboard');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="text-center mt-16">
      <form onSubmit={onEnter}>
        <h5 className="text-2xl">Enter your phone number to join us !</h5>

        <input
          value={phone}
          onChange={onChangePhone}
          type="tel"
          className="mt-16 transition outline-transparent focus:outline-cyan-700 bg-cyan-50 px-4 py-2 rounded-xl"
          placeholder="Phone Number"
        />

        {error && <p className="text-red-700 mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="!mt-4 mx-auto px-6 py-2 rounded-3xl flex items-center cursor-pointer transition bg-green-100 hover:bg-green-200 border border-transparent hover:border-green-400"
        >
          Enter website !
          {loading && (
            <div className="ml-2 w-4 h-4 border-t border-b border-l rounded-full animate-spin" />
          )}
        </button>
      </form>
    </div>
  );
}

export default Page;
