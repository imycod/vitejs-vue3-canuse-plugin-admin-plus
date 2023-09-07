import SparkMD5 from 'spark-md5'
export function toCreateChunk(file, index, CHUNK_SIZE) {
  return new Promise((resolve) => {
    const start = index * CHUNK_SIZE
    const end = start + CHUNK_SIZE

    const spark = new SparkMD5.ArrayBuffer()
    const reader = new FileReader()
    reader.onload = (event) => {
      spark.append(event.target.result)
      resolve({
        start,
        end,
        index,
        hash: spark.end()
      })
    }
    reader.readAsArrayBuffer(file.slice(start, end))
  })
}
