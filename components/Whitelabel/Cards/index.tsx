import { Card } from 'antd';
import parse from 'html-react-parser';
import style from './index.module.less';

import styled, { keyframes } from 'styled-components';

import { slideInRight } from 'react-animations';

const slideInRightAnimation = keyframes`${slideInRight}`;
const SlideInRightDiv = styled.div`
  animation: 1s ${slideInRightAnimation};
`;
const CardsComponent = ({ pageData }: any) => {
  return (
    <div className={style.root}>
      <SlideInRightDiv>
        <Card>{parse(pageData?.description ?? '')}</Card>
      </SlideInRightDiv>
    </div>
  );
};

export default CardsComponent;
