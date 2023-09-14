import "./App.css";
// import TestApiComponent from "./components/TestApiComponent";
import ProfilesApiComponent from "./project-features/profiles/ProfilesApiComponent";
import SingleProfile from "./project-features/profiles//SingleProfile";
import EditMyProfileForm from "./project-features/profiles/EditMyProfile";


import PostsApiComponent from "./project-features/posts/PostsApiComponent";
import SinglePost from "./project-features/posts/SinglePost";
import CreateNewPost from "./project-features/posts/CreateNewPost";
import EditMyPost from "./project-features/posts/EditMyPost";

import PagesApiComponent from "./project-features/pages/PagesApiComponent";
import SinglePage from "./project-features/pages/SinglePage";

import NavigationBar from "./components/NavigationBar";
import HomePageIntro from "./components/HomePageIntro";
import "./api/axiosDefaults";
import RegisterForm from "./components/auth/RegisterForm";
import LogInForm from "./components/auth/LogInForm";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import { useCurrentUser } from "./contexts/CurrentUserContext";
import EditMyComment from "./project-features/comments/EditMyComment";
import SingleComment from "./project-features/comments/SingleComment";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className="App">
      {currentUser && ( // Render the header and the Navigation bar only if a user is logged in
        <header className="App-header">
          <NavigationBar />
        </header>
      )}
      <p className="footer left">
        Created by Anna Gabain. Educational purposes only
      </p>

      {/* <TestApiComponent /> */}

      <Container>
        <Switch>
          {!currentUser && ( // Render the Intro and with the Login form as a Homepage if there is no logged in user yet
            <Route exact path="/" render={() => <HomePageIntro />} />
          )}
          :
          {
            // Render the Feed as a Homepage if a user is  logged in
            <Route exact path="/" render={() => <PostsApiComponent />} />
          }
          <Route exact path="/login" render={() => <LogInForm />} />
          <Route exact path="/register" render={() => <RegisterForm />} />
          <Route exact path="/feed" render={() => <PostsApiComponent />} />
          <Route
            exact
            path="/mom-network"
            render={() => <ProfilesApiComponent />}
          />
          <Route exact path="/profiles/:profileId" component={SingleProfile} />
          <Route exact path="/edit-profile/:profileId" component={EditMyProfileForm} />

          <Route exact path="/createnewpost" render={() => <CreateNewPost />} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/edit-post/:postId" component={EditMyPost} />
          <Route exact path="/comments/:commentId" component={SingleComment} />
          <Route path="/edit-comment/:commentId" component={EditMyComment} />
          <Route exact path="/pages" component={PagesApiComponent} />
          <Route exact path="/pages/:pageId" component={SinglePage} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
