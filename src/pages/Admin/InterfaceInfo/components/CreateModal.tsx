import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React from 'react';

// 定义模态框的类型
export type Props = {
  columns: ProColumns<API.InterfaceInfoVO>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoAddRequest) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const {visible, columns, onCancel, onSubmit} = props;
  return (
    <Modal visible={visible} onCancel={() => onCancel?.()}>
      <ProTable type="form" columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value)
        }}
      />
    </Modal>
  );
};
export default CreateModal;
