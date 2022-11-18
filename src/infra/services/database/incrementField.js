import { increment, setDoc, updateDoc } from 'firebase/firestore'

async function incrementFieldOnDocument ({ existsDocument, documentRef, field = 'value', value, user }) {
  const { displayName, photoURL, email } = user
  const action = existsDocument ? updateDoc : setDoc
  await action(documentRef, {
    [field]: increment(value),
    displayName,
    photoURL,
    email,
  })
}

export {
  incrementFieldOnDocument,
}
