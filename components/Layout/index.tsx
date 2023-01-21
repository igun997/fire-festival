import { Col, Grid, Image, Layout, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.module.less';
import { UpOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../configs/hooks.config';
import { getSetting } from '../../services/root';
import { addSetting, setLoading } from '../../redux/slices/setting';
import OverlayLoaders from '../OverlayLoaders';
import Head from 'next/head';
import { pathToAsset } from '../../utils/global.util';

const { useBreakpoint } = Grid;
const { Content, Footer } = Layout;
const BaseLayout: React.FC<any> = ({ children }) => {
  const { xs } = useBreakpoint();
  const selectSetting = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();
  const loadSetting = () => {
    dispatch(setLoading(true));
    getSetting()
      .then((res) => {
        dispatch(addSetting(res.data.attributes));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  useEffect(() => {
    loadSetting();
  }, []);
  return (
    <OverlayLoaders active={selectSetting.loading}>
      <Head>
        <title>{selectSetting?.setting?.site_name || 'Fire Safety Festival 2013'}</title>
        <link
          rel="shortcut icon"
          href={
            pathToAsset(
              selectSetting?.setting?.logo?.data?.attributes?.formats?.small?.url ??
                selectSetting?.setting?.logo?.data?.attributes?.url,
            ) || '/icons/icon-192x192.png'
          }
          type="image/png"
        />
        <link
          rel="icon"
          href={
            pathToAsset(
              selectSetting?.setting?.logo?.data?.attributes?.formats?.small?.url ??
                selectSetting?.setting?.logo?.data?.attributes?.url,
            ) || '/icons/icon-192x192.png'
          }
          type="image/png"
        />
      </Head>
      <Layout className={styles.root}>
        <Layout className="site-layout" id="top">
          <Content
            className="site-layout-background-content"
            style={{
              minHeight: 280,
            }}>
            {children}
          </Content>
        </Layout>
        <Footer className="footer-container">
          <Row>
            <Col
              xs={24}
              md={{
                span: 10,
                offset: 7,
              }}>
              <Row gutter={[10, 10]}>
                {selectSetting?.setting?.footer_image?.data &&
                  selectSetting?.setting?.footer_image?.data.map((item) => (
                    <Col
                      xs={24}
                      key={item.id}
                      style={{
                        textAlign: 'center',
                      }}>
                      <Image
                        src={pathToAsset(item?.attributes?.url) ?? ''}
                        preview={false}
                        style={{
                          height: !xs ? 100 : 60,
                          width: 'auto',
                        }}
                      />
                    </Col>
                  ))}
                <Col xs={24}>
                  <Row gutter={[10, 10]} justify="space-between" align="middle">
                    <Col>
                      <Typography.Text className="footer-text">
                        {selectSetting?.setting?.footer_text ?? ''}
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Link href="#top">
                        <UpOutlined
                          style={{
                            fontSize: 20,
                          }}
                        />
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </OverlayLoaders>
  );
};

export default BaseLayout;
