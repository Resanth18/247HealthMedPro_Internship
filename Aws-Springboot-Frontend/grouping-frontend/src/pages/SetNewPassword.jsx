import { Form, Input, Button, Card, Typography } from "antd";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import PasswordMascot from "../components/PasswordMascot";

const { Text } = Typography;

export default function SetNewPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [mascot, setMascot] = useState("idle");

  const cardRef = useRef(null);

  /* 👀 Eyes follow cursor */
  useEffect(() => {
    const move = (e) => {
      if (!cardRef.current || mascot === "covering") return;

      const r = cardRef.current.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;

      document.documentElement.style.setProperty("--eye-x", `${x / 25}px`);
      document.documentElement.style.setProperty("--eye-y", `${y / 25}px`);

      setMascot("watching");
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mascot]);

  const rules = [
    { label: "Minimum 8 characters", test: (p) => p.length >= 8 },
    { label: "At least 1 uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "At least 1 lowercase letter", test: (p) => /[a-z]/.test(p) },
    { label: "At least 1 number", test: (p) => /[0-9]/.test(p) },
    { label: "At least 1 special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
  ];

  const allPassed = rules.every(r => r.test(password));

  const onFinish = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match ❌");
      setMascot("sad");
      return;
    }

    if (!allPassed) {
      toast.error("Password rules not satisfied ❌");
      setMascot("sad");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/auth/set-new-password", {
        username: state.username,
        newPassword: values.newPassword,
        session: state.session,
      });

      toast.success("Password updated successfully 🔐✨");
      setMascot("happy");
      setTimeout(() => navigate("/login"), 700);
    } catch {
      toast.error("Failed to set new password ❌");
      setMascot("sad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card title="Set New Password" style={styles.card} ref={cardRef}>
        <PasswordMascot mode={allPassed ? "happy" : mascot} />

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="New Password" name="newPassword" rules={[{ required: true }]}>
            <Input.Password
              onFocus={() => setMascot("covering")}
              onBlur={() => setMascot("idle")}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true }]}>
            <Input.Password
              onFocus={() => setMascot("covering")}
              onBlur={() => setMascot("idle")}
            />
          </Form.Item>

          {/* RULES UI — UNTOUCHED */}
          <div style={{ marginBottom: 16 }}>
            {rules.map(rule => (
              <Text
                key={rule.label}
                type={rule.test(password) ? "success" : "secondary"}
                style={{ display: "block" }}
              >
                {rule.test(password) ? "✅" : "⬜"} {rule.label}
              </Text>
            ))}
          </div>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Change Password 🚀
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
    background: "linear-gradient(135deg,#1890ff,#40a9ff)",
  },
  card: {
    width: 400,
    borderRadius: 14,
  },
};
