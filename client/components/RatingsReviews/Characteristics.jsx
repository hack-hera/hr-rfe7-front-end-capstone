import React from 'react';
import styled from 'styled-components';

const Characteristics = (props) => {

  if (!props.meta) {
    return <></>;
  }

  const { characteristics } = props.meta;

  console.log('>>>> Characteristics', characteristics);

  return (
    <Container>
      {Object.keys(characteristics).map(k => {
        return (<Graph key={k} name={k} value={characteristics[k].value} />);
      })}
    </Container>
  );
};

const Graph = ({ name, value }) => {
  return (
    <div>
      <p>{name}</p>
      <Bar><Arrow value={value / 5} /></Bar>
      <Labels>
        <span>Too Small</span>
        <span>Just Right</span>
        <span>Too Big</span>
      </Labels>
    </div>
  );
};

const Bar = styled.div`
  positition: relative;
  width: 100%;
  background-color: #ffcc33;
  height: 10px;
  background: linear-gradient(90deg, #ccc 90%, #fff 90%);
  background-repeat: repeat-x;
  background-size: 35%;
`;

const Labels = styled.div`
  display: flex;
  margin-top: 4px;
  justify-content: space-around;
  font-size: 0.6em;
  color: ${props => props.theme.bodyTextLight};
  width: 100%;
`;

const Arrow = styled.div`
  position: relative;
  height: 0px;
  left: ${props => Math.floor(100 * props.value * 0.95)}%;
  width: 0px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 12px solid ${props => props.theme.graph};
`;

const Container = styled.div`
  color: ${props => props.theme.bodyTextLight};
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0px 20px 20px 20px;
  font-size: 0.7em;
`;

export default Characteristics;