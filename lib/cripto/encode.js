import Buffer from 'buffer/'

const encode = (text) => new Buffer.Buffer(text).toString('base64')

const decode = (text) => new Buffer.Buffer(text, 'base64').toString('utf-8')

export {
  encode,
  decode
}
