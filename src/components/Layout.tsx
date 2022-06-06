const MainLayout: LayoutProps = ({ children }) => {
  const year = new Date().getFullYear()

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex flex-col md:w-1/2 md:ml-auto md:mr-auto xl:w-1/4">
        <pre className="leading-none w-auto m-auto text-center pt-[3vh] sm:pt-[5vh] md:pt-[10vh] lg:pt-[15vh] xl:pt-[20vh] pb-6 sm:pb-10 text-xs">
          {`
  _      _                           _       
 | |    | |                         (_)      
 | | ___| |__   ___  _ __   ___ ___  _ _ __  
 | |/ _ \\ '_ \\ / _ \\| '_ \\ / __/ _ \\| | '_ \\ 
 | |  __/ |_) | (_) | | | | (_| (_) | | | | |
 |_|\\___|_.__/ \\___/|_| |_|\\___\\___/|_|_| |_|
        `}
        </pre>

        {children}
      </div>

      <footer className="text-center pb-4 justify-self-end">
        &copy; leboncoin -
        {' '}
        {year}
      </footer>
    </div>
  )
}

export default MainLayout
