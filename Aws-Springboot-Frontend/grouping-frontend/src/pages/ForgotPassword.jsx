import { Form, Input, Button, Card } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { forgotPassword } from "../api/authApi";
import { useState, useEffect, useRef } from "react";
import PasswordMascot from "../components/PasswordMascot";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [mascot, setMascot] = useState("idle");

  const cardRef = useRef(null);

  /* 👀 Cursor follow */
  useEffect(() => {
    const move = (e) => {
      if (!cardRef.current) return;

      const r = cardRef.current.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;

      document.documentElement.style.setProperty("--eye-x", `${x / 25}px`);
      document.documentElement.style.setProperty("--eye-y", `${y / 25}px`);

      setMascot("watching");
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const onFinish = async (values) => {
    if (loading) return;
    setLoading(true);

    try {
      await forgotPassword(values);
      toast.success("OTP sent to email 📧");
      setMascot("happy");

      navigate("/reset-password", {
        state: { username: values.username },
      });
    } catch {
      toast.error("Failed to send OTP ❌");
      setMascot("sad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card title="Forgot Password" style={styles.card} ref={cardRef}>
        <PasswordMascot mode={mascot} />

        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ username: location.state?.username }}
        >
          <Form.Item label="Email" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Send OTP
          </Button>
        </Form>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
  },
  card: {
    width: 380,
  },
};
