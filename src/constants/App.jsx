import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const App = () => {
  return (
    <div className="sm:mt-6 md:mt-16 w-[350px] h-[200px] sm:w-[550px] sm:h-[300px] md:w-[800px] md:h-[400px]">
      <DotLottieReact
        src="https://lottie.host/04d0b4a8-458b-4e8c-a523-d733ff20e74f/s6qZojHXYF.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }} // Dynamically fits the container
      />
    </div>
  );
};

export default App;
