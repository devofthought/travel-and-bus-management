import { Button, Result } from "antd";
import Link from "next/link";
const PaymentSuccessPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button className="secondary-bg" type="primary" key="console">
            <Link href={"/"}>Back To Home</Link>
          </Button>,
          <Button key="buy">Download Ticket</Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccessPage;
