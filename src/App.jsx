import MouseEffect from "./components/MouseEffect/MouseEffect";
import Navbar from "./components/Navbar/Navbar";
import Downloader from "./components/Downloader/Downloader";
import { useRandomBackground } from "./utils/randomPattern";

function App() {
  useRandomBackground();
  return (
    <>
      <MouseEffect />
      <main className='overflow-y-scroll h-full'>
        <header className='px-2 md:w-10/12 md:mx-auto'>
          <Navbar />
        </header>
        <section className='p-2 w-screen md:w-10/12 mt-5 mx-auto'>
          <div className='w-full mockup-window backdrop-blur border border-base-300'>
            <div className='py-3 md:py-10 space-y-10'>
              <div className='text-center space-y-3'>
                <h1 className='text-2xl xs:text-3xl sm:text-4xl font-semibold '>
                  SpeedDrain: Lightning-Fast Pixeldrain Downloads
                </h1>
                <p className='text-lg font-normal text-gray-500 '>
                  Bypass Pixeldrain download speed limits with SpeedDrain. Enjoy
                  <br />
                  faster, hassle-free downloads in just a few clicks!
                </p>
              </div>
              <Downloader />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
