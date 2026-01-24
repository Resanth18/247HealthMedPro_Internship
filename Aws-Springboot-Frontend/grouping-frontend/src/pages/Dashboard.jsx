import { Card, Button, Typography, Row, Col, Tag } from "antd";
import {
  SafetyOutlined,
  ClockCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const { Title, Text } = Typography;

export default function Dashboard() {
  const navigate = useNavigate();

  // 🔐 Get email stored during login
  const email = localStorage.getItem("userEmail") || "";
  const username = email.split("@")[0]; // 👈 username before @

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      {/* 🔝 Top Bar */}
      <div className="dashboard-header">
        <Title level={3} style={{ margin: 0 }}>
          👋 Vanakam, {username}
        </Title>

        <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* 📊 Status Cards */}
      <Row gutter={20} className="dashboard-cards">
        <Col xs={24} md={8}>
          <Card className="dash-card">
            <SafetyOutlined className="dash-icon secure" />
            <Title level={5}>Authentication</Title>
            <Tag color="green">Secure</Tag>
            <Text type="secondary">
              JWT + AWS Cognito enabled
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="dash-card">
            <UserOutlined className="dash-icon user" />
            <Title level={5}>Account Status</Title>
            <Tag color="blue">Active</Tag>
            <Text type="secondary">
              Password verified successfully
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="dash-card">
            <ClockCircleOutlined className="dash-icon time" />
            <Title level={5}>Last Login</Title>
            <Tag color="purple">Just now</Tag>
            <Text type="secondary">
              Chennai, India 🇮🇳
            </Text>
          </Card>
        </Col>
      </Row>

      {/* 📘 Project Info */}
      <Card className="info-card">
        <Title level={4}>🔐 Project Overview</Title>

        <Text>
          This dashboard belongs to a complete authentication system ie microservice workflow
          it is built using <b>AWS Cognito</b> and <b>Spring Boot</b>. It supports
          secure login, OTP-based password reset, first-time login
          enforced password change, and interactive animated UX feedback.
        </Text>

        <br /><br />

        <Text strong style={{ color: "#1677ff" }}>
          Built during Internship @ 247HealthMedPro
        </Text>
      </Card>
    </div>
  );
}
