import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Market Leaders Memo System',
  description: 'Create project memos for team discussion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <p className="text-gray-500 text-sm font-medium tracking-wide">MARKET LEADERS</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Memo System</h1>
            <p className="text-gray-600 mt-2">Write A Freaking Memo (WAFM)</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
