const title =  'Calculate the CSS specificity!'

const question = {
  title,
  value: '#my-id .classname > a { ... }',
  answer: '111',
  options: [
    { value: 11, label: '11' },
    { value: 111, label: '111' },
    { value: 1, label: '1' },
    { value: 100, label: '100' },
  ]
}

function createQuestion () {
  return question
}

export {
  createQuestion,
}
