import moment from "moment";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import {
  asyncActionError,
  asyncActionStart,
  asyncActionFinish
} from "../async/asyncActions";
import firebase from "../../app/config/firebase";
import { FETCH_EVENTS } from '../event/eventConstants';



export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  // This will spread isLoaded, isEmpty and everything else to updatedUser and in this case we want to remove isEmpty nd isLoaded
  const { isLoaded, isEmpty, ...updatedUser } = user;
  const firebase = getFirebase();
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  }

  try {
    await firebase.updateProfile(updatedUser);
    console.log("here");
    toastr.success("Success", "Profile Updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };
  try {
    dispatch(asyncActionStart());
    // Upload file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // Get URL of file
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    // get user doc
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has photo, if not update profile
    if (!userDoc.data().photoURL) {
      // update profile photoURL of user
      await firebase.updateProfile({ photoURL: downloadURL });
      // update auth photoURL of user
      await user.updateProfile({ photoURL: downloadURL });
    }
    // add new photo to photos collection
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error("Problem Uploading Photo");
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    dispatch(asyncActionStart());
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [
        {
          collection: "photos",
          doc: photo.id
        }
      ]
    });
    dispatch(asyncActionFinish());
    toastr.success("Success", "Photo Deleted");
  } catch (error) {
    dispatch(asyncActionError());
    throw new Error("Problem deleting the photo");
  }
};

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    return await firebase.updateProfile({
      photoURL: photo.url
    });
  } catch (error) {
    throw new Error("Problem setting new photo");
  }
};

export const goingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  const photoUrl = getState().firebase.profile.photoURL;
  const attendee = {
    going: true,
    joinDate: Date.now(),
    photoURL: photoUrl || "/assets/user.png",
    displayName: user.displayName,
    host: false
  };

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee
    });
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false
    });
    toastr.success("Success", "Successfully joined event");
  } catch (error) {
    toastr.error("Oops", "Problem Joining Event");
  }
};

export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete() // We delete individual object from firestore
    });
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success("Success", "Successfully removed form event");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Something went wrong");
  }
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  let eventsRef = firestore.collection("event_attendee");
  let query;
  switch (activeTab) {
    case 1:
      //Past Events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", "<=", today)
        .orderBy("eventDate", "desc");
      break;
    case 2:
      //Future Events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", ">=", today)
        .orderBy("eventDate");
      break;
    case 3:
      //Hosted Events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("host", "==", true)
        .orderBy("eventDate", "desc");
      break;
    default:
      // All Events
      query = eventsRef
        .where("userUid", "==", userUid)
        .orderBy("eventDate", "desc");
      break;
  }

  try {
    let querySnap = await query.get();
    let events = [];

    for(let i=0; i<querySnap.docs.length; i++){
      let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
      events.push({...evt.data(), id:evt.id});
    }

    dispatch({type:FETCH_EVENTS, payload:{events}});

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
