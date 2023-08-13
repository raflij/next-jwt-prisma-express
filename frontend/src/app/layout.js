import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-indigo-50">
          <div className="max-w-[600px] h-[100vh] mx-auto bg-white relative">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
