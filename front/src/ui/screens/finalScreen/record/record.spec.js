import { updateRecordMessages } from "./record"

const stubDocumentBody = () => {
  document.body.innerHTML =
    `<div>
      <span id="record-message"></span>
      <span class="record-counter"></span>
      <span class="record-counter"></span>
    </div>`;
}

const getById = (id) => document.getElementById(id)
const findAllByClassName = (selector) => document.getElementsByClassName(selector)

describe("updateRecordMessages", () => {

  it(`when updateRecordMessages is called,
    then it should show the record`, () => {
    stubDocumentBody()

    const lastScore = 20

    updateRecordMessages(lastScore)

    expect(getById('record-message').classList.contains('visible')).toBe(false)
    expect(findAllByClassName('record-counter')[0].textContent).toBe('20')
  })
})
