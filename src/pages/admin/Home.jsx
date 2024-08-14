import React, { useState } from "react";
import AnimatedPage from "../../components/framer/AnimatedPage";
const Home = () => {
  const [user, setUser] = useState(localStorage.getItem('userAuth'));

  return (
  <div>
    Bienvenido a mi panel administrativo
  </div>
  );
};

export default Home;
