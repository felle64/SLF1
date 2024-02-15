import Link from 'next/link';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Page</h1>
      <Link href="/">Go back to home</Link>
    </div>
  );
};

export default AboutPage;