import { Resources } from '../../../types/types';
import React from 'react';
import { Avatar, Card, Col, Image, List, Row, Typography } from 'antd';
import parse from 'html-react-parser';
import { pathToAsset } from '../../../utils/global.util';
import ReactPlayer from 'react-player';
import styled, { keyframes } from 'styled-components';
import { slideInDown, slideInLeft, slideInRight, slideInUp } from 'react-animations';
import { RootResources } from '../../../types/services/root';
import style from './index.module.less';
import { FileFilled, FileImageFilled, VideoCameraFilled } from '@ant-design/icons';

const slideInRightAnimation = keyframes`${slideInRight}`;
const SlideInRightDiv = styled.div`
  animation: 1s ${slideInRightAnimation};
`;
const slideInLeftAnimation = keyframes`${slideInLeft}`;
const SlideInLeftDiv = styled.div`
  animation: 1s ${slideInLeftAnimation};
`;
const slideInUpAnimation = keyframes`${slideInUp}`;
const SlideInUpDiv = styled.div`
  animation: 1s ${slideInUpAnimation};
`;

const slideInDownAnimation = keyframes`${slideInDown}`;
const SlideInDownDiv = styled.div`
  animation: 1s ${slideInDownAnimation};
`;

type EventDetailProps = {
  type?: string;
  pageProps: RootResources.getListEvent.data | null;
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
const VideoMimeType = [
  'video/mp4',
  'video/avi',
  'video/mov',
  'video/mkv',
  'video/ogg',
  'video/webm',
];
const PickIconByMimeType = (mimeType: string) => {
  if (ImageMimeType.includes(mimeType)) {
    return (
      <FileImageFilled
        style={{
          color: 'var(--primary-color-10)',
        }}
      />
    );
  } else if (VideoMimeType.includes(mimeType)) {
    return (
      <VideoCameraFilled
        style={{
          color: 'var(--primary-color-10)',
        }}
      />
    );
  }
  return (
    <FileFilled
      style={{
        color: 'var(--primary-color-10)',
      }}
    />
  );
};
const DownloadableRender: any = (props: EventDetailProps) => {
  return (
    <div className={style.root} {...props}>
      <List
        header={<div>Downloadable Files</div>}
        bordered
        size="small"
        locale={{ emptyText: 'No Downloadable Files' }}
        dataSource={props?.pageProps?.downloadable_files}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={PickIconByMimeType(item?.file?.data?.attributes?.mime)} />}
              title={
                <Typography.Link
                  target={'_blank'}
                  download={item.name}
                  href={pathToAsset(item?.file?.data?.attributes?.url) ?? '#'}>
                  {item.name}
                </Typography.Link>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
const DescLeftMedia: any = (props: EventDetailProps) => {
  return (
    <>
      <Col xs={24}>
        <Card>
          <Row gutter={[20, 10]}>
            <Col
              xs={{
                span: 24,
                order: 1,
              }}
              md={16}>
              <SlideInLeftDiv>
                {props?.pageProps?.downloadable_component === 'top_right' && (
                  <DownloadableRender
                    {...props}
                    style={{
                      marginLeft: 40,
                    }}
                  />
                )}
                {parse(props?.data?.description ?? '')}
                {props?.pageProps?.downloadable_component === 'bottom_desc' && (
                  <DownloadableRender
                    {...props}
                    style={{
                      marginLeft: 40,
                    }}
                  />
                )}
              </SlideInLeftDiv>
            </Col>
            <Col
              xs={{
                span: 24,
                order: 2,
              }}
              md={8}>
              <SlideInRightDiv>
                {props?.pageProps?.downloadable_component === 'top_left' && (
                  <DownloadableRender
                    {...props}
                    style={{
                      marginBottom: 10,
                    }}
                  />
                )}
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
              </SlideInRightDiv>
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
          <Row gutter={[20, 10]}>
            <Col
              xs={{
                span: 24,
                order: 2,
              }}
              md={8}>
              <SlideInRightDiv>
                {props?.pageProps?.downloadable_component === 'top_right' && (
                  <DownloadableRender
                    {...props}
                    style={{
                      marginBottom: 10,
                    }}
                  />
                )}
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
              </SlideInRightDiv>
            </Col>
            <Col
              xs={{
                span: 24,
                order: 1,
              }}
              md={16}>
              <SlideInLeftDiv>
                {props?.pageProps?.downloadable_component === 'top_left' && (
                  <DownloadableRender
                    {...props}
                    style={{
                      marginLeft: 40,
                    }}
                  />
                )}
                {parse(props?.data?.description ?? '')}
                {props?.pageProps?.downloadable_component === 'bottom_desc' && (
                  <DownloadableRender
                    {...props}
                    style={{
                      marginLeft: 40,
                    }}
                  />
                )}
              </SlideInLeftDiv>
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
            <Col xs={24} order={1}>
              <SlideInDownDiv>
                {props?.pageProps?.downloadable_component === 'top_desc' && (
                  <DownloadableRender
                    {...props}
                    style={{
                      marginLeft: 40,
                    }}
                  />
                )}
                {parse(props?.data?.description ?? '')}
                <div style={{ marginTop: 10 }}>
                  {props?.pageProps?.downloadable_component === 'bottom_desc' && (
                    <DownloadableRender
                      {...props}
                      style={{
                        marginLeft: 40,
                      }}
                    />
                  )}
                </div>
              </SlideInDownDiv>
            </Col>
            <Col xs={24} order={2}>
              <SlideInUpDiv>
                <Image.PreviewGroup>
                  <Row gutter={[10, 10]} justify="space-between" align="middle">
                    {props?.data?.medias?.data?.map((item) =>
                      ImageMimeType.includes(item?.attributes?.mime ?? '') ? (
                        <Col key={item.id}>
                          <Image
                            style={{
                              maxHeight: 380,
                            }}
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
              </SlideInUpDiv>
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
