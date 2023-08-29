import JSZip from 'jszip'
import FileSaver from 'file-saver'

function download(blob: BlobPart, filename: string) {
  let url = window.URL.createObjectURL(new Blob([blob]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', filename) // 文件名
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link) // 下载完成移除元素
  window.URL.revokeObjectURL(url) // 释放掉blob对象
}

/**
 * 下载压缩包
 * @param fileList 文件列表{name: xxx, downloadUrl: 'https://xxx'}
 * @param blogTitle 压缩包名称
 */
const downloadZip = (fileList: any, blogTitle: string, httpCallBack: Function) => {
  var zip = new JSZip()
  var promises = []
  let cache = {}
  for (let item of fileList) {
    if (item.downloadUrl) {
      // const url = new URL(item.downloadUrl); 需要对原始地址进行处理
      const promise = httpCallBack(item.downloadUrl).then((res: any) => {
        // 下载文件, 并存成ArrayBuffer对象(blob)
        zip.file(item.name, res, { binary: true }) // 逐个添加文件
        cache[item.name] = res
      })
      promises.push(promise)
    } else {
      alert(`附件${item.name}地址错误，下载失败`)
    }
  }
  Promise.all(promises)
    .then(() => {
      zip.generateAsync({ type: 'blob' }).then((content) => {
        // 生成二进制流
        FileSaver.saveAs(content, blogTitle) // 利用file-saver保存文件  blogTitle:自定义文件名
      })
    })
    .catch((res) => {
      alert('文件压缩失败')
    })
}

export { download, downloadZip }
