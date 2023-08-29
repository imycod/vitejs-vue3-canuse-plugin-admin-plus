import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { ElLoading } from 'element-plus'
import { config } from '@/config/axios/config'

function download(blob: BlobPart, filename: string) {
  const url = window.URL.createObjectURL(new Blob([blob]))
  const link = document.createElement('a')
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
const downloadZip = (
  fileList: any,
  prop = 'downloadUrl',
  blogTitle: String,
  httpCallBack: Function
) => {
  function getFileName(url, item) {
    // 从URL中提取文件扩展名
    const fileExtension = url.pathname.split('.').pop().toLowerCase()
    // 使用文件名 + 扩展名作为文件名
    switch (fileExtension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
        // 看item.name中是否有扩展名如果有，就不需要加上扩展名了，item.name就是 [{name:'xxx.pdf‘}]
        return item.name + '.' + fileExtension
        break
      default:
        return item.name
        break
    }
  }

  const zip = new JSZip()
  const promises = []
  const loadingInstance = ElLoading.service({
    text: '文件正在下载，请耐心等待',
    fullscreen: false
  })
  for (const item of fileList) {
    const rawUrl = item[prop]
    if (rawUrl) {
      const url = new URL(rawUrl)
      const path = config.brand + url.pathname + url.search

      const promise = httpCallBack(path).then((res: any) => {
        // 下载文件, 并存成ArrayBuffer对象(blob) 逐个添加文件
        const fileName = getFileName(url, item)
        zip.file(fileName, res.data, { binary: true })
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
        // 利用file-saver保存文件  blogTitle:自定义文件名
        FileSaver.saveAs(content, blogTitle)
      })
    })
    .catch((res) => {
      alert('文件压缩失败')
    })
    .finally(() => {
      loadingInstance.close()
    })
}

export { download, downloadZip }
