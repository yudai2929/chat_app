import { db } from '@/plugins/firebase';
import { Room } from '@/types/Room';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { ref } from 'vue';
import { useUser } from './useUser';

const rooms = ref<Room[] | null>();
const loading = ref(true);

const { user } = useUser();

export const useRooms = () => {
  const id = user.value?.email;
  const q = query(collection(db, 'rooms'), where('viewer.id', '==', id));
  loading.value = true;
  onSnapshot(q, (querySnapshot) => {
    const _rooms: Room[] = [];
    querySnapshot.forEach((doc) => {
      const id: string = doc.id;
      _rooms.push({ ...(doc.data() as Room), id });
    });
    rooms.value = _rooms;
  });
  loading.value = false;
  return {
    rooms,
    loading,
  };
};
