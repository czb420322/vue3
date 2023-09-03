import WatcherMap from "./WatcherMap";
import Watcher from "./Watcher"

const watcherMap = new WatcherMap()

export function useReactive(state) {
    return new Proxy(state, {
        get(target, key) {
            return Reflect.get(target, key, value)//target[key]
        },
        set(target, key, value) {
            watcherMap[key].update(target[key],value)
            return Reflect.set(target, key, value)//target[key]=value
        }
    })
}
export function useWatcher(collection,dep,callback){
    const watcher = new Watcher();
    watcher.set(collection,callback)
    watcherMap.set(dep,watcher)
}
/* 
*watcherMap{
    title:{
        collection:[h1,h2],
        cb:callback
    },
    content:{
        collection:[p,span],
        cb:callback
    }
}
*
*
*
*
*
*
*
*/