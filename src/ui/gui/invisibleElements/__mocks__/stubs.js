const stubDocument = () => {
  document.body.innerHTML = `
    <div id="loader">Loader</div>
    <div class="invisible">invisible</div>
    <div class="transparent">transparent</div>
  `
}

const stubDocumentWithoutLoader = () => {
  document.body.innerHTML = `
    <div class="invisible">invisible</div>
    <div class="invisible">invisible</div>
    <div class="transparent">transparent</div>
  `
}

const stubDocumentWithoutElements = () => {
  document.body.innerHTML = `
    <div id="loader">Loader</div>
  `
}

export {
  stubDocument as regular,
  stubDocumentWithoutLoader as withoutLoader,
  stubDocumentWithoutElements as withoutElements,
}
