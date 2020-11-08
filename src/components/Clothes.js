import React, { useEffect, useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import jacket from '../assets/clothesIcon/jacket.jpg';
import jacket2 from '../assets/clothesIcon/jacket2.jpg';
import coat from '../assets/clothesIcon/coat.jpg';
import longSocks from '../assets/clothesIcon/longSocks.jpg';
import jeans from '../assets/clothesIcon/jeans.jpg';
import jeans2 from '../assets/clothesIcon/jeans2.jpg';
import bubbleJacket from '../assets/clothesIcon/bubbleJacket.jpg';
import knit from '../assets/clothesIcon/knit.jpg';
import muffler from '../assets/clothesIcon/muffler.jpg';
import sleeveless from '../assets/clothesIcon/sleeveless.jpg';
import shortSleeves from '../assets/clothesIcon/shortSleeves.jpg';
import shortSleevesShrit from '../assets/clothesIcon/shortSleevesShrit.jpg';
import shorts from '../assets/clothesIcon/shorts.jpg';
import cardigan from '../assets/clothesIcon/cardigan.jpg';
import leggings from '../assets/clothesIcon/leggings.jpg';
import jumper from '../assets/clothesIcon/jumper.jpg';
import onePiece from '../assets/clothesIcon/onePiece.jpg';
import tShirt from '../assets/clothesIcon/tShirt.jpg';
import tShirt2 from '../assets/clothesIcon/tShirt2.jpg';
import shorts2 from '../assets/original/noun_Clothes_3461596.png'
import sleeveless2 from '../assets/original/noun_Clothes_3461594.png'
import pants from '../assets/original/noun_Clothes_3461593.png'
import knitShirt from '../assets/original/noun_Clothes_3461591.png'
import pants2 from '../assets/original/noun_Clothes_3461589.png'
import leatherJacket from '../assets/original/noun_Clothes_3460965.png'
import trenchCoat from '../assets/original/noun_Clothes_3460964.png'
import leggings2 from '../assets/original/noun_Clothes_3460963.png'
import sleevelessDress from '../assets/original/noun_Clothes_3460959.png'
import onePiece2 from '../assets/original/noun_Clothes_3460957.png'
import jacket3 from '../assets/original/noun_Clothes_3460956.png'
import longShirt from '../assets/original/noun_Clothes_3460955.png'
import cardigan2 from '../assets/original/noun_Clothes_3460952.png'
import hoodie from '../assets/original/noun_Clothes_3460951.png'
import longOnePiece from '../assets/original/noun_Clothes_3460950.png'
import faceMask from '../assets/original/faceMask.png'

const ItemArrayGrid = (itemArray) => {
  return (
      <Grid container direction="column">
        <Grid item container justify="center" xs={12}>
          <Grid><img style={{width: 100}} src={faceMask}/></Grid>
        </Grid>
        <Grid item container xs={12}>
        {itemArray.map((item, index) => {
            return <Grid item key={index}><img style={{width: 200}} src={item}/></Grid>
        })}
        </Grid>
      </Grid>
  )
}

const Clothes = props => {
  const { currentTemp } = props;

  const handleChooseClothes = useCallback(() => {
    switch (true) {
      case currentTemp >= 28: // 민소매 반팔 반바지 치마
        console.log('28도 이상');
        return ItemArrayGrid([sleeveless, sleeveless2, shortSleeves, shortSleevesShrit, shorts, shorts2, sleevelessDress]);

      case currentTemp >= 23: // 반팔 얇은 셔츠 반바지 면바지
        console.log('23도 이상');
        return ItemArrayGrid([shortSleeves, shortSleevesShrit, shorts, shorts2, onePiece, onePiece2, pants]);

      case currentTemp >= 20: // 얇은 가디건 긴팔티 면바지 청바지
        console.log('20도 이상');
        return ItemArrayGrid([cardigan, tShirt, tShirt2, longShirt, jeans, jeans2, pants, pants2]);

      case currentTemp >= 17: // 얇은 니트 가디건 맨투맨 얇은자켓 면바지 청바지
        return ItemArrayGrid([cardigan2, hoodie, longOnePiece, knitShirt, pants, pants2]);

      case currentTemp >= 12: // 자켓 트렌치코트 야상 니트 스타킹 청바지 면바지
        console.log('12도 이상');
        return ItemArrayGrid([jacket, coat, trenchCoat, leatherJacket, jacket2, jacket3, longSocks, jeans, jeans2, pants, pants2]);

      case currentTemp >= 9: // 코트 히트텍 니트 청바지 레깅스
        console.log('9도 이상');
        return ItemArrayGrid([coat, jumper, leatherJacket, jeans, jeans2, leggings, leggings2]);

      case currentTemp >= 5: // 패딩 두꺼운코트 목도리 기모제품
        console.log('5도 이상');
        return ItemArrayGrid([bubbleJacket, coat, knit, muffler, jeans, jeans2]);

      case currentTemp >= 0:
        console.log('0도 이상');
        return ItemArrayGrid([bubbleJacket, coat, knit, muffler, jeans, jeans2]);
      case currentTemp >= -4:
        console.log('영하5 이하');
        return ItemArrayGrid([bubbleJacket, coat, knit, muffler, jeans, jeans2]);
      default:
        console.log('디폴트');
    }
  });

  return <>{handleChooseClothes()}</>;
};

export default Clothes;
