import "./App.css";
import TestApiComponent from "./components/TestApiComponent";
import ProfilesApiComponent from "./components/ProfilesApiComponent";
import PostsApiComponent from "./components/PostsApiComponent";
import NavigationBar from "./components/NavigationBar";
import Button from "react-bootstrap/Button";
import "./api/axiosDefaults";
import RegisterForm from "./pages/auth/RegisterForm";
import LogInForm from "./pages/auth/LogInForm";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />
      </header>
      <Container>
        <Switch>
          <Route exact path="/feed" render={() => <h1>Feed</h1>} />
          <Route exact path="/network" render={() => <h1>My Network</h1>} />
          <Route exact path="/login" render={() => <h1>Login</h1>} />
          <Route exact path="/register" render={() => <h1>Register</h1>} />
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
      <br />
      <br />
      <br />
      <h1>Mom Network</h1>
      <h2>share ideas with other parents</h2>
      <NavLink exact to="/login">
        <Button className="register-login-button" variant="primary">
          Log In
        </Button>
      </NavLink>
      <span> or </span>
      <NavLink exact to="/register">
      <Button className="register-login-button" variant="primary">
        Register
      </Button>
      </NavLink>
      <RegisterForm />
      <LogInForm />
      <br />
      <br />
      <br />
      <TestApiComponent />
      <PostsApiComponent />
      <ProfilesApiComponent />
    </div>
  );
}

export default App;
