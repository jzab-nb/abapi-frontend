import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import {
  addInterfaceInfoUsingPOST, deleteInterfaceInfoUsingPOST,
  listInterfaceInfoVOByPageUsingPOST, offLineInterfaceUsingPOST, onLineInterfaceUsingPOST, updateInterfaceInfoUsingPOST
} from "@/services/abapi-frontend/interfaceInfoController";
import {SortOrder} from "antd/lib/table/interface";
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import {err} from "pino-std-serializers";
import UpdateModal from "@/pages/Admin/InterfaceInfo/components/UpdateModal";
import {override} from "@umijs/utils/compiled/prompts";

const InterfaceInfo: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPOST({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleCreateModalVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败, '+error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPOST({
        ...fields
      });
      hide();
      message.success('更新成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('更新失败, '+error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.IdRequest) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPOST({
        id:record.id
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败, '+error.message);
      return false;
    }
  };

  const handleOnLine = async (record: API.IdRequest) => {
    const hide = message.loading("正在上线");
    if(!record) return true;
    try{
      await onLineInterfaceUsingPOST({id: record.id});
      hide();
      message.success("上线成功");
      actionRef.current?.reload();
      return true;
    } catch (error: any){
      hide();
      message.error("上线失败, "+error.message);
      return false;
    }
  }

  const handleOffLine = async (record: API.IdRequest) => {
    const hide = message.loading("正在下线");
    if(!record) return true;
    try{
      await offLineInterfaceUsingPOST({id: record.id});
      hide();
      message.success("下线成功");
      actionRef.current?.reload();
      return true;
    } catch (error: any){
      hide();
      message.error("下线失败, "+error.message);
      return false;
    }
  }

  const addColumns: ProColumns<API.InterfaceInfoAddRequest>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      tip: '接口的名称',
      valueType: "text",
      formItemProps: {
        rules: [{
          required: true
        }]
      }
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: "textarea"
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: "text",
      formItemProps: {
        rules: [{
          required: true
        }]
      }
    },
    {
      title: '请求类型',
      dataIndex: 'method',
      valueType: "text",
      formItemProps: {
        rules: [{
          required: true
        }]
      }
    },
    {
      title: '请求参数',
      dataIndex: 'requestParam',
      valueType: "jsonCode"
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: "jsonCode"
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: "jsonCode"
    },
  ]
  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      tip: '接口的唯一编号',
      valueType: "text"
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      tip: '接口的名称',
      valueType: "text"
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: "textarea"
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: "text"
    },
    {
      title: '请求参数',
      dataIndex: 'requestParam',
      valueType: "jsonCode"
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: "jsonCode"
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: "jsonCode"
    },
    {
      title: '接口状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default'
        },
        1: {
          text: '开启',
          status: 'Processing'
        }
      }
    },
    {
      title: '请求类型',
      dataIndex: 'method',
      valueType: "text"
    },
    {
      title: '创建人',
      dataIndex: 'user.userName',
      valueType: "text"
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: "dateTime"
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: "dateTime"
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        (record.status === 0?
        <Button type="text" onClick={()=>{handleOnLine(record)}}>
          发布
        </Button>: null),
        (record.status === 1?
        <Button type="text" danger onClick={()=>{handleOffLine(record)}}>
          下线
        </Button>: null),
        <Button
          type="text"
          danger
          key="config"
          onClick={() => {
            setCurrentRow(record);
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  const updateColumns: ProColumns<API.InterfaceInfoUpdateRequest>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      tip: '接口的唯一编号',
      valueType: "text",
      readonly: true
      // hideInForm: true
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      tip: '接口的名称',
      valueType: "text"
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: "textarea"
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: "text"
    },
    {
      title: '请求参数',
      dataIndex: 'requestParam',
      valueType: "jsonCode"
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: "jsonCode"
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: "jsonCode"
    },
    {
      hideInForm: true,
      title: '接口状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default'
        },
        1: {
          text: '开启',
          status: 'Processing'
        }
      }
    },
    {
      title: '请求类型',
      dataIndex: 'method',
      valueType: "text"
    },
  ]
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'接口信息'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params: U & {
          pageSize?: number;
          current?: number;
          keyword?: string;
      }, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
          const res = await listInterfaceInfoVOByPageUsingPOST(
            {...params}
          );
          if(res.data){
            return{
              data: res.data.records || [],
              success: true,
              total: res.data.total || 0
            }
          }else{
            return {
              data: [],
              success: false,
              total: 0
            }
          }
      }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <UpdateModal
        columns={updateColumns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={addColumns}
        onCancel={() => {handleCreateModalVisible(false)}}
        onSubmit={(values) => {handleAdd(values)}}
        visible={createModalVisible}
      />
    </PageContainer>
  );
};
export default InterfaceInfo;
