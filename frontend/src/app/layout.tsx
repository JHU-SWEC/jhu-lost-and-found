import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Lost and Found',
  description: 'JHU Lost and Found App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body>
        <Navbar/>
        {children}
        
      </body>
    </html>
  )
}
