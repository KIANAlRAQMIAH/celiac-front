import { Dialog, Transition } from '@headlessui/react';
// import 'flatpickr/dist/flatpickr.css';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { showAlert } from '../../components/Error';
import IconSearch from '../../components/Icon/IconSearch';
import PdfFile from "../../../public/assets/images/pdfLofo.svg"
import { useAddScientificMutation, useDeleteScientificByIdMutation, useGetScientificResearchesQuery, useUpdateScientificMutation } from '../../api/ClinicSlice/scientificResearchSlice';
import Loader from '../../components/Loader';
import Error404 from '../../components/Layouts/Error404';
import { usePermissions } from '../../utils/permissions';

const ScientificResearch = () => {
    // stateHooks
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [image, setImage] = useState<any>(null);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<any>(null);
    const [fileId, setfileId] = useState<number | null>(null);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>('list');
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [fileList, setfileList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(fileList);
    //   ...
    const { data, status, isLoading }: any = useGetScientificResearchesQuery(currentPage);
    const [addOrganizationfile, { isLoading: isLoadingGet }] = useAddScientificMutation();
    const [deletefileById] = useDeleteScientificByIdMutation();
    const [updateOrganizationfile, { isLoading: isLoadingEdit }] = useUpdateScientificMutation();
    const { canCreate, canRead, canUpdate, canDelete, isLoading: isLoadingPermissions } = usePermissions();

    const navigate = useNavigate()
    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);

    useEffect(() => {
        if (data) {
            setfileList(data.data);
            setFilteredItems(data.data);
        }
    }, [data]);


    useEffect(() => {
        if (fileList.length > 0) {
            const filteredData = fileList.filter((item: any) => {
                const nameMatch = item.title.toLowerCase().includes(search.toLowerCase());
                return nameMatch;
            });
            setFilteredItems(filteredData);
        } else {
            setFilteredItems([]);
        }
    }, [search, fileList]);



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('الأبحاث العلميه'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;



    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };




    const handleFilePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };


    const handleFileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiless = e.target.files[0];
            setImage(selectedFiless);
        } else {
            setImage(null);
        }
    };

    const handleEdit = (file: any) => {
        setfileId(file.id);
        setName(file.title);
        setDescription(file.description)
        setAuthorName(file.author_name)
        setImage(null);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', name);
            formData.append('author_name', authorName);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }
            if (file) {
                formData.append('file', file);
            }
            if (editing && fileId) {
                const response = await updateOrganizationfile({
                    FileId: fileId,
                    formData: formData,
                }).unwrap();
                showAlert("Edit", "تم التغيير بنجاح");
            } else {
                const response = await addOrganizationfile(formData).unwrap();
                showAlert("Added", "تم الاضافه بنجاح");
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
        setDescription('')
        setAuthorName('')
        setName('');
        setFile(null);
        setImage(null)
        setfileId(null);
        setFieldErrors({})
    };


    const deletefile = async (id: any) => {
        try {

            swal({
                title: "هل انت متأكد ؟؟",
                icon: "warning",
                buttons: ["الغاء", "حذف"],
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                    await deletefileById(id).unwrap();
                    setfileList(fileList.filter((file: any) => file.id !== id));
                    showAlert('Deleted', "تم المسح بنجاح");
                } else {
                    swal("لم يتم الحذف");
                }
            });
        } catch (error: any) {
            if (error.status === 422) {
                const validationErrors = error.data.errors;
                setFieldErrors(validationErrors);
            } else {
                showAlert("error", "هناك خطأ حاول مره اخري.");
            }
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

    if (isLoading || isLoadingGet || isLoadingEdit || isLoadingPermissions) {
        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        );
    }

    if (!canRead('ScientificResearch')) {
        return <Error404 />;
    }
    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">الأبحاث العلميه</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            {canCreate('ScientificResearch') &&
                                <button type="button" className="btn btn-primary" onClick={addfile}>
                                    اضافة بحث جديد
                                </button>
                            }
                        </div>

                    </div>
                    <div className="relative">
                        <input type="text" placeholder="ابحث ..." className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>الرمز</th>
                                    <th>الصوره</th>
                                    <th>اسم الفايل</th>
                                    <th>الوصف</th>
                                    <th>اسم المؤلف</th>
                                    <th>فايل PDF</th>
                                    <th>تاريخ النشر</th>
                                    <th className="!text-center">التحكم</th>
                                </tr>
                            </thead>
                            <tbody>

                                {filteredItems.length === 0 ? <h1 className=' flex justify-center items-center m-10'>لا يوجد نتائج بحث</h1> : " "}
                                {filteredItems &&
                                    filteredItems?.map((file: any, index: number) => {
                                        return (
                                            <tr key={file.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div className="w-max flex flex-col gap-2 items-center justify-center  ">
                                                        <img src={file?.image?.url} className="  w-8  object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                    </div>
                                                </td>
                                                <td>{file?.title}</td>
                                                <td>{file?.description}</td>
                                                <td>{file?.author_name}</td>
                                                <td>
                                                    <div className="flex gap-2 items-center justify-center w-max">
                                                        <div className="w-max">
                                                            <img src={PdfFile} className="  w-8  object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                        </div>
                                                        {/* <div>{file?.file?.name}</div> */}
                                                    </div>
                                                </td>
                                                <td>{file?.publication_date}</td>
                                                <td>
                                                    <div className="flex gap-4 items-center justify-center">
                                                        {canUpdate('ScientificResearch') &&
                                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(file)}>
                                                                تعديل
                                                            </button>
                                                        }
                                                        {canDelete('ScientificResearch') &&
                                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deletefile(file.id)}>
                                                                حذف
                                                            </button>
                                                        }


                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between mt-4 m-7">
                        <button className="btn btn-outline-primary mx-2" onClick={handlePrevPage} disabled={currentPage === 1}>
                            السابق
                        </button>
                        <button className="btn btn-outline-primary mx-2" onClick={handleNextPage} disabled={data?.meta.current_page === data?.meta.last_page}>
                            التالي
                        </button>
                    </div>
                </div>
            )}

            {/* ....ModeL.. */}
            <div className="mb-5">
                <Transition appear show={modalOpen} as={Fragment}>
                    <Dialog as="div" open={modalOpen} onClose={() => setModalOpen(false)}>
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
                                    <Dialog.Panel as="div" className=" panel border-0 p-5 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                        <h5 className="font-bold text-lg">{editing ? 'تعديل' : 'إضافه'}</h5>
                                        <div className="p-5">
                                            <form className="space-y-5" onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="name">العنوان</label>
                                                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="ادخل العنوان" className="form-input" required />
                                                    {renderError('name')}
                                                </div>
                                                <div>
                                                    <label htmlFor="authorName">اسم المؤلـف</label>
                                                    <input id="authorName" type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="ادخل اسم المؤلف" className="form-input" required />
                                                    {renderError('authorName')}
                                                </div>
                                                <div>
                                                    <label htmlFor="description">الوصــف</label>
                                                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="ادخل الوصــف" className="form-input" required />
                                                    {renderError('description')}
                                                </div>
                                                <div>
                                                    <label htmlFor="image">تحميل الصوره</label>
                                                    <input
                                                        id="image"
                                                        type="file"
                                                        onChange={handleFileImageChange}
                                                        className="form-input file:py-5 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                        required
                                                    />
                                                    {renderError('image')}
                                                </div>
                                                <div>
                                                    <label htmlFor="pdf">تحميل ملف PDF (.PDF only)</label>
                                                    <input
                                                        id="pdf"
                                                        type="file"
                                                        onChange={handleFilePdfChange}
                                                        accept="application/pdf"
                                                        className="form-input file:py-5 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                        required
                                                    />
                                                    {renderError('file')}
                                                </div>
                                                <div className="flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModalOpen(false)}>
                                                        الغاء
                                                    </button>


                                                    <button type="submit" disabled={isLoadingGet || isLoadingEdit} className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
        </div>
    );
};

export default ScientificResearch;
