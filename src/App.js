// import logo from './logo.svg';
import logo from "./mom_network_logo.png";
import "./App.css";
import TestApiComponent from "./components/TestApiComponent";
// import ProfilesApiComponent from "./components/ProfilesApiComponent";
import PostsApiComponent from "./components/PostsApiComponent";
import Button from 'react-bootstrap/Button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Button variant="primary">Primary</Button>
        <a className="App-link">Home</a>
        <a className="App-link">Feed</a>
        <a className="App-link">Groups</a>
        <a className="App-link">My network</a>
      </header>
      <br />
      <br />
      <br />
      <h1>Hello Mom Network!</h1>
      <TestApiComponent />
      {/* <ProfilesApiComponent /> */}
      <PostsApiComponent />
    </div>
  );
}

export default App;
