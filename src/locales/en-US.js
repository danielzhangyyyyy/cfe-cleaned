import analysis from './en-US/analysis';
import login from './en-US/login';
import menu from './en-US/menu';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import component from './en-US/component';
import tableCommonLang from './en-US/tableCommonLang';

export const lang = {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.home.introduce': 'introduce',
  'app.forms.basic.title': 'Basic form',
  'app.forms.basic.description':
    'Form pages are used to collect or verify information to users, and basic forms are common in scenarios where there are fewer data items.',
  ...login,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...component,
  ...tableCommonLang
};
