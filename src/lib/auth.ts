import { useQuery } from "@tanstack/react-query"
import apiService from "./extensions/hook/apiService"
import { IUser } from "types"

export function useUser() {
  const getUser = async (): Promise<any> => {
    return await apiService('/user')
  }

  // GET AND CHECK IF THE USER IS LOGGED IN
  const { data, isLoading } = useQuery({
    queryKey: ['get-auth-user'],
    queryFn: getUser
  })

  const user: IUser = data

  return { isLoading, user }
}