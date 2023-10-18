import {PageContainer, ProForm} from "@ant-design/pro-components";
import {useEmotionCss} from "@ant-design/use-emotion-css";

const Register: React.FC = () => {
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  return (
    <PageContainer className={containerClassName}>
      <ProForm>
        
      </ProForm>
    </PageContainer>
  );
};

export default Register;
