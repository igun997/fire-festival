import { LayoutConfigWithNextPage } from '../../configs/layout.config';
import { Button, Col, Grid, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getEventDetail } from '../../services/root';
import { RootResources } from '../../types/services/root';
import { useAppDispatch } from '../../configs/hooks.config';
import { setLoading } from '../../redux/slices/setting';
import style from './index.module.less';
import { LeftOutlined } from '@ant-design/icons';
import EventDetail from '../../components/Whitelabel/EventDetail';

const { useBreakpoint } = Grid;
const EventPage: LayoutConfigWithNextPage = (props: any) => {
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
      <Col
        xs={24}
        md={{
          span: 12,
          offset: 6,
        }}>
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
          <EventDetail type={pageData?.event_info?.layout} data={pageData?.event_info} />
        </Row>
      </Col>
    </Row>
  );
};
EventPage.layout = 'base';
EventPage.title = 'Fire Safety Festival 2023';

export default EventPage;
