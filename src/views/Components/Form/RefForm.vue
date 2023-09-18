<script setup lang="ts">
import { Form, FormExpose } from '@/components/Form'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { reactive, unref, ref } from 'vue'
import { ElButton } from 'element-plus'
import { useValidator } from '@/hooks/web/useValidator'
import { getDictOneApi } from '@/api/common'
import { FormSchema } from '@/types/form'
import { createChunk, fileInchunksForWorker } from './index'

const { required } = useValidator()

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: t('formDemo.input'),
    component: 'Input',
    formItemProps: {
      rules: [required()],
    },
  },
  {
    field: 'field2',
    label: t('formDemo.select'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          value: '1',
        },
        {
          label: 'option2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field3',
    label: t('formDemo.radio'),
    component: 'Radio',
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1',
        },
        {
          label: 'option-2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field4',
    label: t('formDemo.checkbox'),
    component: 'Checkbox',
    value: [],
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1',
        },
        {
          label: 'option-2',
          value: '2',
        },
        {
          label: 'option-3',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'field5',
    component: 'DatePicker',
    label: t('formDemo.datePicker'),
    componentProps: {
      type: 'date',
    },
  },
  {
    field: 'field6',
    component: 'TimeSelect',
    label: t('formDemo.timeSelect'),
  },
])

const formRef = ref<FormExpose>()

const changeLabelWidth = (width: number | string) => {
  unref(formRef)?.setProps({
    labelWidth: width,
  })
}

const changeSize = (size: string) => {
  unref(formRef)?.setProps({
    size,
  })
}

const changeDisabled = (bool: boolean) => {
  unref(formRef)?.setProps({
    disabled: bool,
  })
}

const changeSchema = (del: boolean) => {
  if (del) {
    unref(formRef)?.delSchema('field2')
  } else if (!del && schema[1].field !== 'field2') {
    unref(formRef)?.addSchema(
      {
        field: 'field2',
        label: t('formDemo.select'),
        component: 'Select',
        componentProps: {
          options: [
            {
              label: 'option1',
              value: '1',
            },
            {
              label: 'option2',
              value: '2',
            },
          ],
        },
      },
      1
    )
  }
}

const setValue = (reset: boolean) => {
  const elFormRef = unref(formRef)?.getElFormRef()
  if (reset) {
    elFormRef?.resetFields()
  } else {
    unref(formRef)?.setValues({
      field1: 'field1',
      field2: '2',
      field3: '2',
      field4: ['1', '3'],
      field5: '2022-01-27',
      field6: '17:00',
    })
  }
}

const index = ref(7)

const setLabel = () => {
  unref(formRef)?.setSchema([
    {
      field: 'field2',
      path: 'label',
      value: `${t('formDemo.select')} ${index.value}`,
    },
    {
      field: 'field2',
      path: 'componentProps.options',
      value: [
        {
          label: 'option-1',
          value: '1',
        },
        {
          label: 'option-2',
          value: '2',
        },
        {
          label: 'option-3',
          value: '3',
        },
      ],
    },
  ])
  index.value++
}

const addItem = () => {
  if (unref(index) % 2 === 0) {
    unref(formRef)?.addSchema({
      field: `field${unref(index)}`,
      label: `${t('formDemo.input')}${unref(index)}`,
      component: 'Input',
    })
  } else {
    unref(formRef)?.addSchema(
      {
        field: `field${unref(index)}`,
        label: `${t('formDemo.input')}${unref(index)}`,
        component: 'Input',
      },
      unref(index)
    )
  }
  index.value++
}

const formValidation = () => {
  const elFormRef = unref(formRef)?.getElFormRef()
  elFormRef?.validate()?.catch(() => {})
}

const verifyReset = () => {
  const elFormRef = unref(formRef)?.getElFormRef()
  elFormRef?.resetFields()
}

const getDictOne = async () => {
  const res = await getDictOneApi()
  if (res) {
    unref(formRef)?.setSchema([
      {
        field: 'field2',
        path: 'componentProps.options',
        value: res.data,
      },
    ])
  }
}

async function createChunkInWorker(file) {
  const CHUNK_SIZE = 1024 * 1024 * 5
  const THREAD_COUNT = 1
  let finishCount = 0
  let result = []

  return new Promise((resolve) => {
    // 一共分几片
    const totalChunkCount = Math.ceil(file.size / CHUNK_SIZE)
    // 每个worker要计算多少chunk
    const workerChunkCount = Math.ceil(totalChunkCount / THREAD_COUNT)
    for (let index = 0; index < THREAD_COUNT; index++) {
      const worker = new Worker('worker.js', {
        type: 'module',
      })
      // 109 -> 4 -> [0...28] [28...56] [56...84] [84...109]
      // 第几个线程 * 每个线程分到的数量
      const startIndex = index * workerChunkCount
      let endIndex = startIndex + workerChunkCount
      if (endIndex > totalChunkCount) {
        endIndex = totalChunkCount
      }
      console.log('worker---', worker)

      console.log({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex,
      })

      worker.postMessage({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex,
      })

      worker.onmessage = (e) => {
        // 线程顺序要注意，
        for (let i = startIndex; i < endIndex; i++) {
          result[i] = e.data[i - startIndex]
        }
        // 什么时候我这个分片全部结束了
        worker.terminate()
        finishCount++
        if (finishCount === THREAD_COUNT) {
          console.log('result---->', result)
          resolve(result)
        }
      }
      // 监听 Web Worker 错误事件
      worker.onerror = (error) => {
        console.error('Web Worker error:', error)
      }
    }
  })
}

async function handleChange(event) {
  const file = event.target.files[0]
  if (file) {
    console.time('createChunkInWorker')
    // const chunks = await createChunk(file)
    const chunks = await createChunkInWorker(file)

    console.timeEnd('createChunkInWorker')
    console.log(chunks)
  }
}
</script>

<template>
  <ContentWrap :title="`RefForm ${t('formDemo.operate')}`">
    <ElButton @click="changeLabelWidth(150)"
      >{{ t('formDemo.change') }} labelWidth</ElButton
    >
    <ElButton @click="changeLabelWidth('auto')"
      >{{ t('formDemo.restore') }} labelWidth</ElButton
    >

    <ElButton @click="changeSize('large')"
      >{{ t('formDemo.change') }} size</ElButton
    >
    <ElButton @click="changeSize('default')"
      >{{ t('formDemo.restore') }} size</ElButton
    >

    <ElButton @click="changeDisabled(true)">{{
      t('formDemo.disabled')
    }}</ElButton>
    <ElButton @click="changeDisabled(false)">{{
      t('formDemo.disablement')
    }}</ElButton>

    <ElButton @click="changeSchema(true)">
      {{ t('formDemo.delete') }} {{ t('formDemo.select') }}
    </ElButton>
    <ElButton @click="changeSchema(false)">
      {{ t('formDemo.add') }} {{ t('formDemo.select') }}
    </ElButton>

    <ElButton @click="setValue(false)">{{ t('formDemo.setValue') }}</ElButton>
    <ElButton @click="setValue(true)">{{ t('formDemo.resetValue') }}</ElButton>

    <ElButton @click="setLabel">
      {{ t('formDemo.set') }} {{ t('formDemo.select') }} label
    </ElButton>

    <ElButton @click="addItem">
      {{ t('formDemo.add') }} {{ t('formDemo.subitem') }}
    </ElButton>

    <ElButton @click="formValidation">
      {{ t('formDemo.formValidation') }}
    </ElButton>
    <ElButton @click="verifyReset"> {{ t('formDemo.verifyReset') }} </ElButton>

    <ElButton @click="getDictOne">
      {{ t('searchDemo.dynamicOptions') }}
    </ElButton>
  </ContentWrap>
  <ContentWrap :title="`RefForm ${t('formDemo.example')}`">
    <Form :schema="schema" ref="formRef" />
  </ContentWrap>

  <ContentWrap :title="`大文件上传分片worker`">
    <input type="file" @change="handleChange" />
  </ContentWrap>
</template>
