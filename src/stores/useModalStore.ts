import { defineStore } from 'pinia';
import ModalShare from '@/components/ModalShare.vue';

export const useModalStore = defineStore('modal', () => {
  const closeModal = () => {
    ModalShare.value.closeModalInComponent();
  };

  return { closeModal };
});
