
const { createApp, onMounted, reactive, nextTick, ref, watchEffect, h, render } = Vue

const state = reactive({
    // 加载状态
    loading: false,
    // 使用了 v-skeleton-item 指令的节点保存在这里
    list: [],
    stylus: {
        sk: null, // sk children
        parent: null,
        parentClass: '',
        childClass: '',
        children: null
    }
})

watchEffect(() => {
    // 创建 vnode
    const children = state.stylus.sk && state.stylus.sk.map((el) =>
        h('div', {
            style: {
                position: 'absolute',
                top: el.getBoundingClientRect().top + 'px',
                left: el.getBoundingClientRect().left + 'px',
                width: el.getBoundingClientRect().width + 'px',
                height: el.getBoundingClientRect().height + 'px',
                background: '#e5e5e5',
                borderRadius: getComputedStyle(el).borderRadius,
                animation: 'mu-skeleton-loading 1.4s ease infinite', // Animation
                background: `linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)`,
                backgroundSize: `400% 100%`
            },
        })
    );

    // 创建 div 容器
    const container = h('div', children)

    // 将 div容器 渲染到 body 中
    render(state.loading ? container : null, document.body)
})

const Skeleton = {
    async mounted(el, binding) {
        const { count } = binding.value

        const wrapper = document.createElement('div');
        wrapper.className = state.stylus.parentClass + ' ' + '__sk'
        for (let i = 0; i < count; i++) {
            const div = document.createElement('div');
            div.className = state.stylus.childClass;
            div.style = state.stylus.children;
            wrapper.appendChild(div);
        }
        el.appendChild(wrapper);
        state.stylus.sk = [...wrapper.children]
        console.log(state.stylus.sk);
        state.loading = binding.value.loading
    },
    updated(el, binding) {
        debugger
        state.loading = binding.value.loading

        if (!state.loading) {
            const sk = document.querySelector('.__sk')
            console.log(sk);
            sk.parentNode && sk.parentNode.removeChild(sk)
            state.stylus.sk = null
        }
    },
    unmounted(el, binding) {

        state.loading = false
    }
}

const SkeletonItem = {
    mounted(el, binding) {
        // 保存 el
        state.list.push(el)
    },
    unmounted(el) {
        // 删除 el
        const i = state.list.indexOf(el)
        if (i == -1) return
        state.list.splice(i, 1)
    }
}
const SkeletonStyle = {
    mounted(el, binding) {
        // 获取el样式，class等，并保存
        const elStyle = getComputedStyle(el);
        const elClass = el.className;

        const copyElStyle = JSON.parse(JSON.stringify(elStyle))

        state.stylus.parent = copyElStyle;
        // state.stylus.parent.visibility = '';
        // state.stylus.parent.zIndex = '';
        // state.stylus.parent.position = '';
        state.stylus.parentClass = elClass;

        el.style.visibility = 'hidden';
        el.style.zIndex = '-100000';
        el.style.position = 'absolute'
    },
}
const SkeletonItemStyle = {
    mounted(el, binding) {
        // 获取el样式，class等，并保存
        const elStyle = getComputedStyle(el);
        const elClass = el.className;

        const copyElStyle = JSON.parse(JSON.stringify(elStyle))
        state.stylus.children = copyElStyle;
        // state.stylus.children.visibility = '';
        // state.stylus.children.zIndex = '';
        // state.stylus.children.position = '';
        state.stylus.childClass = elClass;

        el.style.visibility = 'hidden';
        el.style.zIndex = '-100000';
        el.style.position = 'absolute'
    },
}