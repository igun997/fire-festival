import { Col, Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './index.module.less';
import { useAppSelector } from '../../configs/hooks.config';
import { UpOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Content, Footer } = Layout;

const BaseLayout: React.FC<any> = ({ children }) => {
  const pageProps = useAppSelector((state) => state.pageProps);
  return (
    <>
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
        {!pageProps?.isError && (
          <Footer className="footer-container">
            <Row>
              <Col
                xs={24}
                md={{
                  span: 10,
                  offset: 7,
                }}>
                <Row gutter={[10, 10]} justify="space-between" align="middle">
                  <Col>
                    <Typography.Text className="footer-text">
                      Copyright © 2023 Subdit SDM Damkar
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
          </Footer>
        )}
      </Layout>
    </>
  );
};

export default BaseLayout;
