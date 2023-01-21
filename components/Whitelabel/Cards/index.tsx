import { Card } from 'antd';
import parse from 'html-react-parser';

const CardsComponent = ({ pageData }: any) => {
  return <Card>{parse(pageData?.description ?? '')}</Card>;
};

export default CardsComponent;
