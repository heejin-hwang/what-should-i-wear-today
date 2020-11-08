import React, { useEffect, useCallback, useState } from 'react';
// import short from '../assets/clothesIcon/short';
// import short from 'src/assets/clothesIcon/short';
import short from '../assets/clothesIcon/short.png';

const Clothes = props => {
  const { currentTemp } = props;

  useEffect(() => {
    console.log('currentTemp', currentTemp);
    // handleChooseClothes();
  }, [currentTemp]);

  const image = () => {
    return (
      <img style={{ border: '1px solid red' }} alt={'cardigan'} src={short} />
    );
  };

  const handleChooseClothes = useCallback(() => {
    console.log('ddd');
    switch (true) {
      case currentTemp >= 28:
        console.log('28도 이상');
        break;
      case currentTemp >= 23:
        console.log('23도 이상');
        break;
      case currentTemp >= 20:
        console.log('20도 이상');

        return image;
      case currentTemp >= 17:
        console.log('여기?');
        return image;
      case currentTemp >= 12:
        console.log('12도 이상');
        return image;
      case currentTemp >= 9:
        console.log('9도 이상');
        return image;
      case currentTemp >= 5:
        console.log('5도 이상');
        break;
      case currentTemp >= 0:
        console.log('0도 이상');
        return image;
      case currentTemp >= -4:
        console.log('영하5 이하');
        break;
      default:
        console.log('디폴트');
    }
  });

  return <img src={short} />;
};

export default Clothes;
