import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'
import { axios } from '@/utils/request'
import { getRouterByUser } from "@/config/router.config";
import Vue from "vue";
import { refreshMenu, setFavoriteMenu } from "@api/menuComponent_api";

const { Item, SubMenu } = Menu

export default {
  name: 'SMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: [],
      iconClicked: false,
      favoriteMenu: []
    }
  },
  computed: {
    rootSubmenuKeys: vm => {
      const keys = []
      vm.menu.forEach(item => { keys.push(item.path + item.meta.id) })
      return keys
    },
  },
  created() {
    this.updateMenu()
    this.getFavoriteMenu();
  },
  watch: {
    menu(val) {
      this.getFavoriteMenu();
    },
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    $route: function () {
      this.updateMenu()
    }
  },
  methods: {
    getFavoriteMenu() {
      this.favoriteMenu.splice(0);
      this.menu.forEach(item => {
        if (item.meta.title == 'My Favorites') {
          for (let i = 0; i < item.children.length; i++) {
            this.favoriteMenu.push(item.children[i].path)
          }
        }
      })
    },
    iconOnClick(e) {
      this.iconClicked = true;
    },
    async subMenuOnClick(subMenu) {
      console.log('click subMenu', subMenu);
      const itemMenuPath = subMenu.key.split('list')[0] + 'list'
      if (this.iconClicked) {
        this.iconClicked = false;
        let favoriteMenuParams = { frontRouter: itemMenuPath };
        if (this.favoriteMenu.includes(itemMenuPath)) {
          //delete from favorite
          console.log('delete from favorite');
          favoriteMenuParams.isDeleted = 1;
        }
        const FavoriteMenuRes = await setFavoriteMenu(favoriteMenuParams)
        const refreshMenuRes = await refreshMenu({ "pcgcfe-java-token": Vue.ls.get('ACCESS_TOKEN') });
        this.$store.dispatch("SaveMenu", refreshMenuRes.result);
        if (FavoriteMenuRes.code == 0) {
          this.$message.success(this.$t("Change favorite menu successfully!"), 6);
        } else {
          this.$notification.open({
            message: "Error",
            description: res.msg,
            duration: 6,
            style: { 'background': '#F5222D' }
          });
        }
      } else {
        // 记录accesslog
        axios({
          url: 'common/accessLog',
          method: 'get',
          params: { frontRouter: itemMenuPath }
        }).then(res => {
          //console.log(res);
        }).catch(err => {
          //console.log(err);
        })
      }
    },
    // select menu item
    onOpenChange(openKeys) {
      // 在水平模式下时执行，并且不再执行后续
      if (this.mode === 'horizontal') {
        this.openKeys = openKeys
        return
      }
      // 非水平模式时
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    getMetaId(path, children) {
      let metaId = '';

      this.menu.forEach(item => {
        if (!children) {
          if (path == item.path) {
            metaId = item.meta.id
          }
        } else {
          item.children.forEach(el => {
            if (path == el.path) {
              if (children) {
                metaId = el.meta.id
              }
            }
          })
        }
      })
      return metaId
    },
    updateMenu() {
      const routes = this.$route.matched.concat()
      if (routes.length >= 4 && this.$route.meta.hidden) {
        routes.pop()
        this.selectedKeys = [routes[2].path + this.getMetaId(routes[2].path, true)]
      } else {
        const pt = routes[routes.length - 1].path;
        this.selectedKeys = [routes.pop().path + this.getMetaId(pt, true)]
      }
      const openKeys = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          if (item.path !== '') {
            openKeys.push(item.path + this.getMetaId(item.path, false))
          } else {
            openKeys.push(item.path)
          }
        })
        let favoriteMenuKey = '';
        this.$router.options.routes.forEach(item => {
          if (item.name == 'index') {
            item.children.forEach(element => {
              if (element.name == 'MyFavorites') {
                favoriteMenuKey = '/' + element.meta.id + element.meta.id;
              }
            })
          }
        })
        if (this.favoriteMenu.includes(this.$route.fullPath) && !openKeys.includes(favoriteMenuKey)) {
          openKeys[1] = favoriteMenuKey;
        } else if (openKeys.includes(favoriteMenuKey) && !this.favoriteMenu.includes(this.$route.fullPath)) {
          this.$router.options.routes.forEach(item => {
            if (item.name == 'index') {
              item.children.forEach(element => {
                element.children.forEach(el => {
                  if (el.path == this.$route.fullPath) {
                    openKeys[1] = '/' + element.meta.id + element.meta.id
                  }
                })
              })
            }
          })
        }
      }
      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    },

    // render
    renderItem(menu) {
      if (!menu.hidden) {
        return menu.children && !menu.hideChildrenInMenu ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
      }
      return null
    },
    renderMenuItem(menu) {
      const target = menu.meta.target || null
      const tag = target && 'a' || 'router-link'
      const props = { to: { name: menu.name } }
      const attrs = { href: menu.path, target: menu.meta.target }
      return (
        <Item {...{ key: menu.path + menu.meta.id }}>
          <div class="item">
            {this.renderFavoriteIcon(this.favoriteMenu.includes(menu.path))}
            <tag {...{ props, attrs }}>
              {this.renderIcon(menu.meta.icon)}
              <span>{menu.meta.title}</span>
            </tag>
          </div>
        </Item>
      )
    },
    renderFavoriteIcon(included) {
      const iconTheme = included ? 'filled' : 'outlined';
      return (
        <span class="star-icon">
          <a-icon type="star" theme={iconTheme} nativeOnClick={this.iconOnClick} />
        </span>
      )
    },
    renderSubMenu(menu) {
      const itemArr = []
      if (!menu.hideChildrenInMenu) {
        menu.children.forEach(item => itemArr.push(this.renderItem(item)))
      }
      const on = {
        click: this.subMenuOnClick,
      }
      return (
        <SubMenu {...{
          key: menu.path + menu.meta.id, on
        }
        } >
          <span slot="title">
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </span>
          {itemArr}
        </SubMenu >
      )
    },
    renderIcon(icon) {
      if (icon === 'none' || icon === undefined) {
        return null
      }
      const props = {}
      typeof (icon) === 'object' ? props.component = icon : props.type = icon
      return (
        <Icon {... { props }} />
      )
    }
  },
  render() {
    const { mode, theme, menu } = this
    const props = {
      mode: mode,
      theme: theme,
      openKeys: this.openKeys
    }
    const on = {
      select: obj => {
        this.selectedKeys = obj.selectedKeys
        this.$emit('select', obj)
      },
      openChange: this.onOpenChange
    }

    const menuTree = menu.map(item => {
      if (item.hidden) {
        return null
      }
      return this.renderItem(item)
    })
    // {...{ props, on: on }}
    return (
      <Menu vModel={this.selectedKeys} {...{ props, on: on }}>
        {menuTree}
      </Menu>
    )
  }
}
