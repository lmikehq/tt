import apiService from "@/lib/extensions/hook/apiService";


async function getUser() {
  const user = await apiService('/user');

  return user;
}

export default getUser;

export class DashboardAccountService {
  static updateUser = async (payload: any) => {
    return apiService(`/user/update`, 'POST', {
      ...payload
    });
  };

  static updatePassword = async (payload: { currentPassword: string, newPassword: string; }) => {
    return apiService(`/auth/change-password`, 'POST', {
      ...payload
    });
  };
}

