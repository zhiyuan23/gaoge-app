import { storage } from '@/utils'

export interface UserProfile {
  _id?: string;
  openid: string;
  nickname: string;
  avatar: string;
  createdAt?: number;
  updatedAt?: number;
}

const PROFILE_STORAGE_KEY = 'gaoge_user_profile'

let userObject: any

const getUserObject = () => {
  if (!userObject)
    userObject = uniCloud.importObject('user')

  return userObject
}

export const getCachedProfile = () => {
  return storage.getJSON(PROFILE_STORAGE_KEY) as UserProfile | null
}

export const syncUserProfile = async () => {
  const profile = await getUserObject().getOrCreateProfile()
  storage.setJSON(PROFILE_STORAGE_KEY, profile)
  return profile as UserProfile
}

export const getUserProfile = async () => {
  const profile = await getUserObject().getProfile()
  if (profile) {
    storage.setJSON(PROFILE_STORAGE_KEY, profile)
  }
  return profile as UserProfile | null
}

export const updateUserProfile = async (payload: { nickname?: string; avatar?: string }) => {
  const profile = await getUserObject().updateProfile(payload)
  storage.setJSON(PROFILE_STORAGE_KEY, profile)
  return profile as UserProfile
}
