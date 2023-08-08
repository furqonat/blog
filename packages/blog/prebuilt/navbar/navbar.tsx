import styles from './navbar.module.css'

export function Navbar() {
  return (
    <nav className={'navbar bg-base-100 shadow-sm xs:sticky sm:sticky md:sticky top-0 z-10'}>
      <div className={'container mx-auto flex gap-10'}>
        <div className={'flex-1'}>
          <a className={styles.navbarIcon} href={'/'}>
            ByFurqon
          </a>
        </div>
        <div>
          <ul
            className={
              'menu menu-horizontal visible xs:hidden sm:hidden md:hidden'
            }
          >
            <li>
              <a href={'/about'}>About</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/furqon-ByFurqon-724a29150" target={'_blank'}>Hire Me</a>
            </li>
          </ul>
        </div>
        <div className={'flex items-end'}>
          {/* Drawer only visible on mobile device */}
          <div className="drawer lg:hidden visible xl:hidden xxl:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className={'drawer-content'}>
              {/* Page content here */}
              <label htmlFor="my-drawer" className="drawer-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side z-10">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content z-10">
                {/* Sidebar content here */}
                <li>
                  <a href={'/about'}>About</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/furqon-ByFurqon-724a29150" target={'_blank'}>Hire Me</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
