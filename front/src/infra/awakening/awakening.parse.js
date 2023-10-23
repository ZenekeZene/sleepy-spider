const editionId = import.meta.env.VITE_EDITION_ID

const parseAwakeningRegistry = (user, score) => {
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

export { parseAwakeningRegistry }
