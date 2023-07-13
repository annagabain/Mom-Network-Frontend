// import logo from './logo.svg';
import logo from "./mom_network_logo.png";
import "./App.css";
import TestApiComponent from "./components/TestApiComponent";
// import ProfilesApiComponent from "./components/ProfilesApiComponent";
import PostsApiComponent from "./components/PostsApiComponent";
import NavigationBar from "./components/NavigationBar";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      <br />
      <br />
      <br />
      {/* <ProfilesApiComponent /> */}
    </div>
    <TestApiComponent />
    <PostsApiComponent />

    </>
  );
}

export default App;
