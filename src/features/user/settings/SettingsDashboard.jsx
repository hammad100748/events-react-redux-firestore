import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import SettingsNav from "./SettingsNav";
import { Route, Switch, Redirect } from "react-router-dom";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";
import { updatePassword } from "../../auth/AuthActions";
import { updateProfile } from "../userActions";

const mapState = state => ({
  //  If want to check how we get these values from redux store use redux dev tool to check
  // state.firebase.auth.isLoaded && use this to check if auth id loaded but in this case we use authReady wrapper around render in index.js
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});

const actions = {
  updatePassword,
  updateProfile
};

const SettingsDashboard = ({
  updatePassword,
  providerId,
  user,
  updateProfile
}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route
            path="/settings/basic"
            render={() => (
              <BasicPage 
              updateProfile={updateProfile} 
              initialValues={user} />
            )}
          />
          <Route
            path="/settings/about"
            render={() => (
              <AboutPage 
              updateProfile={updateProfile} 
              initialValues={user} />
            )}
          />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                providerId={providerId}
                updatePassword={updatePassword}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(
  mapState,
  actions
)(SettingsDashboard);
