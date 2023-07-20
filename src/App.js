import "./App.css";
import TestApiComponent from "./components/TestApiComponent";
import ProfilesApiComponent from "./components/ProfilesApiComponent";
import PostsApiComponent from "./components/PostsApiComponent";
import NavigationBar from "./components/NavigationBar";
import Button from "react-bootstrap/Button";
import "./api/axiosDefaults";
import RegisterForm from "./pages/auth/RegisterForm";
import LogInForm from "./pages/auth/LogInForm"

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <NavigationBar />
      </header>
      <br />
      <br />
      <br />
      <h1>Mom Network</h1>
      <h2>share ideas with other parents</h2>
      <Button className="register-login-button" variant="primary">
        Log In
      </Button>
      <span> or </span>
      <Button className="register-login-button" variant="primary">
        Register
      </Button>
      <RegisterForm />
      <LogInForm />
      <br />
      <br />
      <br />
    </div>
    <TestApiComponent />
    <PostsApiComponent />
    <ProfilesApiComponent />

    </>
  );
}

export default App;
