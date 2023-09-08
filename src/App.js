import "./App.css";
// import TestApiComponent from "./components/TestApiComponent";
import ProfilesApiComponent from "./project-features/profiles/ProfilesApiComponent";
import SingleProfile from "./project-features/profiles//SingleProfile";

import PostsApiComponent from "./project-features/posts/PostsApiComponent";
import SinglePost from "./project-features/posts/SinglePost";
import CreateNewPost from "./project-features/posts/CreateNewPost";
import EditMyPost from "./project-features/posts/EditMyPost";

import InterestGroupsApiComponent from "./project-features/interest-groups/InterestGroupsApiComponent";
import NavigationBar from "./components/NavigationBar";
import HomePageIntro from "./components/HomePageIntro";
import "./api/axiosDefaults";
import RegisterForm from "./components/auth/RegisterForm";
import LogInForm from "./components/auth/LogInForm";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className="App">
      {currentUser && ( // Render the header and the Navigation bar only if a user is logged in
        <header className="App-header">
          <NavigationBar />
        </header>
      )}

      
      


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

          <Route exact path="/createnewpost" render={() => <CreateNewPost />} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/edit-post/:postId" component={EditMyPost} />
          <Route
            exact
            path="/groups/baby"
            render={() => <InterestGroupsApiComponent />}
          />
          <Route
            exact
            path="/groups/toddler"
            render={() => <InterestGroupsApiComponent />}
          />
          <Route
            exact
            path="/groups/small-child"
            render={() => <InterestGroupsApiComponent />}
          />
          <Route
            exact
            path="/groups/healthcare"
            render={() => <InterestGroupsApiComponent />}
          />
          <Route
            exact
            path="/groups/activities"
            render={() => <InterestGroupsApiComponent />}
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
      <footer className="footer left">
        <div>
          <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p>
              Created by Anna Gabain as a Final Portfolio Project for
              CodeInstitute Fullstack Web Development diploma Prgramme,
              Educational purposes only
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
