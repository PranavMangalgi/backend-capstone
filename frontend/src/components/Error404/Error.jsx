import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";

function Error() {
    const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);

  return (
    <div>
      This particular route or page does not exist, redirecting you to home
      page
    </div>
  );
}

export default Error;
