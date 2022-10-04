<template>
  <div>
    <app-menu :menu="menu"></app-menu>
  </div>
</template>

<script>
export default {
  name: 'AppAside',
  components: {
    AppMenu: () => import('../../components/Menu')
  },
  data() {
    return {
      menu: [
        {
          id: 1,
          name: 'it互联网',
          children: [
            {
              id: 2,
              name: '编辑语言',
              children: [
                {
                  id: 7,
                  name: 'java'
                },
                {
                  id: 8,
                  name: 'c#'
                }
              ]
            },
            {
              id: 3,
              name: '前端开发',
              children: [
                {
                  id: 9,
                  name: 'html',
                  children: [
                    {
                      id: 111111,
                      name: 'span'
                    },
                    {
                      id: 111112,
                      name: 'p'
                    }
                  ]
                },
                {
                  id: 10,
                  name: 'css',
                  children: [
                    {
                      id: 15,
                      name: 'flot'
                    },
                    {
                      id: 16,
                      name: 'position'
                    }
                  ]
                }
              ]
            },
            {
              id: 4,
              name: '后端开发'
            }
          ]
        },
        {
          id: 2,
          name: '设计创作'

        },
        {
          id: 3,
          name: '升学考验'
        },
        {
          id: 4,
          name: '职企考证'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
