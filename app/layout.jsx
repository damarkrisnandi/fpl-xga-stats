import HeaderMain from '../components/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FPL xG xA Stats',
  description: 'Expected Goals and Assists Stats for FPL',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderMain />
        {children}
      </body>
    </html>
  )
}
