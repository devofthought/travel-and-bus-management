import { Layout } from "antd";
const Footer = () => {
  const { Footer } = Layout;
  const date = new Date();
  const year = date.getFullYear();
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Dhruto Travel©{year} Created by dev of thought group
    </Footer>
  );
};

export default Footer;