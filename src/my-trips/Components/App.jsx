import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Footer from '@/view-trip/components/Footer';

const App = () => {
  return (
    <div className="flex justify-center items-center w-full h-full py-10">
      <DotLottieReact
        src="https://lottie.host/5b14feff-b864-4d07-a775-78649150c377/50Zt8YQ0UO.lottie"
        loop
        autoplay
        className="sm:h-[100%] sm:w-[100%] md:h-2/3 md:w-2/3 lg:h-3/4 lg:w-3/4"
      />
    </div>
  );
};

export default App;
