import { IAsyncRouteState } from '@/store/modules/asyncRoute';
import { IUserState } from '@/store/modules/user';
import { ILockscreenState } from '@/store/modules/lockscreen';
import { ITabsViewState } from '@/store/modules/tabsView';

export interface IStore {
  asyncRoute: IAsyncRouteState;
  user: IUserState;
  lockscreen: ILockscreenState;
  tabsView: ITabsViewState;
  count: number;
}
