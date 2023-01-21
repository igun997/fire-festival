import { Resources } from '../../../types/types';
import React from 'react';
import { Card, Col, Image, Row } from 'antd';
import parse from 'html-react-parser';
import { pathToAsset } from '../../../utils/global.util';
import ReactPlayer from 'react-player';

type EventDetailProps = {
  type?: string;
  data?: {
    id: number;
    title: string;
    description: string;
    layout: string;
    medias: {
      data: {
        id: number;
        attributes: Resources.MediaAttributes;
      }[];
    };
  };
};
const ImageMimeType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
const DescLeftMedia: any = (props: EventDetailProps) => {
  return (
    <>
      <Col xs={24}>
        <Card>
          <Row gutter={[10, 10]}>
            <Col xs={24} md={16}>
              {parse(props?.data?.description ?? '')}
            </Col>
            <Col xs={24} md={8}>
              <Image.PreviewGroup>
                <Row gutter={[10, 10]}>
                  {props?.data?.medias?.data?.map((item) =>
                    ImageMimeType.includes(item?.attributes?.mime ?? '') ? (
                      <Col xs={24} key={item.id}>
                        <Image src={pathToAsset(item.attributes.url) ?? ''} />
                      </Col>
                    ) : (
                      <Col xs={24} key={item.id}>
                        <ReactPlayer
                          url={pathToAsset(item.attributes.url) ?? ''}
                          width="100%"
                          controls={true}
                        />
                      </Col>
                    ),
                  )}
                </Row>
              </Image.PreviewGroup>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};
const DescRightMedia: any = (props: EventDetailProps) => {
  return (
    <>
      <Col xs={24}>
        <Card>
          <Row gutter={[10, 10]}>
            <Col xs={24} md={8}>
              <Image.PreviewGroup>
                <Row gutter={[10, 10]}>
                  {props?.data?.medias?.data?.map((item) =>
                    ImageMimeType.includes(item?.attributes?.mime ?? '') ? (
                      <Col xs={24} key={item.id}>
                        <Image src={pathToAsset(item.attributes.url) ?? ''} />
                      </Col>
                    ) : (
                      <Col xs={24} key={item.id}>
                        <ReactPlayer
                          url={pathToAsset(item.attributes.url) ?? ''}
                          width="100%"
                          controls={true}
                        />
                      </Col>
                    ),
                  )}
                </Row>
              </Image.PreviewGroup>
            </Col>
            <Col xs={24} md={16}>
              {parse(props?.data?.description ?? '')}
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};
const DescTopMedia: any = (props: EventDetailProps) => {
  return (
    <>
      <Col xs={24}>
        <Card>
          <Row gutter={[10, 10]}>
            <Col xs={24}>{parse(props?.data?.description ?? '')}</Col>
            <Col xs={24}>
              <Image.PreviewGroup>
                <Row gutter={[10, 10]}>
                  {props?.data?.medias?.data?.map((item) =>
                    ImageMimeType.includes(item?.attributes?.mime ?? '') ? (
                      <Col key={item.id}>
                        <Image
                          style={{ height: 100 }}
                          src={pathToAsset(item.attributes.url) ?? ''}
                        />
                      </Col>
                    ) : (
                      <Col key={item.id}>
                        <ReactPlayer
                          url={pathToAsset(item.attributes.url) ?? ''}
                          width="100%"
                          controls={true}
                        />
                      </Col>
                    ),
                  )}
                </Row>
              </Image.PreviewGroup>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};
const EventDetail = (props: EventDetailProps) => {
  switch (props.type) {
    case 'desc_left_media':
      return <DescLeftMedia {...props} />;
    case 'desc_right_media':
      return <DescRightMedia {...props} />;
    case 'dec_top_media':
      return <DescTopMedia {...props} />;
    default:
      return null;
  }
};

export default EventDetail;
