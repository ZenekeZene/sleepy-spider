import { findById, findBySelector } from 'sleepy-spider-lib'

function changeTwitterShareLink (finalScore) {
  const twitterShareLink = findById('twitter-share-link')
  twitterShareLink.href = `https://twitter.com/intent/tweet?text=I've%20woken%20Sleepy%20up%20${finalScore}%20times.%20Can%20you%20beat%20my%20record?%20https://sleepy.zenekezene.com`
}

function changeWhatsappShareLink (finalScore) {
  const whatsappShareLink = findById('whatsapp-share-link')
  whatsappShareLink.href = `https://wa.me/?text=I've%20woken%20Sleepy%20up%20${finalScore}%20times.%20Can%20you%20beat%20my%20record?%20https://sleepy.zenekezene.com`
}

function changeLinkedinShareLink () {
  const linkedinShareLink = findById('linkedin-share-link')
  linkedinShareLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=https://sleepy.zenekezene.com`
}

function changeMetaDescription (finalScore) {
  const metaDescription = findBySelector('meta[name="description"]')
  metaDescription.content = `I've woken Sleepy up ${finalScore} times. Can you beat my record?`

  const ogDescription = findBySelector('meta[property="og:description"]')
  ogDescription.content = `I've woken Sleepy up ${finalScore} times. Can you beat my record?`
}

function changeAllShareLinks (finalScore) {
  changeTwitterShareLink(finalScore)
  changeWhatsappShareLink(finalScore)
  changeLinkedinShareLink()
  // changeMetaDescription(finalScore)
}

export {
  changeAllShareLinks,
}
