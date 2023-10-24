import { dispatchEvent } from "sleepy-spider-lib"
import { addDoc, updateDoc, where, orderBy, limit } from 'firebase/firestore'
import { stores, EVENTS } from '@/adapter'
import { parseAwakeningRegistry } from '@/infra/awakening/awakening.parse'
import { getCollectionReference } from '@/infra/awakening/awakening.collection'
import { getQuerySnapshot } from '@/infra/firebase/firebase.getQuerySnapshot'

const editionId = import.meta.env.VITE_EDITION_ID

const getASingleDocument = async (snapshot) => {
	if (snapshot.empty) return null
	const doc = snapshot.docs[0]
	return doc
}

const getDocuments = async (snapshot) => {
	const documents = []
	snapshot.forEach((doc) => {
		documents.push(doc.data())
	})
	return documents
}

const getAwakeningDocument = async () => {
	const user = getUser()
	const { uid } = user
	const collection = getCollectionReference()
	const criteria = [where("userUid", "==", uid), where("editionId", "==", editionId)]
	const querySnapshot = await getQuerySnapshot(collection, criteria)
	return getASingleDocument(querySnapshot)
}

const getAllAwakeningsWithLimit = async (size) => {
	const collection = getCollectionReference()
	const criteria = [where("editionId", "==", editionId), orderBy("value", "desc"), limit(size)]
	const querySnapshot = await getQuerySnapshot(collection, criteria)
	return getDocuments(querySnapshot)
}

const fetchAwakeningRegistryOfUser = async () => {
	const { isLogged, user } = stores.auth
	if (!isLogged) return null

	const { uid } = user
  if (!uid) throw new Error('Unknown userUid')

  const doc = await getAwakeningDocument()
	const data = doc?.data() || {}
	const existsDocument = doc?.exists() || false

  return {
    data,
    existsDocument,
  }
}

const getLocalScore = () => stores.awakening.value
const getUser = () => stores.auth.user

const getRemoteScoreOfUser = async () => {
	const snapshot = await fetchAwakeningRegistryOfUser()
	const data = snapshot?.data
	const remoteScore = data?.value || 0
	return { remoteScore, snapshot }
}

const calculateRecord = (localScore, remoteScore) => {
	const isNewRecord = Number(localScore) > Number(remoteScore)
	return {
		record: isNewRecord ? localScore : remoteScore,
		isNewRecord,
	}
}

const updateScoreOfUser = async (score, snapshot) => {
	const { existsDocument } = snapshot
	const action = existsDocument ? updateDoc : addDoc
	const doc = await getAwakeningDocument()
  const documentRef = doc?.ref || getCollectionReference()
	const user = getUser()
	const parsedAwakeningRegistry = parseAwakeningRegistry(user, score)
	await action(documentRef, parsedAwakeningRegistry)
}

const getBestScoreOfUser = async () => {
	const { remoteScore, snapshot } = await getRemoteScoreOfUser()
	const localScore = getLocalScore()
	const { record, isNewRecord } = calculateRecord(localScore, remoteScore)
	return { record, isNewRecord, snapshot }
}

const updateRecordOfUser = async () => {
	const { record, snapshot, isNewRecord } = await getBestScoreOfUser()
	if (isNewRecord) {
		dispatchEvent(EVENTS.NEW_RECORD, { record })
		try {
			await updateScoreOfUser(record, snapshot)
		} catch (error) {
			console.error(error)
		}
	}
	dispatchEvent(EVENTS.UPDATE_BEST_SCORE_OF_USER, { score: record })
}

export {
	getBestScoreOfUser,
	updateRecordOfUser,
	getRemoteScoreOfUser,
	getAllAwakeningsWithLimit,
}
