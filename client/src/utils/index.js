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
