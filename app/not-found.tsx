"use client"

import "./globals.css"

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-white">
        <main>
          <div className="container flex h-lvh items-center justify-center py-10">
            <div>
              <div className="pt-2 text-center">
                <h1 className="mb-1 text-3xl font-bold">
                  404 - Page Not Found
                </h1>
                <p>The page you are looking for does not exist.</p>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
