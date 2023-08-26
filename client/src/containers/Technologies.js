import React from 'react';
import { Image } from 'antd';

const SvgImageScrollBar = () => {
  const icons = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  ];

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    overflowX: 'hidden',
    padding: '16px',
  };

  const listStyle = {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: '100%',
    overflowX: 'scroll',
  };

  const imageStyle = {
    // display: 'inline-block',
    width: '500px',
    height: 'auto',
    padding: '8px',
  };

  return (
    <div>
      <h1 style={{ marginTop: '40px', marginBottom: '20px', textAlign: 'center', fontSize: '36px', fontWeight: '600' }}>Technologies Used</h1>
      <div style={containerStyle}>
        <ul style={listStyle}>
          {icons.map((icon, index) => (
            <li style={imageStyle} key={index}>
              <Image src={icon} alt={icon} preview={false} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SvgImageScrollBar;
