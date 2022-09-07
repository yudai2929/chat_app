import { auth } from '@/plugins/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref } from 'vue';

const user = ref<User | null>();
onAuthStateChanged(auth, (_user) => {
  user.value = _user;
});

export const useUser = () => {
  return { user };
};
