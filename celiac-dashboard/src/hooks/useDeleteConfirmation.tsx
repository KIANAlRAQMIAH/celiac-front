
import { useTranslation } from 'react-i18next';
import { showAlert } from '../components/Error';
import { useDeleteRecordMutation } from '../api/serveces';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
const useDeleteConfirmation = ({url, inValid, openCloseModal}:{url:string, inValid:string, openCloseModal?: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const {t} = useTranslation()
    const [deleteRecord] = useDeleteRecordMutation();
    const deleteSubmitHandler = async (id: string) => {
      swal({
        title: 'هل أنت متأكد أنك تريد حذف العنصر؟',
        icon: 'error',
        buttons: ['إلغاء', 'حذف'],
        dangerMode: true,
    }).then(async (willDelete: any) => {
        if (willDelete) {
          const data = await deleteRecord({ id, url: url, inValid: [inValid] });
        console.log(data)
            //@ts-ignore
            if (data?.error?.data?.status === 400) {
                //@ts-ignore
                toast.error(data?.error?.data?.message, {});
                // setToastData({});
            }
            //@ts-ignore
            if (data?.data.status === 200) {
                //@ts-ignore
                showAlert('Added', "تم الحذف بنجاح");
                if(openCloseModal){
                    openCloseModal(false)
                }
                // setToastData({});
            }
            // setToastData(data);
        } else {
            swal('لم يتم الحذف');
        }
    });

        // swal({
        //   title: t('tableForms.confirmationDialog.title'),
        //   text: t('tableForms.confirmationDialog.text'),
        //   icon: "error",
        //   content: {
        //     element: "input",
        //     attributes: {
        //       placeholder: t('tableForms.confirmationDialog.placeholder'),
        //       type: "text",
        //     },
        //   },
        //   buttons: ['الغاء', 'حذف'],
        //   dangerMode: true,
        // }).then(async (value: any) => {
        //   if (value === t('tableForms.confirmationDialog.confirmText')) {
        //     const data = await deleteRecord({ id, url: url, inValid: [inValid] });
        //     console.log(data);
        //     //@ts-ignore
        //     if (data?.error?.data?.status === 400) {
        //       //@ts-ignore
        //       toast.error(data?.error?.data?.message, {});
        //     }
        //     //@ts-ignore
        //     if (data?.data.status === 200) {
              
        //       showAlert("Added", data?.data.response?.message);
        //     }
        //     // setToastData(data);
        //   } else {
        //     swal(t('tableForms.confirmationDialog.fail'));
        //   }
        // });
      };


  return deleteSubmitHandler
}

export default useDeleteConfirmation