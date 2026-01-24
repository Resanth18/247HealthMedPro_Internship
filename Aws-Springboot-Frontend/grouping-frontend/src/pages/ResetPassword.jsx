import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import PasswordMascot from "../components/PasswordMascot";
import "./resetPassword.css";

const { Text } = Typography;

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [mascot, setMascot] = useState("idle");

  const cardRef = useRef(null);

  /* 👀 Eyes follow cursor */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current || mascot === "covering") return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      document.documentElement.style.setProperty("--eye-x", `${x / 25}px`);
      document.documentElement.style.setProperty("--eye-y", `${y / 25}px`);

      setMascot("watching");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
    if (!/^\d{6}$/.test(values.code)) {
      toast.error("OTP must be exactly 6 digits 🔢");
      setMascot("sad");
      return;
    }

    if (!allPassed) {
      toast.error("Password does not meet all rules ❌");
      setMascot("sad");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({
        username: location.state?.username,
        code: values.code,
        newPassword: password,
      });

      toast.success("Password reset successful 🔐✨");
      setMascot("happy");
      setTimeout(() => navigate("/login"), 700);
    } catch {
      toast.error("Invalid OTP or password ❌");
      setMascot("sad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <Card title="🔐 Reset Your Password" className="reset-card" ref={cardRef}>
        
        {/* 🎭 Mascot added — UI untouched */}
        <PasswordMascot mode={mascot} />

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="OTP" name="code" rules={[{ required: true }]}>
            <Input
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              onFocus={() => setMascot("watching")}
              onBlur={() => setMascot("idle")}
            />
          </Form.Item>

          <Form.Item label="New Password" rules={[{ required: true }]}>
            <Input.Password
              className="password-input"
              placeholder="Create a strong password"
              onFocus={() => setMascot("covering")}
              onBlur={() => setMascot("idle")}
              onChange={(e) => {
                setPassword(e.target.value);
                setMascot("watching");
              }}
            />
          </Form.Item>

          {/* ✅ RULES — EXACT same UI */}
          <div className="rules-box">
            {rules.map(rule => {
              const passed = rule.test(password);
              const active = password.length > 0;

              return (
                <Text
                  key={rule.label}
                  className={`rule ${
                    passed ? "rule-pass" : active ? "rule-fail" : "rule-idle"
                  }`}
                >
                  {passed ? "✅" : "⬜"} {rule.label}
                </Text>
              );
            })}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="reset-btn"
          >
            Reset Password 🚀
          </Button>
        </Form>
      </Card>
    </div>
  );
}
