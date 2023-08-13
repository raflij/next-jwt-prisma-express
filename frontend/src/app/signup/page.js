"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import axios from 'axios';


export default function Home() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowNotification(false)
    setLoading(true);
    try {
      const hasil = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/signup', { name: nama, gender: gender, email: email, password: password })
      if (hasil.data.response) {
        setShowNotification(true);
        setError('Akun berhasil dibuat... login sekarang');
        setTimeoutId(setTimeout(() => router.push('/login'), 1500));
      } else {
        throw new Error(hasil.data.message);
      }
    } catch (e) {
      setShowNotification(true);
      setError(e.message);
    } finally {
      setLoading(false);
    }
    setTimeoutId(setTimeout(() => setShowNotification(false), 7000));
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);
  return (
    <>
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60 flex items-center justify-center">
        </div>
      )}
      {showNotification && (
        <div className="px-4 fixed bottom-0 w-full max-w-[600px] transform mb-8 animate-fade-in animate-slide-up">
          <div className="bg-stone-900 text-white w-full rounded p-4 text-sm font-semibold flex justify-between">
            {error}
            <span className="text-primary cursor-pointer" onClick={() => setShowNotification(false)}>Ok</span>
          </div>
        </div>
      )}
      <div className="p-4 border-b">
        <span className="font-semibold">Register</span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} name="signUpForm">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col items-start space-y-2">
              <label className="text-gray-700 block">Nama</label>
              <input onChange={(e) => setNama(e.target.value)} type="text" className="w-full" autoComplete="off" />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <label className="text-gray-700 block">Jenis Kelamin</label>
              <div className="flex space-x-4">
                <label className="text-gray-700">
                  <input value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} type="radio" /> Laki - Laki
                </label>
                <label className="text-gray-700">
                  <input value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} type="radio" /> Perempuan
                </label>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <label className="text-gray-700 block">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="text" className="w-full" autoComplete="off" />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <label className="text-gray-700 block">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full" autoComplete="off" />
            </div>
            <button type="submit" name="Login" className="w-full text-center py-2 bg-blue-600 text-white rounded-md font-semibold">Login</button>
          </div>
        </form>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <span className="text-sm">Sudah punya akun? <Link href="/login"><span className="font-semibold text-blue-500">Masuk di sini</span></Link>
        </span>
      </div>
    </>
  )
}
