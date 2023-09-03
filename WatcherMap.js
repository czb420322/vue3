export default function WatcherMap(){
    WatcherMap.prototype.set = function(dep,watcher){
        this[dep]=watcher
    }

}

export default class WatcherMap{
    set(dep,watcher){
        this[dep]= watcher;
    }
}

