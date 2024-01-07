const whatsappText = import.meta.env.VITE_SPONSOR_WHATSAPP_TEXT
const twitterText = import.meta.env.VITE_SPONSOR_TWITTER_TEXT
const linkedinText = import.meta.env.VITE_SPONSOR_LINKEDIN_TEXT

const replaceWhitespace = (text) => text.replace(/\s/g, '%20')
const replaceFinalScore = (text, finalScore) => text.replace('{finalScore}', finalScore)

const shareLinks = {
	whatsapp: (finalScore) => `https://wa.me/?text=${replaceFinalScore(replaceWhitespace(whatsappText), finalScore)}`,
	twitter: (finalScore) => `https://twitter.com/intent/tweet?text=${replaceFinalScore(replaceWhitespace(twitterText), finalScore)}`,
	linkedin: (finalScore) => `https://www.linkedin.com/sharing/share-offsite/?url=${replaceFinalScore(replaceWhitespace(linkedinText), finalScore)}`,
	metaDescription: (finalScore) => `I've woken Sleepy up ${finalScore} times. Can you beat my record?`,
}

export {
	shareLinks,
}
