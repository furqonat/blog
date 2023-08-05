import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ReactNode } from 'react'
import { Navbar } from '../prebuilt'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Romdhani | Dashboard',
  description: 'A personal blog',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${openSans.className} flex flex-col gap-10 min-h-screen`}>
        <div className={'flex-1'}>
          <Navbar />
          <div className={'mt-7'}>{children}</div>
        </div>
        <footer className="footer p-10 bg-neutral text-neutral-content ">
          <div className={'container mx-auto footer'}>
            <div>
              <object data={'/my-logo-white.svg'} width={40} height={60} />
              <p>Furqon Romdhani © {new Date().getFullYear()}</p>
            </div>
            <div>
              <span className="footer-title">Social</span>
              <div className="grid grid-flow-col gap-4">
                <a href={'https://www.linkedin.com/in/furqon-romdhani-724a29150'} target={'_blank'} className={'px-1'}>
                  <svg
                    fill="#ffffff"
                    height="24"
                    width="24"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 455 455"
                    xmlSpace="preserve"
                    style={{ cursor: 'pointer' }}
                  >
                    <g>
                      <path
                        style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
                        d="M246.4,204.35v-0.665c-0.136,0.223-0.324,0.446-0.442,0.665H246.4z"
                      />
                      <path
                        style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
                        d="M0,0v455h455V0H0z M141.522,378.002H74.016V174.906h67.506V378.002z
		 M107.769,147.186h-0.446C84.678,147.186,70,131.585,70,112.085c0-19.928,15.107-35.087,38.211-35.087
		c23.109,0,37.31,15.159,37.752,35.087C145.963,131.585,131.32,147.186,107.769,147.186z M385,378.002h-67.524V269.345
		c0-27.291-9.756-45.92-34.195-45.92c-18.664,0-29.755,12.543-34.641,24.693c-1.776,4.34-2.24,10.373-2.24,16.459v113.426h-67.537
		c0,0,0.905-184.043,0-203.096H246.4v28.779c8.973-13.807,24.986-33.547,60.856-33.547c44.437,0,77.744,29.02,77.744,91.398V378.002
		z"
                      />
                    </g>
                  </svg>
                </a>
                <a href={'https://www.youtube.com/channel/UC3UqPsxQk0ajU44eFEQYIBA'} target={'_blank'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a href={'https://www.facebook.com/dani.oscx'} target={'_blank'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
