// components/Tabs/Tabs.js
/***
 * 组件通讯：
 * 1，在properties 中加入要传递的属性 例如 tabs:{type:Array,value:[]}
 *   page页面加入例如:<Tabs tabs="{{data}}" 
 * 2,绑定事件
 *    2-1 先在method 中加入组件的事件 tapEvent(e)
 *    2-2 然后在调用  this.triggerEvent("tabtap", index);
 *        格外注意的是 事件名叫tabtap 
 *    2-3 最后在page中加入 bindtabtap 这个是绑定名称
 *        例如:<Tabs bindtabtap="tabTap" 
 * 
 *    
 */
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabs: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        tapEvent(e) {
            const index = e.currentTarget.dataset.operation;
            this.triggerEvent("tabtap", index);
        }
    }
})