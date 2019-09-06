const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  language: state => state.app.language,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  ItCode: state => state.user.ItCode,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  menu: state => state.getMenu.menu,
  productGroup: state => state.user.productGroup,
  closeTab: state => state.app.closeTab,
  drawerOpened: state => state.app.drawerOpened,
  findUnread: state => state.user.findUnread
}

export default getters
