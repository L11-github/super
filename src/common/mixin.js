import { debounce } from './utils'
import BackTop from '../components/content/backTop/BackTop.vue'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null

        }
    },
    mounted() {
        // 1.图片加载完成的事件监听
        this.refresh = debounce(this.$refs.scroll.refresh, 500);
        // 监听item中的图片加载完成
        this.itemImgListener = () => {
            this.refresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImgListener);
    },
}
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,

        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
    },
}