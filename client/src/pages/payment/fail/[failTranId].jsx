import { Button, Result } from "antd";
import Link from "next/link";

const PaymentFailPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status="error"
        title="Payment Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button className="secondary-bg" type="primary" key="console">
            <Link href={"/"}>Back To Home</Link>
          </Button>,
          <Button key="buy">Try Again</Button>,
        ]}
      ></Result>
    </div>
  );
};

export default PaymentFailPage;
