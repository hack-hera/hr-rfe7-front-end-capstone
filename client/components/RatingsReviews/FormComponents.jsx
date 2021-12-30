import React from 'react';
import styled from 'styled-components';

import { characteristics } from '../../lib/characteristics';

export const RecommendForm = ({ formData, setFormData, errors, setErrors }) => (
  <div
    onChange={(e) => {
      setFormData({
        ...formData,
        recommend: e.target.value === 'true',
      });
      setErrors({
        ...errors,
        recommend: '',
      });
    }}
  >
    <input
      type='radio'
      value={true}
      name='recommended'
      defaultChecked={formData.recommend === true}
    />{' '}
    Yes
    <input
      type='radio'
      value={false}
      name='recommended'
      defaultChecked={formData.recommend === false}
    />{' '}
    No
  </div>
);

export const CharacteristicsForm = ({
  meta,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  let neededCharacteristics = Object.keys(meta.characteristics);

  let updateCharacteristic = (key, value) => {
    let temp = { ...formData.characteristics };
    temp[meta.characteristics[key].id] = value;
    setFormData({
      ...formData,
      characteristics: temp,
    });
    setErrors({
      ...errors,
      characteristics: '',
    });
  };

  return (
    <table>
      <tbody>
        {neededCharacteristics.map((c, i) => (
          <tr key={i}>
            <th>{c}</th>
            {characteristics[c].map((q, j) => {
              let className = '';
              let id = meta.characteristics[c].id;
              if (
                formData.characteristics &&
                formData.characteristics[id] &&
                formData.characteristics[id] === j + 1
              ) {
                className = 'selected';
              }
              return (
                <td
                  key={j}
                  className={className}
                  onClick={() => updateCharacteristic(c, j + 1)}
                >
                  {q}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/*example images
https://cdn.pixabay.com/photo/2020/12/01/10/04/dog-5793625__480.jpg
https://cdn.pixabay.com/photo/2021/12/09/20/58/christmas-cookies-6859116__340.jpg
*/

export const AddImages = ({ formData, setFormData }) => {
  let photos = formData.photos || [];
  let getNewUrl = () => {
    let url = prompt('Enter Image URL');
    if (url.length > 0) {
      setFormData({ ...formData, photos: [...photos, url] });
    }
  };

  return (
    <ImageContainer>
      {photos.map((url, i) => (
        <ImageRemove>
          <div>x</div>
          <img key={i} src={url} />
        </ImageRemove>
      ))}
      {photos.length < 5 && <ImageButton onClick={getNewUrl}>+</ImageButton>}
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ImageRemove = styled.div`
  position: relative;
  margin-right: 10px;
  padding: 0px;
  img {
    height: 80px;
    margin: 0px;
    padding: 0px;
  }
  :hover {
    opacity: 0.8;
  }
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: red;
  }
`;

const ImageButton = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  text-align: center;
  line-height: 80px;
  color: ${(props) => props.theme.bgDark};
  font-size: 30px;
  border: 2px dotted ${(props) => props.theme.bgDark};
  background-color: ${(props) => props.theme.bgLight};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.bg};
  }
`;
