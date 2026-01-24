import { Form, Input, Button, Card, Typography, Space } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import PasswordMascot from "../components/PasswordMascot";

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const onFinish = async (values) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await login(values);

      if (res.data?.accessToken) {
  localStorage.setItem("userEmail", values.username); // 👈 ADD THIS LINE
  toast.success("Login successful ✅");
  setMascot("happy");
  setTimeout(() => navigate("/dashboard"), 700);
  return;
}


      if (res.data?.username === "NEW_PASSWORD_REQUIRED") {
        toast("Set new password to continue 🔐");
        navigate("/set-new-password", {
          state: { username: values.username, session: res.data.message },
        });
      }
    } catch {
      toast.error("Invalid credentials ❌");
      setMascot("sad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* LEFT SECTION */}
      <div style={styles.left}>
        <Title style={styles.mainTitle}>Authentication Portal</Title>

        <Text style={styles.subtitle}>
          A secure, production-grade authentication system built using{" "}
          <b>AWS Cognito</b> and <b>Spring Boot</b>.
        </Text>

        <div style={styles.projectBox}>
          <Text style={styles.projectText}>
            🔐 <b>Key Features</b>
            <br />
            • Secure login
            <br />
            • First-time login → forced password change
            <br />
            • OTP-based forgot & reset password
            <br />
            • Client-side password strength validation
            <br />
            • Interactive animated UX with live feedback
          </Text>

          <Text style={styles.intern}>
            Built during Internship @ <b>247HealthMedPro</b>
          </Text>
        </div>

        <Space direction="vertical" size={12} style={{ marginTop: 30 }}>
          <a
            href="https://github.com/Resanth18"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            <GithubOutlined /> github.com/Resanth18
          </a>

          <a
            href="https://www.linkedin.com/in/resanthsenthil"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            <LinkedinOutlined /> linkedin.com/in/resanthsenthil
          </a>

          <Text style={styles.email}>
            <MailOutlined /> resanth18x@gmail.com
          </Text>
        </Space>
      </div>

      {/* RIGHT SECTION */}
      <div style={styles.right}>
        <Card style={styles.card} ref={cardRef}>
          <PasswordMascot mode={mascot} />

          {/*<Title level={3} style={{ textAlign: "center", fontFamily: "Poppins, sans-serif" }}>
            Login
          </Title>*/}
         <div style={styles.loginRow}>
         <span>L</span>
         <span>O</span>
         <span>G</span>
         <span>I</span>
         <span>N</span>
        </div>



          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="username" rules={[{ required: true }]}>
              <Input
                onFocus={() => setMascot("watching")}
                onBlur={() => setMascot("idle")}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                onFocus={() => setMascot("covering")}
                onBlur={() => setMascot("idle")}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>

            <Button
              type="link"
              block
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    background: "linear-gradient(135deg,#141E30,#243B55)",
    fontFamily: "Inter, sans-serif",
  },
  left: {
    flex: 1,
    padding: 70,
    color: "#fff",
  },
  mainTitle: {
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    letterSpacing: "0.5px",
  },
  subtitle: {
    color: "#d9d9d9",
    fontSize: 16,
    maxWidth: 520,
    marginTop: 8,
  },
  projectBox: {
    marginTop: 28,
    background: "rgba(255,255,255,0.12)",
    padding: 18,
    borderRadius: 14,
    maxWidth: 520,
  },
  projectText: {
    color: "#f1f1f1",
    fontSize: 14,
    lineHeight: 1.6,
  },
  intern: {
    marginTop: 12,
    color: "#ffd666",
    fontSize: 14,
  },
  link: {
    color: "#ffffff",
    fontSize: 15,
  },
  email: {
    color: "#ffffff",
    fontSize: 15,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 380,
    borderRadius: 18,
  },
loginRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  width: "100%",
  padding: "0 24px",

  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "0.2em",

  marginBottom: 18,
},


};
