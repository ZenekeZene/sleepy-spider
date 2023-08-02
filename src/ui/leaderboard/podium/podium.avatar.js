import { createElement, createImage } from "sleepy-spider-lib"

function createAvatar (photoURL, name, classname, listItem) {
  const avatar = createElement({
    tag: 'section',
    classNames: `${classname}__avatar`,
    target: listItem,
  })
  const image = createImage({
    src: photoURL,
    alt: name,
    classNames: `${classname}__image`,
    target: avatar,
  })
  image.onerror = () => {
    const letter = name.charAt(0)
    createElement({
      tag: 'span',
      classNames: `${classname}__image-fallback`,
      target: avatar,
      text: letter
    })
  }
}

export { createAvatar }
