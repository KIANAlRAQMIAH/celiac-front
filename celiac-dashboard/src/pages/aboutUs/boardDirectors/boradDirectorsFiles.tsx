import { Dialog, Transition } from '@headlessui/react';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import pdfLogo from '../../../../public/assets/images/pdfLofo.svg';
import { useAddDirectorFilesMutation, useDeleteFileByIdMutation, useGetDirectorFilesQuery, useUpdateFileDirectorMutation } from '../../../api/AboutUsSlice/BoardDirectorsSlice';
import { showAlert } from '../../../components/Error';
import { Link, useNavigate } from 'react-router-dom';
import UPloadIcon from "../../../../public/assets/images/uploadIcon.png"
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { usePermissions } from '../../../utils/permissions';
import Loader from '../../../components/Loader';
import Error404 from '../../../components/Layouts/Error404';

function BoradDirectorsFiles() {
    const [modal2, setModal2] = useState(false);
    const [name, setName] = useState('');
    const [file, setFile] = useState<any>(null);
    const [fileList, setFileList] = useState<any>([]);
    const [fileId, setFileId] = useState<number | null>(null);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate()
    const [addDirectorFile , { isLoading: isLoadingGet }] = useAddDirectorFilesMutation();
    const [deleteDirectorFile] = useDeleteFileByIdMutation();
    const [updateDirectorFile , { isLoading: isLoadingEdit }] = useUpdateFileDirectorMutation();
    const {canCreate , canRead,canDelete, canUpdate, isLoading:isLoadingPermissions } = usePermissions();
    const { data, status , isLoading} = useGetDirectorFilesQuery();
    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    useEffect(() => {
        if (data) {
            setFileList(data?.data);
        }
    }, [data]);



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('اجتماعات الجمعيه'));
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('file', file);

            if (editing && fileId) {
                const response = await updateDirectorFile({
                    fileId: fileId,
                    formData: formData,
                }).unwrap();
                showAlert("Edit", "تم التغيير بنجاح")
            } else {
                const response = await addDirectorFile(formData).unwrap();
                showAlert("Added", "تم الاضافه بنجاح")
            }

            setModal2(false);
            clearForm();
        } catch (error) {

            // console.error('Error:', error);

        }
    };

    const clearForm = () => {
        setFileId(null);
        setName('');
        setEditing(false);
    };

    const handleEdit = (file: any) => {
        setFileId(file.id);
        setName(file.name);
        setEditing(true);
        setModal2(true);
    };



    const deleteFile = async (id: any) => {
        try {

            swal({
                title: "هل انت متأكد ؟؟",
                icon: "warning",
                buttons: ["الغاء", "حذف"],
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                    showAlert('Deleted', "تم المسح بنجاح");
                    await deleteDirectorFile(id).unwrap();
                    setFileList(fileList.filter((file: any) => file.id !== id));
                } else {
                    swal("لم يتم الحذف ");
                }
            });
        } catch (error) {
            // console.error('Error deleting file:', error);
        }
    };


    const AddFile = () => {
        setModal2(true);
        clearForm();
        setEditing(false);
    };


    if ( isLoading|| isLoadingGet || isLoadingEdit || isLoadingPermissions)
        {

            return (
             <div className="flex justify-center items-center mt-[50%]">
               <Loader />
                </div>
            )
        }



        if (!canRead('BoardDirectorMeeting'))
            {
            return <Error404 />;
            }

    return (
        <>
            <div className="mb-5">
                <div className="flex items-end justify-end m-4">
                {canCreate('BoardDirectorMeeting') &&
                    <button type="button" disabled={isLoadingGet} onClick={AddFile} className="btn btn-primary">
                        اضف اجتماع جديد
                    </button>
                }
                </div>

                {/* Modal */}
                <Transition appear show={modal2} as={Fragment}>
                    <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <h5 className="font-bold text-lg">{editing ? 'تعديل الاجتماع' : 'اضافة اجتماع جديد'}</h5>
                                        <div className="p-5">
                                            <form onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="text">اسم الاجتماع</label>
                                                    <input id="text" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم الاجتماع" className="form-input" required />
                                                </div>
                                                <div className="flex flex-col justify-center items-center gap-3 w-[100%]">
                                                    <div className="w-[100%] mt-4">
                                                        <label htmlFor="file">اختر الفايل (PDF فقط)</label>
                                                        <input id="file" type="file" onChange={handleFileChange} className="form-input  btn btn-primary" required accept="application/pdf" />
                                                    </div>
                                                    <img src={UPloadIcon} width={100} height={100} alt="image upload" />
                                                </div>
                                                <div className="flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModal2(false)}>
                                                        الغاء
                                                    </button>
                                                    <button type="submit" disabled={isLoadingEdit || isLoadingGet}  className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                        تأكيد
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                {fileList?.map((file: any, index: number) => (
                    <div key={index} className="p-5 bg-white border shadow-lg rounded-lg">
                        <h1 className="my-3  font-bold  text-[20px]">اسم الاجتماع</h1>
                        <div className="p-4 border rounded-lg w-[100%] mb-5">{file?.name}</div>
                        <div className="bg-[#F2F5F8]">
                            <div className="flex justify-end items-end pt-5 pr-5 gap-2">
                            {canUpdate('BoardDirectorMeeting') &&

                                <FiEdit size={23} className="cursor-pointer" onClick={() => handleEdit(file)} />
                            }
                              {canDelete('BoardDirectorMeeting') &&
                                <IoMdClose size={23} className="cursor-pointer" onClick={() => deleteFile(file.id)} />
                              }
                                </div>
                            <Link to={file?.url} target='_blank'>
                            <div className=" flex justify-center items-center gap-3 h-44 ">
                                <img src={pdfLogo} alt="PDF Logo" width={40} height={40} />
                                <div className="flex flex-col gap-1">
                                    <div className="font-bold">{file?.file_name}</div>
                                    <div className="text-gray-500">{file?.size}</div>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BoradDirectorsFiles;
