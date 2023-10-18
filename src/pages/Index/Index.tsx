import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {List, message, Skeleton} from "antd";
import {listInterfaceInfoVOByPageUsingPOST} from "@/services/abapi-frontend/interfaceInfoController";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfoVO[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadData = async (current=1, pageSize=10)=> {
    setLoading(true);
    try{
      const res = await listInterfaceInfoVOByPageUsingPOST({
        current, pageSize
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    }catch (e: any){
      message.error("请求失败, "+e.message);
    }
    setLoading(false);
  }

  useEffect(()=>{
    loadData();
  },[]);

  return (
    <PageContainer title="在线接口开放平台">
      <List
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => {
          const apiLink = `/interface_info/${item.id}`;
          return (<List.Item
            actions={[<a href={apiLink}>查看</a>]}
          >
          <List.Item.Meta
            title={<a href={apiLink}>{item.name}</a>}
            description={item.description}
          />
          </List.Item>
          );
        }}
        pagination={{
          pageSize: 10,
          total,
          showTotal(st: number){
            return `总数: -${st}-`;
          },
          onChange(page, pageSize){
            loadData(page, pageSize);
          }
        }}
      />
    </PageContainer>
  );
};

export default Index;
