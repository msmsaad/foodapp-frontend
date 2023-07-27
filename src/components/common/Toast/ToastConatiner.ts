import { toast } from 'react-toastify';

class ToastController {
  showError(message: string) {
    toast.error(message);
  }
}

const toastController = new ToastController();

export default toastController;
