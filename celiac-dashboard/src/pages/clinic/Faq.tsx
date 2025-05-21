import { Dialog, Transition } from '@headlessui/react';
// import 'flatpickr/dist/flatpickr.css';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useAddFaqMutation, useDeleteFaqByIdMutation, useGetFaqsQuery, useUpdateFaqMutation } from '../../api/ClinicSlice/FAQSlice';
import { showAlert } from '../../components/Error';
import IconSearch from '../../components/Icon/IconSearch';
import Error404 from '../../components/Layouts/Error404';
import Loader from '../../components/Loader';
import { setPageTitle } from '../../store/themeConfigSlice';
import { usePermissions } from '../../utils/permissions';

const Faq = () => {
    // stateHooks
    const [modalOpen, setModalOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [fileId, setfileId] = useState<number | null>(null);
    const [file, setFile] = useState<any>(null);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>('list');
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [fileList, setfileList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(fileList);
    //   ...
    const { data, status, isLoading }: any = useGetFaqsQuery(currentPage);
    const [addOrganizationfile, { isLoading: isLoadingGet }] = useAddFaqMutation();
    const [deletefileById] = useDeleteFaqByIdMutation();
    const [updateOrganizationfile, { isLoading: isLoadingEdit }] = useUpdateFaqMutation();
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
                const nameMatch = item.question.toLowerCase().includes(search.toLowerCase());
                return nameMatch;
            });
            setFilteredItems(filteredData);
        } else {
            setFilteredItems([]);
        }
    }, [search, fileList]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('الأسألة الشائعة'));
    });

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleEdit = (file: any) => {
        setfileId(file.id);
        setQuestion(file.question);
        setAnswer(file.answer)
        setEditing(true);
        setModalOpen(true);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const faqData = {
                question: question,
                answer: answer,

            };

            if (editing && fileId) {
                const response = await updateOrganizationfile({
                    FileId: fileId,
                    ...faqData,
                }).unwrap();
                showAlert("Edit", "تم التغيير بنجاح");
            } else {
                const response = await addOrganizationfile(faqData).unwrap();
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
        setQuestion(file.question);
        setAnswer(file.answer)
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

    if (!canRead('Faq')) {
        return <Error404 />;
    }
    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">الأسأله الشائعة</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            {canCreate('Faq') &&
                                <button type="button" className="btn btn-primary" onClick={addfile}>
                                    اضافة
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
                                    <th>الســؤال</th>
                                    <th>الإجابة</th>
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
                                                <td>{file?.question}</td>
                                                <td>{file?.answer}</td>
                                                <td>
                                                </td>

                                                <td>
                                                    <div className="flex gap-4 items-center justify-center">
                                                        {canUpdate('Faq') &&
                                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(file)}>
                                                                تعديل
                                                            </button>
                                                        }
                                                        {canDelete('Faq') &&
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
                                                    <label htmlFor="question">السؤال</label>
                                                    <textarea id="question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="ادخل السؤال" className="form-input" required />
                                                    {renderError('question')}
                                                </div>
                                                <div>
                                                    <label htmlFor="answer">الإجابة</label>
                                                    <textarea id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="ادخل الإجابة" className="form-input" required />
                                                    {renderError('answer')}
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

export default Faq;
