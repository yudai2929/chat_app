import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { ref } from 'vue';

const user = ref<User | null>();
const auth = getAuth();
onAuthStateChanged(auth, (_user) => {
  user.value = _user;
});

export const useUser = () => {
  return { user };
};
