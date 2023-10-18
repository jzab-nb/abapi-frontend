import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React, {useEffect, useRef} from 'react';
import {ProFormInstance} from "@ant-design/pro-form/lib";

// 定义模态框的类型
export type Props = {
  values: API.InterfaceInfoUpdateRequest
  columns: ProColumns<API.InterfaceInfoUpdateRequest>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoUpdateRequest) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const {visible, columns, onCancel, onSubmit, values} = props;
  const formRef = useRef<ProFormInstance>();
  useEffect(()=>{
    if(formRef){ formRef.current?.setFieldsValue(values)}
  }, [values])
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable type="form" columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value)
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
