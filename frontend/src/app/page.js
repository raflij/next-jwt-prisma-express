"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { format, isToday, isYesterday } from 'date-fns';
import { ProtectedRoute } from './components/ProtectedRoute';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(hasil => {
          if (hasil.data.response) {
            setUser(hasil.data.user);
          } else {
            router.push('/login');
          }
        })
        .catch(e => {
          console.error(e.message);
          router.push('/login');
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  if (!user) {
    return <p className='text-center'>Loading...</p>;
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isToday(date)) {
      return 'Hari ini jam ' + format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Kemarin jam ' + format(date, 'HH:mm');
    } else {
      return format(date, 'MM/dd/yyyy jam HH:mm');
    }
  }

  return (
    <ProtectedRoute>
      <div className='p-4 flex justify-between items-center border-b'>
        <span className='font-semibold text-lg'>NextJS Express JWT</span>
        <button onClick={handleLogout} className='hover:text-blue-600'>Logout</button>
      </div>
      <div className='p-4'>
        <h1 className='mb-1'>Selamat datang, <b>{user.name}!</b></h1>
        <p>Email: {user.email}</p>
        <p>Jenis Kelamin: {
          user.gender === 'male' ? 'Laki - Laki'
            : user.gender === 'female' ? 'Perempuan'
              : 'unknown'
        }</p>
        <p>Bergabung: {user.created_at && formatDate(user.created_at)}</p>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
