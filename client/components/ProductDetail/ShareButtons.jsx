import React, { Component } from 'react';
import styled from 'styled-components';

const ShareButtons = () => {
  return (
    <Container>
      <Facebook src="https://marvel-b1-cdn.bc0a.com/f00000000181213/www.valpo.edu/international/files/2018/09/social-facebook-button-blue-icon-400x400.png"></Facebook>
      <Twitter src="https://img1.pnghut.com/0/9/0/de8Q9z9Yg3/text-blue-azure-button-symbol.jpg"></Twitter>
      <Pinterest src="https://www.ignitesocialmedia.com/wp-content/uploads/2012/08/pinterest-logo.png"></Pinterest>
    </Container>
  );
};

export default ShareButtons;

const Container = styled.div`
  cursor: pointer;
`;

const Facebook = styled.img`
  max-height: 20px;
  max-width: 20px;
`;

const Twitter = styled.img`
  max-height: 20px;
  max-width: 20px;
`;

const Pinterest = styled.img`
  max-heigth: 20px;
  max-width: 20px;
`;