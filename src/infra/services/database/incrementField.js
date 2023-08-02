import { setDoc, updateDoc } from 'firebase/firestore'

async function setFieldOnDocument ({ existsDocument, documentRef, field = 'value', value, user }) {
  const { displayName, photoURL, email } = user
  const action = existsDocument ? updateDoc : setDoc

  await action(documentRef, {
    userUid: user.uid,
    [field]: value,
    displayName,
    photoURL,
    email,
  })
}

export {
  setFieldOnDocument,
}
