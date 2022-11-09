import { increment, setDoc, updateDoc } from 'firebase/firestore'

async function incrementFieldOnDocument ({ existsDocument, documentRef, field = 'value', value }) {
  const action = existsDocument ? updateDoc : setDoc
  await action(documentRef, {
    [field]: increment(value),
  })
}

export {
  incrementFieldOnDocument,
}
