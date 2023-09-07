/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-09-05 00:20:57
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-05 10:23:55
 * @FilePath: \pms-pcd:\studio\vue-project\vue3-plugin-effect-vite-admin-element-plus\src\views\Components\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { toCreateChunk } from './toCreateChunk'
export async function createChunk(file, config = {}) {
  let CHUNK_SIZE = config.chunkSize || 1024 * 1024 * 5

  let chunks = []
  if (config.thread) {
    chunks = await fileInchunksForWorker(file, { ...config, CHUNK_SIZE })
  } else {
    chunks = await fileInchunks(file, CHUNK_SIZE)
  }

  console.log(chunks)
  return chunks
}

async function fileInchunks(file, chunkSize) {
  const result = []
  // 一共分几片
  const totalChunkCount = Math.ceil(file.size / chunkSize)
  for (let index = 0; index < totalChunkCount; index++) {
    const chunk = await toCreateChunk(file, index, chunkSize)
    result.push(chunk)
  }
  return result
}

export function fileInchunksForWorker(file, config) {
  const { CHUNK_SIZE: chunkSize, threadCount, workFileName } = config

  let THREAD_COUNT = threadCount || navigator.hardwareConcurrency || 4
  let WORk_FILE_NAME = workFileName || './worker.js'
  let finishCount = 0

  new Promise((resolve) => {
    const result = []
    // 一共分几片
    const totalChunkCount = Math.ceil(file.size / chunkSize)
    // 每个worker要计算多少chunk
    const workerChunkCount = Math.ceil(totalChunkCount / THREAD_COUNT)
    for (let index = 0; index < THREAD_COUNT; index++) {
      const worker = new Worker(WORk_FILE_NAME, {
        type: 'module'
      })
      // 109 -> 4 -> [0...28] [28...56] [56...84] [84...109]
      // 第几个线程 * 每个线程分到的数量
      const startIndex = index * workerChunkCount
      let endIndex = startIndex + workerChunkCount
      if (endIndex > totalChunkCount) {
        endIndex = totalChunkCount
      }

      worker.postMessage({
        file,
        chunkSize,
        startIndex,
        endIndex
      })
      worker.onmessage = (e) => {
        // 线程顺序要注意，
        for (let index = startIndex; index < endIndex; index++) {
          result[index] = e.data[index - startIndex]
        }
        // 什么时候我这个分片全部结束了
        worker.terminate()
        finishCount++
        if (finishCount === THREAD_COUNT) {
          console.log('result---->', result)
          resolve(result)
        }
      }
    }
  })
}
