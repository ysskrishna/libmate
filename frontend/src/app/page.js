import Link from 'next/link'


export default function Home() {
  return (
    <>
    
    <main className="flex flex-col items-center justify-center min-h-screen py-2 gap-20" suppressHydrationWarning={true}>
      <h1 className='text-black'>This is a small login signup implemetation for understanding of how nextjs full stack framework works.</h1>
      <div className='flex flex-row justify-around items-center w-full'>
      <Link href={'/login'} className='text-black border border-black px-8 py-4 rounded-lg hover:bg-red-600 text-xl'>Login</Link>
      <Link href={'/signup'} className='text-black border border-black px-8 py-4 rounded-lg hover:bg-red-600 text-xl'>SignUp</Link> 
      <Link href={'/customerDashboard'} className='text-black border border-black px-8 py-4 rounded-lg hover:bg-red-600 text-xl'>Customer Dashboard</Link>
   
      </div>
    </main>
    </>
    
  )
}