import { updateRecordOfUser } from '@/infra/awakening/awakening.repository'

async function signIn(signInService) {
	await signInService();
	updateRecordOfUser()
}

export { signIn }
