import React, { PropTypes } from 'react';
import HeaderView from '../../views/header/header-view';
import FooterView from '../../views/footer/footer-view';

export default function PrimaryLayout({ children }) {
  return (
    <div>
      <HeaderView />
      {children}
      <FooterView />
    </div>
  );
}

PrimaryLayout.propTypes = {
  children: PropTypes.object
};
