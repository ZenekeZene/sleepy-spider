import { findById, findBySelector } from 'sleepy-spider-lib'
import { shareLinks } from './share.links'

function changeTwitterShareLink (finalScore) {
  const twitterShareLink = findById('twitter-share-link')
  twitterShareLink.href = shareLinks.twitter(finalScore)
}

function changeWhatsappShareLink (finalScore) {
  const whatsappShareLink = findById('whatsapp-share-link')
  whatsappShareLink.href = shareLinks.whatsapp(finalScore)
}

function changeLinkedinShareLink () {
  const linkedinShareLink = findById('linkedin-share-link')
  linkedinShareLink.href = shareLinks.linkedin()
}

function changeMetaDescription (finalScore) {
  const metaDescription = findBySelector('meta[name="description"]')
  metaDescription.content = shareLinks.metaDescription(finalScore)

  const ogDescription = findBySelector('meta[property="og:description"]')
  ogDescription.content = shareLinks.metaDescription(finalScore)
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
