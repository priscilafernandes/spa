import Vue from 'vue'
import spa from '@/components/spa'

describe('spa.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(spa)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
  })
})
