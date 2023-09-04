import "./App.css";
import TestApiComponent from "./components/TestApiComponent";
import ProfilesApiComponent from "./components/ProfilesApiComponent";

import PostsApiComponent from "./components/PostsApiComponent";
import SinglePost from "./pages/posts/SinglePost";
import CreateNewPost from "./pages/posts/CreateNewPost";
import EditMyPost from "./pages/posts/EditMyPost";

import InterestGroupsApiComponent from "./components/InterestGroupsApiComponent";
import NavigationBar from "./components/NavigationBar";
import HomePageIntro from "./components/HomePageIntro";
import "./api/axiosDefaults";
import RegisterForm from "./pages/auth/RegisterForm";
import LogInForm from "./pages/auth/LogInForm";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";


function App() {

  return (

    <div className="App">
      <header className="App-header">
        <NavigationBar />
      </header>

      <TestApiComponent />

      <Container>
        <Switch>
          <Route exact path="/feed" render={() => <PostsApiComponent />} />
          <Route exact path="/createnewpost" render={() => <CreateNewPost />} />
          <Route
            exact
            path="/network"
            render={() => <ProfilesApiComponent />}
          />
          <Route exact path="/login" render={() => <LogInForm />} />
          <Route exact path="/register" render={() => <RegisterForm />} />
          <Route exact path="/" render={() => <HomePageIntro />} />

          <Route exact path="/groups/baby" render={() => <InterestGroupsApiComponent />} />
          <Route exact path="/groups/toddler" render={() => <InterestGroupsApiComponent />} />
          <Route exact path="/groups/small-child" render={() => <InterestGroupsApiComponent />} />
          <Route exact path="/groups/healthcare" render={() => <InterestGroupsApiComponent />} />
          <Route exact path="/groups/activities" render={() => <InterestGroupsApiComponent />} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/edit-post/:postId" component={EditMyPost}/>



          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;
