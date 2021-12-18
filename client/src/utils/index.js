export const setLocal = (key, value = '') => {
  if (!key) return
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocal = key => {
  if (!key) return
  try {
    const v = JSON.parse(localStorage.getItem(key))
    return v
  } catch (error) {}
}

export const sort = (a, b) => {
  return a > b ? `${a}-${b}` : `${b}-${a}`
}

export const toBase64 = file => {
  return new Promise(reslove => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      reslove(reader.result)
    }
  })
}
