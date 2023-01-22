import { LayoutConfigWithNextPage } from '../../configs/layout.config';
import { Button, Card, Col, Grid, Image, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getEventDetail } from '../../services/root';
import { RootResources } from '../../types/services/root';
import { useAppDispatch, useAppSelector } from '../../configs/hooks.config';
import { setLoading } from '../../redux/slices/setting';
import style from './index.module.less';
import { InstagramFilled, LeftOutlined, MailFilled, PhoneFilled } from '@ant-design/icons';
import EventDetail from '../../components/Whitelabel/EventDetail';

const { useBreakpoint } = Grid;
const EventPage: LayoutConfigWithNextPage = (props: any) => {
  const selectSetting = useAppSelector((state) => state.setting.setting);
  const { xs } = useBreakpoint();
  const { push, query } = useRouter();
  const dispatch = useAppDispatch();
  const [pageData, setPageData] = useState<RootResources.getListEvent.data | null>(null);
  const loadPage = (slug: string) => {
    dispatch(setLoading(true));
    getEventDetail(slug)
      .then((res) => {
        if (res.data.length > 0) {
          const selectedPage = res.data[0];
          setPageData(selectedPage.attributes);
        } else {
          push('/404');
        }
      })
      .catch(() => {
        push('/404');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  useEffect(() => {
    if (query?.slug) {
      loadPage(query.slug as string);
    }
  }, [query?.slug]);

  return (
    <Row
      className={style.root}
      gutter={[10, 10]}
      style={{
        padding: 24,
      }}>
      <Col xs={24}>
        <Row gutter={[10, 10]}>
          <Col
            xs={24}
            style={{
              textAlign: 'center',
            }}>
            <Row gutter={[10, 10]} justify="space-between" align="middle">
              <Col xs={24}>
                {!xs ? (
                  <Typography.Title className="landing-heading" level={2}>
                    {pageData?.event_name ?? ''}
                  </Typography.Title>
                ) : (
                  <Typography.Title className="landing-heading fs-xs" level={2}>
                    {pageData?.event_name ?? ''}
                  </Typography.Title>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Button type="link" icon={<LeftOutlined />} onClick={() => push('/static/festival')}>
              Kembali
            </Button>
          </Col>
          {pageData?.is_contact ? (
            <>
              <Col xs={24}>
                <Image
                  src={selectSetting?.logo.data.attributes.url ?? ''}
                />
              </Col>
              <Col md={8} xs={24}>
                <Card>
                  <Row gutter={[10, 10]}>
                    <Col
                      xs={24}
                      style={{
                        textAlign: 'center',
                      }}>
                      <InstagramFilled
                        style={{
                          fontSize: 30,
                          color: '#800000',
                        }}
                      />
                    </Col>
                    <Col
                      xs={24}
                      style={{
                        textAlign: 'center',
                      }}>
                      <Typography.Link
                        href={`https://www.instagram.com/${selectSetting?.instagram_url}`}
                        className="landing-normal">
                        {selectSetting?.instagram_url ?? '-'}
                      </Typography.Link>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={8} xs={24}>
                <Card>
                  <Row gutter={[10, 10]}>
                    <Col
                      xs={24}
                      style={{
                        textAlign: 'center',
                      }}>
                      <MailFilled
                        style={{
                          fontSize: 30,
                          color: '#800000',
                        }}
                      />
                    </Col>
                    <Col
                      xs={24}
                      style={{
                        textAlign: 'center',
                      }}>
                      <Typography.Link
                        href={`mailto:${selectSetting?.email}`}
                        className="landing-normal">
                        {selectSetting?.email ?? '-'}
                      </Typography.Link>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={8} xs={24}>
                <Card>
                  <Row gutter={[10, 10]}>
                    <Col
                      xs={24}
                      style={{
                        textAlign: 'center',
                      }}>
                      <PhoneFilled
                        style={{
                          fontSize: 30,
                          color: '#800000',
                        }}
                      />
                    </Col>
                    <Col
                      xs={24}
                      style={{
                        textAlign: 'center',
                      }}>
                      <Typography.Link
                        href={`tel:${selectSetting?.email}`}
                        className="landing-normal">
                        {selectSetting?.helpdesk ?? '-'}
                      </Typography.Link>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </>
          ) : (
            <EventDetail type={pageData?.event_info?.layout} data={pageData?.event_info} />
          )}
        </Row>
      </Col>
    </Row>
  );
};
EventPage.layout = 'base';
EventPage.title = 'Fire Safety Festival 2023';

export default EventPage;
