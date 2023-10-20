import SessionProvider  from '@/components/SessionProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo Master',
  description: 'Manage your daily tasks with simplicity and ease',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg-color`}>
      <SessionProvider session={session}>
        <Navbar />
        <div className='container mx-auto' >
          {children}
          <Toaster />
        </div>
      </SessionProvider>  
      </body>
    </html>
  )
}
