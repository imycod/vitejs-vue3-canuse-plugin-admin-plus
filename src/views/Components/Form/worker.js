/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-09-05 00:20:57
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-05 10:53:23
 * @FilePath: \pms-pcd:\studio\vue-project\vue3-plugin-effect-vite-admin-element-plus\src\views\Components\worker.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { toCreateChunk } from './toCreateChunk.js'

onmessage = async (e) => {
  const { file, CHUNK_SIZE, startIndex, endIndex } = e.data
  console.log(e.data)
  // 并行计算
  let promise = []
  for (let index = startIndex; index < endIndex; index++) {
    promise.push(toCreateChunk(file, index, CHUNK_SIZE))
  }
  const chunks = await Promise.all(promise)
  postMessage(chunks)
}
