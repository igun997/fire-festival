import { Avatar, Card, List, Typography } from 'antd';
import React, { useEffect } from 'react';
import { RootResources } from '../../../types/services/root';
import useLoading from '../../useLoading';
import { getListEvent } from '../../../services/root';
import { pathToAsset } from '../../../utils/global.util';
import Link from 'next/link';
import style from './index.module.less';

const EventsComponent = () => {
  const [data, setData] = React.useState<RootResources.getListEvent.data[]>([]);
  const loadingEvent = useLoading();
  const loadEvent = () => {
    loadingEvent.handleLoading(true);
    getListEvent()
      .then((res) => {
        setData(res.data.map((item) => item.attributes));
      })
      .finally(() => {
        loadingEvent.handleLoading(false);
      });
  };

  useEffect(() => {
    loadEvent();
  }, []);
  return (
    <div className={style.root}>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={data}
          loading={loadingEvent.loading}
          bordered={false}
          locale={{
            emptyText: (
              <Typography.Text strong>No events found. Please check back later.</Typography.Text>
            ),
          }}
          renderItem={(item: RootResources.getListEvent.data) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={pathToAsset(item?.icon?.data?.attributes?.url)} />}
                title={
                  <Link style={{ fontWeight: 700 }} href={`/event/${item.slug}`}>
                    {item.event_name}
                  </Link>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default EventsComponent;
