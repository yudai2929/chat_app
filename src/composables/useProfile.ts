import { db } from '@/plugins/firebase';
import { Profile } from '@/types/Profile';
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
} from 'firebase/firestore';
import { ref } from 'vue';
import { useUser } from './useUser';

const { user } = useUser();
const profile = ref<Profile | null>();
const exists = ref<boolean>(false);

const fetchProfile = async () => {
  if (!user.value?.email) return;
  const docRef = doc(db, 'profile', user.value?.email);
  const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);
  if (docSnap.exists()) {
    profile.value = docSnap.data() as Profile;
    exists.value = true;
  }
};

export const useProfile = () => {
  return {
    profile,
    exists,
    fetchProfile,
  };
};

// 使い回すか分からないがhooks作成
