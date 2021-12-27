import React from 'react';
import styled from 'styled-components';
import { Stars } from '../Shared/Stars';
import {
  recommendedPercentage,
  ratingPercentages,
  totalRating,
} from '../../lib/ratingFunctions';

const Ratings = (props) => {

  const { recommended, ratings } = props.meta;
  const displayRatings = ratingPercentages(ratings);
  const displayTotalRating = totalRating(ratings);
  const displayRecommended = recommendedPercentage(recommended);

  return (
    <Container>
      <Header>
        <h1>{displayTotalRating}</h1>
        <Stars number={displayTotalRating} />
      </Header>

      <TableContainer>
        <p>
          {displayRecommended} of people recommend this product
        </p>
        <table>
          <tbody>
            {displayRatings.map((v, k) => (
              <tr key={k}>
                <th>{5 - k} Stars</th>
                <td>
                  <Bar width={v} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px 20px 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  h1 {
    margin: 0px;
    padding: 0px;
    color: ${(props) => props.theme.textDark};
  }
  div {
    margin: 4px 0px 0px 4px;
    font-size: 11px;
    color: ${(props) => props.theme.graph};
    padding: 0px;
  }
`;

const TableContainer = styled.div`
  p,
  th {
    color: ${(props) => props.theme.textLight};
    font-size: 0.7em;
    font-weight: normal;
  }
  th {
    text-decoration: underline;
    width: 40px;
  }
  td {
    padding: 5px 0px;
    width: calc(100% - 40px);
  }
  table {
    width: 100%;
  }
`;

const Bar = styled.div`
  widht: 100%;
  height: 10px;
  background: ${(props) => {
    return `linear-gradient(to left, ${props.theme.bgDark} ${100 - props.width}%,
      ${props.theme.graph} ${100 - props.width}%)`;
  }};
`;

export default Ratings;
