import { getDoc, doc } from 'firebase/firestore'

async function getSnapshot ({ database, documentId, userUid }) {
  if (!userUid) throw new Error('Unknown userUid')
  const documentRef = doc(database, documentId, userUid)
  const documentSnap = await getDoc(documentRef)

  return {
    data: documentSnap.data(),
    existsDocument: documentSnap.exists(),
    documentSnap,
    documentRef,
  }
}

export {
  getSnapshot,
}
