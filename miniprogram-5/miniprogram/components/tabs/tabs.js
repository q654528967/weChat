Component({
  data: {},
  properties: {
    tabs:{
      type: Array,
      value:[]
    }
  },
  methods: {
    handleItemTap(e){
      const {index}=e.currentTarget.dataset
      this.triggerEvent('tabsItemChange', {index})
    }
  }
})