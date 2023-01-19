import { LayoutConfigWithNextPage } from '../configs/layout.config';
import React from 'react';
import { Row } from 'antd';
import { useRouter } from 'next/router';

const Home: LayoutConfigWithNextPage = (props: any) => {
  const router = useRouter();
  return <Row>Hiii</Row>;
};
Home.layout = 'base';
Home.title = 'Cosmic Visual';
Home.description = 'Moment Without Words';

export default Home;
