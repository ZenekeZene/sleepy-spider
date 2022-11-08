import { initializeApp } from "firebase/app"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAs2wqgTz_KwNN-KRElHWSXI6TAuefQB84",
  authDomain: "sleepy-spider.firebaseapp.com",
  projectId: "sleepy-spider",
  storageBucket: "sleepy-spider.appspot.com",
  messagingSenderId: "146527522996",
  appId: "1:146527522996:web:139660912fa4c6aeb007e1"
}

const initializeFirebase = () => initializeApp(firebaseConfig)

export {
  initializeFirebase,
}
