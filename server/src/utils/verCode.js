const CODES = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

const getVerificationCode = () => {
  const time = Date.now()
  let code = ''
  for (let index = 0; index < 4; index++) {
    const random = Math.floor(Math.random() * CODES.length)
    code += CODES[random]
  }

  return {
    code,
    time
  }
}

module.exports = getVerificationCode
