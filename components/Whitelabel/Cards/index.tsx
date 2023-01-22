import { Card } from 'antd';
import parse from 'html-react-parser';
import style from './index.module.less';

const CardsComponent = ({ pageData }: any) => {
  return (
    <div className={style.root}>
      <Card>{parse(pageData?.description ?? '')}</Card>
    </div>
  );
};

export default CardsComponent;
