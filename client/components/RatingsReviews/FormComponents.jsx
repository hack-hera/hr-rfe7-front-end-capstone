import React from 'react';
import styled from 'styled-components';

import { characteristics } from '../../lib/characteristics';
import { Button } from '../Shared/Form';

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
    setFormData({ ...formData, photos: [...photos, url] });
  };

  return (
    <ImageContainer>
      {photos.map((url, i) => (
        <img key={i} src={url} />
      ))}
      {photos.length < 5 && (
        <Button style={{ width: '80px', height: '80px' }} onClick={getNewUrl}>
          Add an Image
        </Button>
      )}
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  img {
    height: 80px;
    margin-right: 10px;
  }
`;