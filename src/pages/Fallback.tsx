import React from 'react';

type FallbackProps = {
  text: string;
};

const Fallback: React.FC<FallbackProps> = ({ text }) => {
  return (
    <main>
      <div className="container">
        <div className="fallback">
          <span>{text}...</span>
        </div>
      </div>
    </main>
  );
};

export default Fallback;
