import login from './zh-CN/login';
import menu from './zh-CN/menu';
import component from './zh-CN/component';
import tableCommonLang from './zh-CN/tableCommonLang';


export const lang = {
  navBar: '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.home.introduce': '介绍',
  'app.forms.basic.title': '基础表单',
  'app.forms.basic.description':
    '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
  ...login,
  ...menu,
  ...component,
  ...tableCommonLang
};
