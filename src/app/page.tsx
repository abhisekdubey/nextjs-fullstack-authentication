import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* <ProtectedRoute>
      </ProtectedRoute> */}
      <h1 className='text-3xl font-semibold mb-16'>Welcome to Home</h1>
      <p className=' p-5 rounded-3xl bg-red-400 text-white text-lg hover:bg-amber-300 hover:text-red-500'><Link href={'/profile'}>Visit Profile</Link></p>
    </main>
  )
}
