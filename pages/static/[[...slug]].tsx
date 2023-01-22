import { LayoutConfigWithNextPage } from '../../configs/layout.config';
import { Button, Col, Grid, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getStaticPage } from '../../services/root';
import { RootResources } from '../../types/services/root';
import { useAppDispatch } from '../../configs/hooks.config';
import { changeFooterImage, changeFooterText, setLoading } from '../../redux/slices/setting';
import style from './index.module.less';
import RenderSection from '../../components/Whitelabel';
import { LeftOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const StaticPage: LayoutConfigWithNextPage = (props: any) => {
  const { xs } = useBreakpoint();
  const { push, query } = useRouter();
  const dispatch = useAppDispatch();
  const [pageData, setPageData] = useState<RootResources.getStaticPage.data | null>(null);
  const loadPage = (slug: string) => {
    dispatch(setLoading(true));
    getStaticPage(slug)
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

  useEffect(() => {
    if (pageData) {
      if (pageData.footer_text) {
        dispatch(changeFooterText(pageData.footer_text));
      }
      if (pageData.footer_image.data) {
        dispatch(changeFooterImage(pageData.footer_image || []));
      }
    }
  }, [pageData]);
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
                    {pageData?.title ?? ''}
                  </Typography.Title>
                ) : (
                  <Typography.Title className="landing-heading fs-xs" level={2}>
                    {pageData?.title ?? ''}
                  </Typography.Title>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Button type="link" icon={<LeftOutlined />} onClick={() => push('/')}>
              Kembali
            </Button>
          </Col>
          {pageData?.config &&
            pageData?.config.map((item) => {
              return (
                <Col key={item.id} {...item.layout}>
                  <RenderSection component={item.name} pageData={pageData} {...item} />
                </Col>
              );
            })}
        </Row>
      </Col>
    </Row>
  );
};
StaticPage.layout = 'base';
StaticPage.title = 'Fire Safety Festival 2023';

export default StaticPage;
