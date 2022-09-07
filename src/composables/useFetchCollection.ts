import { db } from '@/plugins/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref } from 'vue';

const data = ref<unknown | null>();
const exists = ref<boolean>(false);

export const useFetchCollection = (collection: string, id: string) => {
  const docRef = doc(db, collection, id);
  async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        data.value = docSnap.data();
        exists.value = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data,
    exists,
  };
};

// 使い回すか分からないがhooks作成
