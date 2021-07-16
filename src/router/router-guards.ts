import { toRefs } from 'vue'
import { isNavigationFailure, Router } from 'vue-router'
import { useUserStoreWidthOut } from '@/store/modules/user'
import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
import NProgress from 'nprogress' // progress bar
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { debounce } from '@/utils/lodashChunk'
import { PageEnum } from '@/enums/pageEnum'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const LOGIN_PATH = PageEnum.BASE_LOGIN

const whitePathList = [LOGIN_PATH] // no redirect whitelist

// 是否需要从后端获取菜单
const isGetMenus = debounce(
    ({ to, from, next, hasRoute, router }) => {
        const userStore = useUserStoreWidthOut();
        const asyncRouteStore = useAsyncRouteStoreWidthOut();
        userStore.GetInfo().then(res => {
            asyncRouteStore.generateRoutes(res).then(() => {
                // 根据roles权限生成可访问的路由表
                // 动态添加可访问路由表
                asyncRouteStore.getRouters().forEach((item) => {
                    router.addRoute(item)
                });
                // if (whitePathList.includes(to.name as string)) return
                if (!hasRoute) {
                    // 请求带有 redirect 重定向时，登录自动重定向到该地址
                    const redirect = decodeURIComponent((from.query.redirect || '') as string)
                    if (to.path === redirect) {
                        next({ ...to, replace: true })
                    } else {
                        // 跳转到目的路由
                        next({ ...to, replace: true })
                    }
                } else {
                    next()
                }
            }).catch(() => next({ path: defaultRoutePath }))
        })
    },
    1800,
    { leading: true }
)


export function createRouterGuards(router: Router) {
    const userStore = useUserStoreWidthOut();
    const asyncRouteStore = useAsyncRouteStoreWidthOut();
    router.beforeEach(async (to, from, next) => {
        NProgress.start()
        if (from.path === LOGIN_PATH && to.name === 'errorPage') {
            next(PageEnum.BASE_HOME);
            return;
        }

        // Whitelist can be directly entered
        if (whitePathList.includes(to.path as PageEnum)) {
            next();
            return;
        }

        const token = storage.get(ACCESS_TOKEN)
        const roles = storage.get('roles')

        if (!token) {

            // You can access without permission. You need to set the routing meta.ignoreAuth to true
            if (to.meta.ignoreAuth) {
                next();
                return;
            }
            // redirect login page
            const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
                path: LOGIN_PATH,
                replace: true,
            };
            if (to.path) {
                redirectData.query = {
                    ...redirectData.query,
                    redirect: to.path,
                };
            }
            next(redirectData);
            return;
        }

        if (asyncRouteStore.getIsDynamicAddedRoute) {
            next();
            return;
        }

        const userInfo = await userStore.GetInfo()

        const routes = await asyncRouteStore.generateRoutes(userInfo)

        // 动态添加可访问路由表
        routes.forEach((item) => {
            router.addRoute(item)
        });

        const redirectPath = (from.query.redirect || to.path) as string;
        const redirect = decodeURIComponent(redirectPath);
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
        asyncRouteStore.setDynamicAddedRoute(true);
        next(nextData);
        NProgress.done()
    })

    router.afterEach((to, from, failure) => {
        document.title = (to?.meta?.title as string) || document.title
        if (isNavigationFailure(failure)) {
            //console.log('failed navigation', failure)
        }
        const asyncRouteStore = useAsyncRouteStoreWidthOut();
        // 在这里设置需要缓存的组件名称
        const keepAliveComponents = asyncRouteStore.keepAliveComponents
        const currentComName: any = to.matched.find((item) => item.name == to.name)?.name
        if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
            // 需要缓存的组件
            keepAliveComponents.push(currentComName)
        } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
            // 不需要缓存的组件
            const index = asyncRouteStore.keepAliveComponents.findIndex(
                (name) => name == currentComName
            )
            if (index != -1) {
                keepAliveComponents.splice(index, 1)
            }
        }
        asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
        NProgress.done() // finish progress bar
    })

    router.onError((error) => {
        console.log(error, '路由错误')
    })
}
