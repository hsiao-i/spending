import { defineStore } from 'pinia';
import ModalShare from '@/components/ModalShare.vue';

export const useModalStore = defineStore('modal', () => {
  const closeModal = () => {
    ModalShare.value.closeModalInComponent();
    console.log('closeModal');
  };

  return { closeModal };
});
