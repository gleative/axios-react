import React from 'react';
import styled from 'styled-components';
import goku from '../../assets/images/goku.png';

const HttpStatus = ({ requestSuccess }) => {
  return <HttpResponse src={requestSuccess ? goku : null} />;
};

export default HttpStatus;

const HttpResponse = styled.img`
  width: 20%;
`;
