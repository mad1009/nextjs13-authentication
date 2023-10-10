import SessionProvider  from '@/components/SessionProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider session={session}>
        <Navbar />
        <div className='container mx-auto' >
          {children}
        </div>
      </SessionProvider>  
      </body>
    </html>
  )
}
