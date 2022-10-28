import { initializeApp } from "firebase/app"
import { increment, getFirestore, collection, getDocs } from 'firebase/firestore'
import { doc, onSnapshot, updateDoc } from "firebase/firestore"

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

const initializeDatabase = () => {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  return db
}

async function getTotalAwakenings (db) {
  const awakeningsCol = collection(db, 'awakenings')
  const awakeningsSnapshot = await getDocs(awakeningsCol)
  const awakeningsValue = awakeningsSnapshot.docs.map(doc => doc.data())
  return awakeningsValue[0].value
}

async function addAwakening (db) {
  const awakeningsRef = doc(db, "awakenings", "total");
  await updateDoc(awakeningsRef, {
    value: increment(1)
  })
}

function listenAwakenings (db, callback) {
  const unsub = onSnapshot(doc(db, "awakenings", "total"), (doc) => {
    callback(doc.data())
  })
  return unsub
}

async function startAwakeningsSystem ({ onChange }) {
  const db = initializeDatabase()
  const initialAwakeningsValue = await getTotalAwakenings(db)
  const addAwakeningWithDB = () => addAwakening(db)

  onChange(initialAwakeningsValue)
  listenAwakenings(db, ({ value }) => { onChange(value) })

  return {
    initialValue: initialAwakeningsValue,
    addAwakening: addAwakeningWithDB,
  }
}

export {
  startAwakeningsSystem,
  getTotalAwakenings,
  addAwakening,
  listenAwakenings,
}

export default initializeDatabase
