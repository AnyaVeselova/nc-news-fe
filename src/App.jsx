import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ArticlesList from "./components/ArticlesList";
import Article from "./components/Article";
import ErrorPage from "./errorHandling/ErrorPage";
import UserLogin from "./components/Login";
import { useState } from "react";
import UserSignin from "./components/SignIn";

function App() {
  const [error, setError] = useState(null);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/articles"
          element={<ArticlesList error={error} setError={setError} />}
        />
        <Route
          path="/articles/:article_id"
          element={<Article error={error} setError={setError} />}
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signin" element={<UserSignin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
