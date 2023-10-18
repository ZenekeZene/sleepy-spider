import { setDoc, updateDoc } from 'firebase/firestore'

const editionId = import.meta.env.VITE_EDITION_ID

async function setFieldOnDocument ({ existsDocument, documentRef, value, user }) {
  const { displayName, photoURL, email } = user
  const action = existsDocument ? updateDoc : setDoc

	alert('(setFiedlOnDocument) - Actualizamos score con tu local. Value:' + value)

  await action(documentRef, {
    userUid: user.uid,
    value,
    displayName,
    photoURL,
    email,
    editionId,
  })
}

export {
  setFieldOnDocument,
}
