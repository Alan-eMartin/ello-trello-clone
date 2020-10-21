import React from 'react';
import './style.scss';
import Header from './Header/index';
import Footer from './Footer/index';

const Layout = (props) => {
  
  // Props
  const { children } = props;

  return (
    <div className="Layout">
      <Header />
      <main className='main'>
        {children}
      </main>
      <Footer />
    </div>
  )
};

export default Layout;