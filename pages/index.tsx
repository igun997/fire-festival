import { LayoutConfigWithNextPage } from '../configs/layout.config';
import React, { useEffect, useState } from 'react';
import { Card, Col, Grid, Image, Row, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import style from './index.module.less';
import { useAppSelector } from '../configs/hooks.config';
import { pathToAsset } from '../utils/global.util';
import useLoading from '../components/useLoading';
import { getListLanding } from '../services/root';
import { RootResources } from '../types/services/root';

const { useBreakpoint } = Grid;
const Home: LayoutConfigWithNextPage = (props: any) => {
  const { xs } = useBreakpoint();
  const router = useRouter();
  const setting = useAppSelector((state) => state.setting.setting);
  const [landingData, setLandingData] = useState<RootResources.getListLanding.data[]>([]);
  const loadingLanding = useLoading();
  const loadLanding = () => {
    loadingLanding.handleLoading(true);
    getListLanding()
      .then((res) => {
        setLandingData(res.data.map((item) => item.attributes));
      })
      .finally(() => {
        loadingLanding.handleLoading(false);
      });
  };
  const navigateTo = (slug: string, is_external: boolean) => {
    if (is_external) {
      return window.open(slug, '_blank');
    }
    return router.push(`/${slug}`);
  };
  useEffect(() => {
    loadLanding();
  }, []);
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
        <Row>
          <Col
            xs={24}
            style={{
              textAlign: 'center',
            }}>
            <Row gutter={[10, 10]} justify="space-between" align="middle">
              {xs && (
                <Col xs={24}>
                  <Image
                    style={{
                      height: 80,
                      width: 'auto',
                      verticalAlign: 'middle',
                    }}
                    src={
                      pathToAsset(
                        setting?.logo?.data?.attributes?.formats?.small?.url ??
                          setting?.logo?.data?.attributes?.url,
                      ) ?? ''
                    }
                    preview={false}
                  />
                </Col>
              )}
              <Col xs={24}>
                {!xs ? (
                  <Typography.Title className="landing-heading" level={2}>
                    <Space direction="horizontal">
                      <Image
                        style={{
                          height: 100,
                          width: 'auto',
                          verticalAlign: 'middle',
                        }}
                        src={
                          pathToAsset(
                            setting?.logo?.data?.attributes?.formats?.small?.url ??
                              setting?.logo?.data?.attributes?.url,
                          ) ?? ''
                        }
                        preview={false}
                      />
                      <span>{setting?.site_name ?? ''}</span>
                    </Space>
                  </Typography.Title>
                ) : (
                  <Typography.Title className="landing-heading fs-xs" level={2}>
                    {setting?.site_name ?? ''}
                  </Typography.Title>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Row gutter={[10, 10]}>
              {loadingLanding.loading ? (
                <Col xs={24}>
                  <Card loading={true} />
                </Col>
              ) : (
                landingData.map((item, index) => (
                  <Col xs={24} key={`${index}-col`} md={12}>
                    <Card onClick={() => navigateTo(item.path, item.is_external)}>
                      <Row gutter={[5, 5]}>
                        <Col
                          xs={24}
                          style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            src={pathToAsset(item?.site_logo?.data?.attributes?.url) ?? ''}
                            style={{
                              height: 80,
                              width: 'auto',
                            }}
                            preview={false}
                          />
                        </Col>
                        <Col
                          xs={24}
                          style={{
                            textAlign: 'center',
                          }}>
                          <Typography.Text className="landing-title">
                            {item?.title ?? ''}
                          </Typography.Text>
                        </Col>
                        <Col
                          xs={24}
                          style={{
                            textAlign: 'center',
                          }}>
                          <Typography.Text className="landing-desc">
                            {item?.description ?? ''}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
Home.layout = 'base';
Home.title = 'Fire Festival 2023';
Home.description =
  'Dalam rangka peringatan Hari Ulang Tahun (HUT) Pemadam Kebakaran dan Penyelamatan Ke-104, Kementerian Dalam Negeri bekerja sama dengan Dinas Penanggulangan Kebakaran dan Penyelamatan Provinsi DKI Jakarta dengan dukungan dari berbagai pihak akan menyelenggarakan Festival Keselamatan Kebakaran Tahun 2023 (Fire Safety Festival 2023) dengan berbagai rangkaian kegiatan diantaranya: kompetisi keterampilan aparatur pemadam kebakaran dan\n' +
  'penyelamatan, pameran alat pemadam kebakaran dan penyelamatan, edukasi keselamatan kebakaran kepada anak usia sekolah, serta kegiatan lainnya yang akan membuat antusias masyarakat untuk hadir.';

export default Home;
