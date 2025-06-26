/**
 * 배열을 원하는 크기로 나누는 함수
 */
export const chunkArray = (data = [], size = 1) => {
  const array = []

  for (let i = 0; i < data.length; i += size) {
    array.push(data.slice(i, i + size))
  }

  return array
}
