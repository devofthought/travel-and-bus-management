import SearchBar from '@/components/Shared/SearchBar';
import React, { useEffect } from 'react';

const Banner = () => {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElement = document.querySelector('.parallax');
      console.log(parallaxElement);
      if (parallaxElement) {
        const scrollPosition = window.scrollY;
        parallaxElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="relative h-96" style={{ position: 'relative', height: '500px' }}>
        <div className="parallax absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${'/images/banner-img.jpg'})`, position: 'absolute', inset: '0px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
          <div className="absolute inset-0 bg-black opacity-50" style={{ position: 'absolute', inset: '0px', backgroundColor: 'black', opacity: '70%' }}></div>
        </div>
        <div className="flex items-center justify-center h-full text-white text-center" style={{ height: '100%', color: 'white', position: 'inherit' }}>
          <div>
            <h1 className="text-4xl font-bold" style={{ fontSize: '100px' }}>Dhruto Travel</h1>
            <p style={{ textAlign: 'center', fontSize: '24px' }}>Book with Ease, Travel with Speed</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center" style={{ height: '500px', backgroundColor: '#00000B' }}>
        <div className="absolute z-10 flex justify-center" style={{ marginTop: '-40px' }}>
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default Banner;
