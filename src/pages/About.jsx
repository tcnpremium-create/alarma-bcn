import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/SobreNosotros", { replace: true }); }, []);
  return null;
}