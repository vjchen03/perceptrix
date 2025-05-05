import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginpage";
import RegisterPage from "./pages/registerpage";
import InfoPage from "./pages/infopage";
import FaceDetailPage from "./pages/FaceDetailPage";
import { IoMdInformationCircle } from "react-icons/io";
import { GrRobot } from "react-icons/gr";
import { RiGlassesFill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import FramesScreen from "./pages/tryonframes";

function App() {
  return (
    <Router>
      <div style={styles.wrapper}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/face/:shape" element={<FaceDetailPage />} />
          <Route path="/tryon" element={<FramesScreen />} />
        </Routes>
        <div style={styles.navbar}>
          <TabButton
            icon={<IoMdInformationCircle size={24} />}
            label="Info"
            path="/info"
          />
          <TabButton
            icon={<GrRobot size={24} />}
            label="AI"
            path="/ai"
          />
          <TabButton
            icon={<RiGlassesFill size={24} />}
            label="Try On"
            path="/tryon"
          />
          <TabButton
            icon={<AiOutlineUser size={24} />}
            label="Profile"
            path="/profile"
          />
        </div>
      </div>

    </Router>
  );
}

const TabButton = ({ icon, label, path }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname === path;
  return (
    <div
      onClick={() => navigate(path)}
      style={{
        ...styles.navItem,
        color: active ? "#5b4bff" : "#666",
        fontWeight: active ? "600" : "400",
      }}
    >
      {icon}
      <div style={{ fontSize: "12px", marginTop: "4px" }}>{label}</div>
    </div>
  )
}
const styles = {
  wrapper: {
    maxWidth: "430px",
    margin: "0 auto",
    padding : "0 1.5rem",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh",
    paddingBottom: "80px",
    position: "relative",
  },
  navbar: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "430px",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-around",
    padding: "0.5rem 0 0.3rem",
    boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.08)",
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
    cursor: "pointer",
    gap: "2px",
  },
};

export default App;