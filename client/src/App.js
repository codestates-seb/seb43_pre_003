import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Button from "./Components/style/Button";
// import Input from "./Components/style/Input";
// import Login from "./Pages/Login";
// import Home from "./Pages/Home";
// import Signup from "./Pages/Signup";
// import Forget from "./Pages/Forget/Forget";
// import ForgetComplete from "./Pages/Forget/ForgetComplete";

// const onChange = (e) => {
//   console.log(e);
// };

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />

        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forget" element={<Forget />} />
          <Route path="/ForgetComplete" element={<ForgetComplete />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
