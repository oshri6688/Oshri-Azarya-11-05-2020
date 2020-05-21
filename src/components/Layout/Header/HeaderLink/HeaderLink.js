import React from 'react';
import { Link, LinkLabel } from './HeaderLink.style';

const HeaderLink = ({ label, icon: Icon, ...linkProps }) => {
  return (
    <Link {...linkProps}>
      <Icon />

      <LinkLabel>{label}</LinkLabel>
    </Link>
  );
};

export default HeaderLink;
