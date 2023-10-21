import { dispatchEvent } from "sleepy-spider-lib"
import { setDoc, updateDoc } from 'firebase/firestore'
import { stores, EVENTS } from '@/adapter'
import { fetchLastScoreOfUser } from '@/infra/awakening/awakening.repository'

const editionId = import.meta.env.VITE_EDITION_ID

const getLocalScore = () => stores.awakening.value

const getRemoteScore = async () => {
	const snapshot = await fetchLastScoreOfUser()
	const { awakenings: scoreRemote } = snapshot
	return { scoreRemote, snapshot }
}

const getRecord = (scoreLocal, scoreRemote) => {
	const isRecord = Number(scoreLocal) > Number(scoreRemote)
	const record = isRecord ? scoreLocal : scoreRemote
	return {
		record,
		isNewRecord: isRecord,
	}
}

const parseRegistry = (user, score) => {
	const { displayName, photoURL, email } = user
	return {
		userUid: user.uid,
		value: score,
		displayName,
		photoURL,
		email,
		editionId,
	}
}

const updateScore = async (score, snapshot, user) => {
	const { existsDocument, documentRef } = snapshot
	const action = existsDocument ? updateDoc : setDoc
	await action(documentRef, parseRegistry(user, score))
}

const setRecord = async (record, snapshot, user) => {
	try {
		await updateScore(record, snapshot, user)
	} catch (error) {
		alert('Error updating the record: ' + error.message + " " + error.param)
		console.error(error)
	}
}

async function signIn(signInService) {
	const user = await signInService();
	const scoreLocal = getLocalScore()
	const { scoreRemote, snapshot } = await getRemoteScore()
	const { record, isNewRecord } = getRecord(scoreLocal, scoreRemote)
	if (isNewRecord) {
		await setRecord(record, snapshot, user)
	}
	dispatchEvent(EVENTS.UPDATE_BEST_SCORE_OF_USER, { score: record })
}

export { signIn }
