import { Dialog, Transition } from '@headlessui/react';
// import 'flatpickr/dist/flatpickr.css';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../../components/Error';
import IconSearch from '../../../components/Icon/IconSearch';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { IRootState } from '../../../types/type';
import { Link } from 'react-router-dom';
import PdfFile from "../../../../public/assets/images/pdfLofo.svg"
import swal from 'sweetalert';
import { useAddGuidanceManualMutation, useDeleteGuidanceManualByIdMutation, useUpdateGuidanceManualMutation } from '../../../api/ClinicSlice/GuidanceManualSlice';
import Error404 from '../../../components/Layouts/Error404';
import { usePermissions } from '../../../utils/permissions';

function GenenralComponent({ GeneralData }: any) {
    // State hooks
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [file, setFile] = useState<any>(null);
    const [fileId, setfileId] = useState<number | null>(null);
    const [editing, setEditing] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [search, setSearch] = useState('');
    const [fileList, setfileList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(fileList);
    const [fileType, setFileType] = useState<number | null>(null);
    const [addGuidanceFile, { isLoading: isLoadingAdd }] = useAddGuidanceManualMutation();
    const [deletefileById] = useDeleteGuidanceManualByIdMutation();
    const [updateGuidanceFile, { isLoading: isLoadingEdit }] = useUpdateGuidanceManualMutation();
    const { canCreate, canUpdate, canDelete } = usePermissions();

    useEffect(() => {
        if (GeneralData) {
            setfileList(GeneralData);
        }
    }, [GeneralData]);

    useEffect(() => {
        const filteredData = fileList.filter((item: any) =>
            item.title?.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredItems(filteredData);
    }, [search, fileList]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('دليل التوجيه'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass === 'rtl');




    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };


    const handleEdit = (file: any) => {
        setfileId(file.id);
        setName(file.title);
        setFileType(file.file_type);
        setEditing(true);
        setModalOpen(true);
        setFieldErrors({})
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', name);
            formData.append('file', file);
            formData.append('file_type', fileType ? fileType.toString() : '');
            if (editing && fileId) {
                await updateGuidanceFile({
                    id: fileId,
                    formData: formData,
                }).unwrap();
                showAlert('Edit', 'تم التعديل بنجاح');
            } else {
                await addGuidanceFile(formData).unwrap();
                showAlert('Added', 'تم الإضافة بنجاح');
            }
            setModalOpen(false);
            clearForm();
        } catch (error: any) {
            if (error.status === 422) {
                const validationErrors = error.data.errors;
                setFieldErrors(validationErrors);
            } else {
                showAlert("error", "هناك خطأ غير معروف.");
            }
        }
    };

    const clearForm = () => {
        setName('');
        setFile(null);
        setEditing(false);
        setfileId(null);
        setFileType(null);
        setFieldErrors({})
    };


    const deletefile = async (id: number) => {
        try {
            const willDelete = await swal({
                title: 'هل أنت متأكد؟',
                icon: 'warning',
                buttons: ['إلغاء', 'حذف'],
                dangerMode: true,
            });

            if (willDelete) {
                await deletefileById(id).unwrap();
                setfileList(fileList.filter((file: any) => file.id !== id));
                showAlert('Deleted', 'تم الحذف بنجاح');
            }
        } catch (error) {
            // Handle error
        }
    };


    const addfile = () => {
        setModalOpen(true);
        clearForm();
        setEditing(false);
    };
    const renderError = (field: string) => {
        return fieldErrors[field] ? (
            <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
                {fieldErrors[field]}
            </div>
        ) : null;
    };
    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            {canCreate("GuidanceManual") &&
                                <button type="button" className="btn btn-primary" onClick={addfile}>
                                    إضـافة
                                </button>
                            }
                        </div>

                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ابحث ..."
                            className="form-input py-2 pl-11 peer"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="button" className="absolute left-2 top-1/2 transform -translate-y-1/2 peer-focus:text-primary">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5 panel p-0 border-0 overflow-hidden">
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>الرقم</th>
                                <th>العنوان</th>
                                <th>تاريخ النشر</th>
                                <th>الملف</th>
                                <th className="text-center">التحكم</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center">لا توجد نتائج بحث</td>
                                </tr>
                            )}
                            {filteredItems.map((file: any, index: number) => (
                                <tr key={file.id}>
                                    <td>{index + 1}</td>
                                    <td>{file.title}</td>
                                    <td>{file.publication_date}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <img src={PdfFile} className="w-8 object-cover" alt="PDF Icon" />
                                            <span>{file?.file?.name}</span>
                                        </div>
                                    </td>
                                    <td className="flex justify-center items-center gap-2">
                                        {canUpdate("GuidanceManual") &&
                                            <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(file)}>
                                                تعديل
                                            </button>
                                        }
                                        {canDelete("GuidanceManual") &&
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => deletefile(file.id)}>
                                                حذف
                                            </button>
                                        }
                                        <Link to={file?.file?.url} className="btn btn-sm btn-outline-dark" target="_blank">
                                            عرض
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Transition appear show={modalOpen} as={Fragment}>
                <Dialog as="div" open={modalOpen} onClose={() => setModalOpen(false)}>
                    <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto flex justify-center items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden max-w-lg text-black dark:text-white-dark">
                                <h5 className="font-bold text-lg">{editing ? 'تعديل' : 'إضافة'}</h5>
                                <div className="p-5">
                                    <form className="space-y-5" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="name">العنوان</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="ادخل العنوان"
                                                className="form-input"
                                                required
                                            />
                                            {renderError('title')}
                                        </div>
                                        <div>
                                            <label>نوع الملف *</label>
                                            <div className='flex flex-col '>
                                                <div className='flex  justify-around items-center text-center'>
                                                    <div className='flex items-center justify-center '>
                                                        <label htmlFor="general" className='mx-2 mt-1'>عام</label>
                                                        <input
                                                            type="radio"
                                                            id="general"
                                                            name="fileType"
                                                            className='cursor-pointer form-radio text-primary peer'
                                                            value="1"
                                                            checked={fileType === 1}
                                                            onChange={(e) => setFileType(Number(e.target.value))}
                                                        />

                                                    </div>
                                                    <div className='flex   items-center justify-center'>
                                                        <label htmlFor="gluten" className='mx-2 mt-1'>حساسية الغلوتين</label>
                                                        <input
                                                            type="radio"
                                                            id="gluten"
                                                            className='cursor-pointer form-radio text-primary peer'
                                                            name="fileType"
                                                            value="2"
                                                            checked={fileType === 2}
                                                            onChange={(e) => setFileType(Number(e.target.value))}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='text-center'>{renderError('file_type')}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="file">تحميل ملف PDF (.PDF فقط)</label>
                                            <input
                                                id="file"
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="application/pdf"
                                                className="form-input"
                                                required={!editing || file === null}
                                            />
                                        </div>
                                        <div className="flex justify-end items-center mt-8 gap-3">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setModalOpen(false)}>
                                                الغاء
                                            </button>
                                            <button type="submit" className="btn btn-primary ml-4" disabled={isLoadingAdd || isLoadingEdit}>
                                                تأكيد
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default GenenralComponent;
