import { handlePersonalLocalRecord } from "./record"

const stubDocumentBody = () => {
  document.body.innerHTML =
    '<div>' +
    '  <span id="record-message-value"></span>' +
    '  <span id="record-message"></span>' +
    '</div>';
}

const getById = (id) => document.getElementById(id)

describe("handlePersonalLocalRecord", () => {
  afterEach(() => {
    localStorage.clear()
  })

  it(`given a final score not greater than personal record,
    when handlePersonalLocalRecord is called,
    then it should not update the record`, () => {
    localStorage.setItem('record', 20)
    const finalScore = 10

    handlePersonalLocalRecord(finalScore)

    expect(localStorage.getItem('record')).toBe(20)
  })

  it(`given a final score greater than personal record,
    when handlePersonalLocalRecord is called,
    then it should update the record`, () => {
    localStorage.setItem('record', 10)
    const finalScore = 20

    handlePersonalLocalRecord(finalScore)

    expect(localStorage.getItem('record')).toBe('20')
  })

  it(`given a final score greater than personal record,
    when handlePersonalLocalRecord is called,
    then it should show the record`, () => {
    stubDocumentBody()

    localStorage.setItem('record', 10)
    const finalScore = 20

    handlePersonalLocalRecord(finalScore)

    expect(getById('record-message').classList.contains('visible')).toBe(true)
    expect(getById('record-message-value').textContent).toBe('20')
  })

  it(`given a final score not greater than personal record,
    when handlePersonalLocalRecord is called,
    then it should not show the record`, () => {
    stubDocumentBody()

    localStorage.setItem('record', 20)
    const finalScore = 10

    handlePersonalLocalRecord(finalScore)

    expect(getById('record-message').classList.contains('visible')).toBe(true)
    expect(getById('record-message-value').textContent).toBe('20')
  })
})
