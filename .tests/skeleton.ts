/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-04 16:27:53
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-08-10 21:00:51
 * @FilePath: /vue3.0-ts/src/directives/modules/skeleton.ts
 * @Description: 骨架屏指令
 */
import { reactive, watchEffect, h, render, ref, type Ref, VNode, RendererNode, RendererElement, nextTick } from 'vue';

interface loadingType {
    loading: boolean;
}
interface itemType extends loadingType {
    list: typeof list;
}
interface styleType {
    width: number;
    height: number;
    line?: number;
    [key: string]: any;
}
interface bindingType {
    value: styleType;
}

interface typeIdType {
    [key: string]: itemType;
}
const stateObj: Ref<typeIdType> = ref({});

function getPx(item: listType, type: 'width' | 'height') {
    if (item.style && item.style[type]) {
        return item.style[type] + 'px';
    }
    return item.el.getBoundingClientRect()[type] + 'px';
}

// 设置当前el的伪元素样式
function skeletonStyle(type: string, item: listType) {
    item.el.style.position = 'relative';

    let deepSelector = '';
    const cssBegin = `[${id}='${type}']::after${deepSelector} {`;
    const tagName = item.el.tagName;
    let base = '';
    if (tagName === 'IMG') {
        // 图片
        base = `
            content: '';
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            display: inline-block !important;
            vertical-align: top !important;
            width: ${getPx(item, 'width')} !important;
            height: ${getPx(item, 'height')} !important;
            background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
            animation:  @keyframes mu-skeleton-loading {
              0% {
              background-position: 100% 50%;
              }
          
              to {
              background-position: 0 50%;
              }
          } 1.4s ease infinite;
            background-size: 400% 100% !important;
        `;
    } else {
        // 非图片
        //     width: 100% !important;
        base = `
          content: '';
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          display: inline-block !important;
          vertical-align: top !important;
      
          width: ${getPx(item, 'width')} !important;
          height: ${getPx(item, 'height')} !important;
          white-space: pre !important;
          
          background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
          animation:  @keyframes mu-skeleton-loading {
            0% {
            background-position: 100% 50%;
            }
        
            to {
            background-position: 0 50%;
            }
        } 1.4s ease infinite;
          background-size: 400% 100% !important;
          `;
        // const background = 'background:' + lineImages.join(', ') + '!important;'
    }
    const cssEnd = '}';
    return `${cssBegin}${base}${cssEnd}`;
}

// 添加伪元素样式
function addHeadStyle(style: string, type: string) {
    let styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    // 添加标识，用于删除
    styleEl.setAttribute('data-id', type);
    styleEl.appendChild(document.createTextNode(style));
    document.head.appendChild(styleEl!);
}
function removeHeadStyle(type: string) {
    const styleEl = document.head.querySelector(`style[data-id=${type}]`);
    if (styleEl) {
        document.head.removeChild(styleEl);
    }
}
const id = '__skeleton-id'; // 给dom添加属性的key

/**
 *
 * @param vnode 当前的vnode
 * @returns 用于删除dom和更改loading状态
 */
const getType = (vnode: vnodeType) => {
    const classList = vnode.el.className.split(' '); // 获取当前el的class
    const type = classList.find((item) => item.includes(id)); // 获取当前el的type
    return type;
};

/**
 *
 * @param loading 加载状态
 * @param type 类型id
 */
const removeDom = (loading: boolean, type: string) => {
    if (!loading) {
        // loading为false时，删除伪元素
        const item = stateObj.value[type];
        if (item) {
            item.list.forEach((it) => {
                it.el.removeAttribute(id);
            });
        }
    }
};

const removeOneDom = (el: HTMLElement) => {
    el.removeAttribute(id);
};

let index = 0;
let indexItem = 0;
interface listType {
    el: HTMLElement;
    style: styleType;
}
let list: listType[] = [];
interface vnodeType {
    el: HTMLElement;
}
/**
 * @description: 骨架屏指令，用于显示隐藏骨架屏，只需要在需要骨架屏的元素上添加 v-skeleton 指令即可，例如：v-skeleton="loading"
 * @param {HTMLElement} el 当前元素
 * @param {boolean} binding.value 骨架屏的显示隐藏，true为显示，false为隐藏
 * @param {vnodeType} vnode 当前元素的虚拟dom
 */
const Skeleton = {
    mounted(el: HTMLElement, binding: { value: boolean }, vnode: vnodeType) {
        nextTick(() => {
            index += 1;
            const type = `${id}${index}`; // 区分不同的el，用于删除dom和更改loading状态
            vnode.el.classList.add(type); // 给el添加class, 在updated中更改loading状态
            const listArr: typeof list = []; // 用于存放不包含el的list
            const newList: typeof list = []; // 用于存放包含el的list
            let style = ''; // 用于存放style标签
            list.forEach((item) => {
                // 判断当前el的子孙节点是否包含item
                if (el.contains(item.el)) {
                    indexItem += 1;
                    const typeItem = `${id}${indexItem}`;
                    // 给el增加自定义属性，用于删除dom的伪元素
                    item.el.setAttribute(id, typeItem);
                    // 给el增加伪元素after，展示骨架屏
                    style += skeletonStyle(typeItem, item);
                    // 包含
                    newList.push(item);
                } else {
                    // 不包含
                    listArr.push(item);
                }
            });
            // 将样式代码添加至head中
            addHeadStyle(style, type);
            stateObj.value[type] = reactive({
                loading: binding.value, // loading状态
                type, // 用于删除骨架屏dom
                list: newList, // 存放包含el的list
            });
            list = listArr; // 将不包含el的list赋值给list，用于下次 v-skeleton 指令的判断
        });
    },
    updated(el: HTMLElement, binding: { value: boolean }, vnode: vnodeType) {
        const type = getType(vnode); // 获取当前el的type
        if (type) {
            stateObj.value[type].loading = binding.value; // 更新loading状态
            removeDom(binding.value, type); // 删除dom
            removeHeadStyle(type); // 删除style标签
        }
    },
    unmounted(el: HTMLElement, binding: { value: boolean }, vnode: vnodeType) {
        const type = getType(vnode); // 获取当前el的type
        if (type) {
            // stateObj.value[type].loading = false; // 更新loading状态
            // 删除 属性
            delete stateObj.value[type];
            index = 0; // 重置index
            removeDom(binding.value, type); // 删除dom
        }
    },
};

/**
 * @description: 骨架屏指令，哪个元素需要骨架屏，就在哪个元素上添加该指令
 * @param {HTMLElement} el 当前元素
 * @param {vnodeType} vnode 当前元素的虚拟dom
 */
const SkeletonItem = {
    mounted(el: HTMLElement, binding: bindingType, vnode: vnodeType) {
        // 将el存入list
        list.push({
            el,
            style: binding.value,
        });
    },
    unmounted(el: HTMLElement, binding: any, vnode: vnodeType) {
        // 删除 after伪元素
        removeOneDom(el);
    },
};

export { Skeleton, SkeletonItem };
