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

  return (
    <>
    <div>{name}</div>
    <div>{localStorage.getItem('token')}</div>
    </>
  )
}

export default MainPage;
