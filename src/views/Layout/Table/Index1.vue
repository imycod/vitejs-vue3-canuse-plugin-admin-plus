<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-08-10 12:57:27
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-07 16:21:52
 * @FilePath: \ehr-console-pcd:\studio\vue-project\vue3-plugin-effect-vite-admin-element-plus\src\views\Directive\Disabled.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { TableData } from '@/api/table/types'
import { useTable } from '@/hooks/web/useTable'
import { useI18n } from '@/hooks/web/useI18n'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { TableColumn } from '@/types/table'
import { ElTag } from 'element-plus'
const { push } = useRouter()

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi,
  delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList, setSearchParams } = methods

getList()

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('tableDemo.index'),
    type: 'index'
  },
  {
    field: 'title',
    label: t('tableDemo.title'),
    search: {
      show: true
    }
  },
  {
    field: 'author',
    label: t('tableDemo.author')
  },
  {
    field: 'display_time',
    label: t('tableDemo.displayTime')
  },
  {
    field: 'importance',
    label: t('tableDemo.importance'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () =>
          cellValue === 1
            ? t('tableDemo.important')
            : cellValue === 2
            ? t('tableDemo.good')
            : t('tableDemo.commonly')
      )
    }
  },
  {
    field: 'pageviews',
    label: t('tableDemo.pageviews')
  },
  {
    field: 'content',
    label: t('exampleDemo.content'),
    table: {
      show: false
    }
  },
  {
    field: 'action',
    width: '260px',
    label: t('tableDemo.action')
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const AddAction = () => {
  push('/example/example-add')
}

const action = (row: TableData, type: string) => {
  push(`/directive/disabled/detail/${type}?id=${row.id}`)
}

const delLoading = ref(false)

const delData = async (row: TableData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  await delList(
    multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as string],
    multiple
  ).finally(() => {
    delLoading.value = false
  })
}

onMounted(() => {
  const tbody = document.querySelector('tbody')
})
</script>

<template>
  <div class="layout-container layout-theme-view layout-flex-full-view layout-padding-auto">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
        {{ t('exampleDemo.del') }}
      </ElButton>
    </div>
    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" @click="action(row, 'edit')">
          {{ t('exampleDemo.edit') }}
        </ElButton>
        <ElButton type="success" @click="action(row, 'detail')">
          {{ t('exampleDemo.detail') }}
        </ElButton>
        <ElButton type="danger" @click="delData(row, false)">
          {{ t('exampleDemo.del') }}
        </ElButton>
      </template>
    </Table>
  </div>
</template>
