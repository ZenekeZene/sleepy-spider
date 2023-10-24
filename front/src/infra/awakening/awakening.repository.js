import { dispatchEvent } from "sleepy-spider-lib"
import { setDoc, updateDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { stores, EVENTS } from '@/adapter'
import { parseAwakeningRegistry } from '@/infra/awakening/awakening.parse'
import { getCollectionReference } from '@/infra/awakening/awakening.collection'

const editionId = import.meta.env.VITE_EDITION_ID

const getDocument = async () => {
	const awakeningsRef = getCollectionReference()
	const user = getUser()
	const { uid } = user
	const q = query(awakeningsRef, where("userUid", "==", uid), where("editionId", "==", editionId), limit(1))
	const querySnapshot = await getDocs(q)
	const doc = querySnapshot.docs[0]
	return doc
}

const getAllAwakeningsWithLimit = async (size) => {
	let leaderboard = []
	const awakeningsRef = getCollectionReference()
	const q = query(awakeningsRef, where("editionId", "==", editionId), orderBy("value", "desc"), limit(size))
	const querySnapshot = await getDocs(q)
	querySnapshot.forEach((doc) => {
		leaderboard.push(doc.data())
	})
	return leaderboard
}

const fetchAwakeningRegistryOfUser = async () => {
	const { isLogged, user } = stores.auth
	if (!isLogged) return null

	const { uid } = user
  if (!uid) throw new Error('Unknown userUid')

  const doc = await getDocument()

  return {
    data: doc?.data() || {},
    existsDocument: doc?.exists() || false,
  }
}

const getLocalScore = () => stores.awakening.value
const getUser = () => stores.auth.user

const getRemoteScoreOfUser = async () => {
	const snapshot = await fetchAwakeningRegistryOfUser()
	const { data } = snapshot || {}
	const { value: remoteScore } = data || { value: 0 }
	return { remoteScore, snapshot }
}

const getRecord = (localScore, remoteScore) => {
	const isRecord = Number(localScore) > Number(remoteScore)
	const record = isRecord ? localScore : remoteScore
	return {
		record,
		isNewRecord: isRecord,
	}
}

const updateScoreOfUser = async (score, snapshot) => {
	const { existsDocument } = snapshot
	const action = existsDocument ? updateDoc : setDoc
	const doc = await getDocument()
  const documentRef = doc.ref
	const user = getUser()
	const parsedAwakeningRegistry = parseAwakeningRegistry(user, score)
	await action(documentRef, parsedAwakeningRegistry)
}

const setRecord = async (record, snapshot) => {
	try {
		await updateScoreOfUser(record, snapshot)
	} catch (error) {
		alert('Error updating the record: ' + error.message + " " + error.param)
		console.error(error)
	}
}

const getBestScoreOfUser = async () => {
	const { remoteScore, snapshot } = await getRemoteScoreOfUser()
	const localScore = getLocalScore()
	const { record, isNewRecord } = getRecord(localScore, remoteScore)
	return { record, isNewRecord, snapshot }
}

const updateRecordOfUser = async () => {
	const { record, snapshot, isNewRecord } = await getBestScoreOfUser()
	if (isNewRecord) {
		await setRecord(record, snapshot)
	}
	dispatchEvent(EVENTS.UPDATE_BEST_SCORE_OF_USER, { score: record })
}

export {
	getBestScoreOfUser,
	updateRecordOfUser,
	getRemoteScoreOfUser,
	getAllAwakeningsWithLimit,
}
