export const paramsTransform = list => {
  // const roomIds = list.reduce((pre, cur) => {
  //   if (!pre) return cur.roomId
  //   return pre + ',' + cur.roomId
  // }, '')

  // const senderIds = list.reduce((pre, cur) => {
  //   if (!pre) return cur.receiverId
  //   return pre + ',' + cur.receiverId
  // }, '')

  const _list = list.map(v => ({
    roomId: v.roomId,
    senderId: v.receiverId
  }))

  return {
    list: _list
    // roomIds,
    // senderIds
  }
}
