// import logo from './logo.svg';
import logo from "./mom_network_logo.png";
import "./App.css";
import TestApiComponent from "./components/TestApiComponent";
// import ProfilesApiComponent from "./components/ProfilesApiComponent";
import PostsApiComponent from "./components/PostsApiComponent";
import NavigationBar from './components/NavigationBar';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NavigationBar/>
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
