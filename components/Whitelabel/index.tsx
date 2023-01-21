import React from 'react';
import Events from './Events';
import CardsComponent from './Cards';

const RenderSection = ({ component, pageData, ...props }: any) => {
  switch (component) {
    case 'events':
      return <Events {...props} />;
    case 'card_with_rich':
      return <CardsComponent pageData={pageData} {...props} />;
    default:
      return null;
  }
};

export default RenderSection;
