import React from 'react';
import { MoonLoader } from "react-spinners"

export const Loading = () => {
  return (
    <div className="min-h-max inset-0 flex items-center justify-center z-50 my-5">
      <MoonLoader
        color="#0054ff"
        size={25}
      />
    </div>
  );
};

export default Loading;