import request from 'umi-request';
import { get, post } from '../../../utils/axiosrequest';

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}
export async function sysMenuSetting(menuType: string) {
  return get(`/platform-xiaosk/sys/menu/setting/${menuType}`);
}