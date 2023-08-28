import { CaretRightOutlined } from "@ant-design/icons";
import React from "react";
import { Collapse, theme } from "antd";

const getItems = (panelStyle) => [
  {
    key: "1",
    label: (
      <h2 className="text-lg font-medium">
        How will I receive my booking confirmation?
      </h2>
    ),
    children: (
      <p className="text-base">
        Once your booking is complete, you will receive a confirmation email
        and/or SMS containing your e-ticket details. You can also log in to your
        account on our website to access your booking information.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: (
      <h2 className="text-lg font-medium">
        Can I select my preferred seat on the bus?
      </h2>
    ),
    children: (
      <p className="text-base">
        Yes, you can select your preferred seats during the booking process. We
        offer a seat selection option that allows you to choose seats according
        to availability. Additional charges may apply for certain seat types.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "3",
    label: (
      <h2 className="text-lg font-medium">
        Can I change or cancel a booked ticket?
      </h2>
    ),
    children: (
      <p className="text-base">
        Yes, you can change or cancel your booked ticket. We offer flexible
        options for modifying your travel plans. However, keep in mind that
        there might be fees associated with changes or cancellations. Please
        refer to our Booking Policies page for more information.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "4",
    label: (
      <h2 className="text-lg font-medium">
        What payment methods are accepted?
      </h2>
    ),
    children: (
      <p className="text-base">
        We accept various payment methods, including major credit cards, debit
        cards, and popular mobile wallet services. Your payment information is
        secure and encrypted.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "5",
    label: (
      <h2 className="text-lg font-medium">
        How early should I arrive at the bus terminal?
      </h2>
    ),
    children: (
      <p className="text-base">
        We recommend arriving at the bus terminal at least 30 minutes before the
        scheduled departure time. This allows ample time for check-in, boarding
        procedures, and any necessary security checks.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "6",
    label: (
      <h2 className="text-lg font-medium">
        What documents do I need to carry while boarding the bus?
      </h2>
    ),
    children: (
      <p className="text-base">
        Please carry a printout or digital copy of your e-ticket along with a
        valid photo ID. This will be required for identification purposes during
        check-in and boarding.
      </p>
    ),
    style: panelStyle,
  },
];

const CollapseComponent = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 16,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            style={{ fontSize: "18px", marginTop: "5px" }}
            rotate={isActive ? 90 : 0}
          />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={getItems(panelStyle)}
      />
    </div>
  );
};

export default CollapseComponent;
