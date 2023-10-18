import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Divider, Form, Input, List, message, Skeleton, Spin} from "antd";
import {
  getInterfaceInfoVOByIdUsingGET, invokeUsingPOST,
  listInterfaceInfoVOByPageUsingPOST
} from "@/services/abapi-frontend/interfaceInfoController";
import {useMatch, useParams} from "@@/exports";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoVO>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const params = useParams();
  const loadData = async ()=> {
    if(!params.id){
      message.error("参数不存在");
      return;
    }
    setLoading(true);
    try{
      const res = await getInterfaceInfoVOByIdUsingGET({
        id: Number(params.id)
      });
      setData(res.data);
    }catch (e: any){
      message.error("请求失败, "+e.message);
    }
    setLoading(false);
  }

  useEffect(()=>{
    loadData();
  },[]);

  const onFinish = async (values: any)=>{
    if(!params.id){
      message.error("接口不存在");
      return;
    }
    try{
      setInvokeLoading(true);
      const res = await invokeUsingPOST(
        {
          id: params.id,
          ...values
      });
      setInvokeRes(res.data);
      message.success("调用成功");
    }catch (errors: any){
      message.error("调用失败, "+ errors.message);
    }
    setInvokeLoading(false);
  }

  return (
    <PageContainer title="接口详细信息">
      <Card>
      {
        data ?
        <Descriptions title={data.name} column={1}>
          <Descriptions.Item label="接口状态">{data.status===1?"开启":"关闭"}</Descriptions.Item>
          <Descriptions.Item label="接口描述">{data.description}</Descriptions.Item>
          <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
          <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
          <Descriptions.Item label="请求参数">{data.requestParam}</Descriptions.Item>
          <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
          <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          <Descriptions.Item label="作者">{data.user?.userName}</Descriptions.Item>
        </Descriptions> : <h1>"接口不存在"</h1>
      }
      </Card>
      <Divider/>
      <Card title="在线调用">
        <Form
          layout="vertical"
          name="invoke"
          onFinish={onFinish}
        >
          <Form.Item
            label="请求参数"
            name="userRequestParam"
          >
            <Input.TextArea/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider/>
      <Card title="调用结果">
        <Spin spinning={invokeLoading}/>
        {invokeRes}
      </Card>
    </PageContainer>
  );
}

export default Index;
