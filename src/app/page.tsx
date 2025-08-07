"use client";

import { AdvocatesContainer } from "../features/advocates";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={1}>Solace Advocates</Title>
      <AdvocatesContainer />
    </div>
  );
}
