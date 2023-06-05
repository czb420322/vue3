<template>
    <div class="map">
        <div class="map_left">
            <p @click="handleMark">添加跳动的点标记</p>
            <p @click="handleDrag">添加拖拽的点标记</p>
            <p @click="handleAggreNode">添加聚合点</p>

        </div>
        <div class="map_right">
            <input type="text" id="suggestId" name="address_detail" placeholder="如门牌号等" v-model="address_detail"
                class="input_style">
            <div id="map"></div>
            <div class="logo">
                <div> 经度:<span class="lngClass">{{ userlocation.lng }}</span></div>
                <div> 维度:<span class="latClass">{{ userlocation.lat }}</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { MP } from "./getAkmap";

export default {
    setup() {
        const state = reactive({
            count: 0,
            address_detail: null, //详细地址
            userlocation: { lng: null, lat: null }
        });
        const route = useRoute()
        const updateMap = {
            initMap() {
                //初始化地图
                // eslint-disable-next-line no-undef
                let map = new BMap.Map("map", { enableMapClick: false }); //最好是将map设置到vuex中保存起来
                // this.$store.dispatch('mapInit',map);//将map对象放到vuex
                //设置地图中心点和显示级别，坐标可以设置为每个城市点位
                // eslint-disable-next-line no-undef
                map.centerAndZoom(new BMap.Point(114.26101136, 30.6195223), 13);
                // 设置地图背景色为白色
                map.getContainer().style.background = "#fff";
                //设置滚轮
                // eslint-disable-next-line no-undef
                map.addControl(
                    new BMap.ScaleControl({
                        //地图比例尺控件
                        // eslint-disable-next-line no-undef
                        anchor: BMAP_ANCHOR_BOTTOM_LEFT,
                    })
                );
                //-------显示卫星地图----
                // eslint-disable-next-line no-undef
                map.addControl(
                    new BMap.MapTypeControl({
                        mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP],
                    })
                );
                map.enableScrollWheelZoom();
            },
        };
        const sm = {
            /* 添加跳动的点 */
            handleMark() {
                let map = new BMap.Map("map");
                map.centerAndZoom(new BMap.Point(114.26101136, 30.6195223), 15);
                map.enableScrollWheelZoom(true);
                let marker = new BMap.Marker(new BMap.Point(114.26101136, 30.6195223));
                map.addOverlay(marker)
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                map.addEventListener('onmousemove', (e) => {
                    setTimeout(() => {
                        state.userlocation.lat = e.point.lat.toFixed(3)
                        state.userlocation.lng = e.point.lng.toFixed(3)
                    }, 1000);
                    console.log(state.lat, state.lng, "first")
                })
            },
            /* 添加拖拽 */
            handleDrag(){
                let map= new BMap.Map('map');
                let point= new BMap.Point(114.225,30.602);
                map.centerAndZoom(point,13);
                map.enableScrollWheelZoom(true);
                let marker = new BMap.Marker(point)//创建marker点;
                map.addOverlay(marker)
                marker.enableDragging()//可拖拽的方法
                // marker.disableDragging()//不可拖拽的方法
            },
            /* 添加聚合点 */
            handleAggreNode(){
                let  map = new BMap.Map('map');
                let point = new BMap.Point(116.404, 39.915)
                map.centerAndZoom(point,5);
                map.enableScrollWheelZoom();
                let max= 10;
                let markers= [];
                let pt =null;
                for(let i =0;i<max;i++){
                    pt = new BMap.Point(Math.random()*40+85,Math.random()*30+21);
                    markers.push(new BMap.Marker(pt));
                    console.log(markers,'地图的聚合的点103****');
                }
                var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});
                map.addOverlay(markerClusterer)
            }
        }
        onMounted(() => {
            nextTick(() => {
                MP("WnRsQH38vo7AliTGD2ZwExyqTUYkw246").then((BMap) => {
                    var map = new BMap.Map("map"); // 创建Map实例
                    var point = new BMap.Point(114.314, 30.515); // 创建点坐标
                    map.centerAndZoom(point, 15);
                    // 设置地图背景色为白色
                    map.getContainer().style.background = "#fff";
                    //地图比例尺控件
                    // 添加比例尺控件
                    var scaleCtrl = new BMap.ScaleControl();
                    map.addControl(scaleCtrl);
                    //-------显示卫星地图----
                    map.addControl(
                        new BMap.MapTypeControl({
                            mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP],
                        })
                    );
                    // 创建城市选择控件
                    var cityControl = new BMap.CityListControl({
                        // 控件的停靠位置（可选，默认左上角）
                        anchor: BMAP_ANCHOR_TOP_LEFT,
                        // 控件基于停靠位置的偏移量（可选）
                        offset: new BMap.Size(10, 5)
                    });
                    map.addControl(cityControl);
                    //地图的层级图标
                    map.addControl(new BMap.NavigationControl({
                        anchor: BMAP_ANCHOR_TOP_RIGHT,
                        offset: new BMap.Size(10, 50)
                    }))
                    // 添加全景图层
                    // map.addTileLayer(new BMap.PanoramaCoverageLayer())
                    // 添加全景控件
                    // var stCtrl = new BMap.PanoramaControl();
                    // stCtrl.setOffset(new BMap.Size(0, 0));
                    // map.addControl(stCtrl)
                    //设置滚轮
                    map.enableScrollWheelZoom();
                    map.addEventListener('onmousemove', (e) => {
                        setTimeout(() => {
                            state.userlocation.lat = e.point.lat.toFixed(3)
                            state.userlocation.lng = e.point.lng.toFixed(3)
                        }, 1000);
                        console.log(state.lat, state.lng, "first")
                    })
                    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                        {
                            "input": "suggestId"
                            , "location": map
                        })
                    var myValue
                    ac.addEventListener("onconfirm", function (e) {
                        console.log(e, '90**')   //鼠标点击下拉列表后的事件
                        var _value = e.item.value;
                        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                        state.address_detail = myValue
                        setPlace();
                    });

                    const setPlace = () => {
                        map.clearOverlays();    //清除地图上所有覆盖物
                        function myFun() {
                            state.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                            map.centerAndZoom(state.userlocation, 18);
                            map.addOverlay(new BMap.Marker(state.userlocation));    //添加标注
                        }
                        var local = new BMap.LocalSearch(map, { //智能搜索
                            onSearchComplete: myFun
                        });
                        local.search(myValue);
                    }
                });
            });
            console.log(route.query.menuCode, '132***')
        });
        return {
            ...toRefs(state),
            ...updateMap,
            ...route,
            ...sm
        };
    },
};
</script>

<style lang="scss" scoped>
.map {
    display: flex;

    .map_left {
        width: 15%;
        height: 100%;
    }

    .map_right {
        width: 85%;
        height: 100%;

        #map {
            width: 100%;
            height: calc(100vh - 3.9rem);
        }

        .logo {
            position: absolute;
            bottom: 1%;
            width: 140px;
            font-size: 18px;
            font-weight: 700;

            .lngClass {
                display: inline-block;
                padding-left: 0;
            }

            .latClass {
                display: inline-block;
                padding-left: 10px;
            }
        }
    }

}

::v-deep {
    .BMap_cpyCtrl {
        display: none;
    }

    .anchorBL {
        display: none;
    }
}
</style>
