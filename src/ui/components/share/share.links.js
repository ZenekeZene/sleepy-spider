const shareLinks = {
  twitter: (finalScore) => `https://twitter.com/intent/tweet?text=I've%20woken%20Sleepy%20up%20${finalScore}%20times.%20Can%20you%20beat%20my%20record?%20https://sleepy.zenekezene.com`,
  whatsapp: (finalScore) => `https://wa.me/?text=I've%20woken%20Sleepy%20up%20${finalScore}%20times.%20Can%20you%20beat%20my%20record?%20https://sleepy.zenekezene.com`,
  linkedin: () => `https://www.linkedin.com/sharing/share-offsite/?url=https://sleepy.zenekezene.com`,
  metaDescription: (finalScore) => `I've woken Sleepy up ${finalScore} times. Can you beat my record?`,
}

export {
  shareLinks,
}
