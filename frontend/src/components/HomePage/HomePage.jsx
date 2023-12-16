import { useState, useEffect } from "react";

function MainPage() {
  const [name, setName] = useState(
    localStorage.getItem("recruiterName")
      ? localStorage.getItem("recruiterName")
      : ""
  );

  useEffect(() => {
    console.log(localStorage.getItem("token"));
  }, []);

  return <>{name}</>;
}

export default MainPage;
