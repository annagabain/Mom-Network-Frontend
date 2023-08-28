import "./App.css";
import TestApiComponent from "./components/TestApiComponent";
import ProfilesApiComponent from "./components/ProfilesApiComponent";
import PostsApiComponent from "./components/PostsApiComponent";
import CreateNewPost from "./pages/posts/CreateNewPost";
import NavigationBar from "./components/NavigationBar";
import HomePageIntro from "./components/HomePageIntro";
import "./api/axiosDefaults";
import RegisterForm from "./pages/auth/RegisterForm";
import LogInForm from "./pages/auth/LogInForm";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const CurrentUserContext = createContext();
// export const SetCurrentUserContext = createContext();

function App() {
  // const [currentUser, setCurrentUser] = useState(null);

  // const handleMount = async () => {
  //   try {
  //     const { data } = await axios.get("dj-rest-auth/user/");
  //     setCurrentUser(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   handleMount();
  // }, []);


  return (

    // <CurrentUserContext.Provider value={currentUser}>
    //   <SetCurrentUserContext.Provider value={setCurrentUser}>

        <div className="App">
          <header className="App-header">
            <NavigationBar />
          </header>

          <TestApiComponent />

          <Container>
            <Switch>
              <Route exact path="/feed" render={() => <PostsApiComponent />} />
              <Route exact path="/create" render={() => <CreateNewPost />} />
              <Route
                exact
                path="/network"
                render={() => <ProfilesApiComponent />}
              />
              <Route exact path="/login" render={() => <LogInForm />} />
              <Route exact path="/register" render={() => <RegisterForm />} />
              <Route exact path="/" render={() => <HomePageIntro />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>

    //   </SetCurrentUserContext.Provider>
    // </CurrentUserContext.Provider>
  );
}

export default App;
