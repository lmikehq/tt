import apiService from "@/lib/extensions/hook/apiService";


async function getUser() {
  const user = await apiService('/user');

  return user;
}

export default getUser;