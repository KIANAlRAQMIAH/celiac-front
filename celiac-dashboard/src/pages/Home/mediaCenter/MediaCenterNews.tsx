import { Dialog, Transition } from '@headlessui/react';
// import 'flatpickr/dist/flatpickr.css';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddNewMutation, useDeleteNewByIdMutation, useGetNewsQuery, useUpdateNewsMutation } from '../../../api/HomeSlice/MediaCenterSlice';
import { showAlert } from '../../../components/Error';
import IconSearch from '../../../components/Icon/IconSearch';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { IRootState } from '../../../types/type';
import swal from 'sweetalert';
import ModalNewDetailsModel from './ModalNewDetailsModel';
import Loader from '../../../components/Loader';
// import { usePermissions } from '../../../utils/permissions';



const MediaCenterNews = () => {
    // stateHooks
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalOpen1, setModalOpen1] = useState<boolean>(false);
    const [modalData, setModalData] = useState<any>(null)
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState('');
    const [memberId, setMemberId] = useState<number | null>(null);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>('list');
    const [MemberList, setMemberList] = useState<any>([]);
    const [description, setDescription] = useState('');
    const [filteredItems, setFilteredItems] = useState<any>(MemberList);
    //   ...
    const { data, status, isLoading } = useGetNewsQuery();
    const [addNew, { isLoading: isLoadingGet }] = useAddNewMutation();
    const [deleteNew] = useDeleteNewByIdMutation();
    const [updateNew, { isLoading: isLoadingEdit }] = useUpdateNewsMutation();
    const navigate = useNavigate();
    // const { canCreate, canRead, canUpdate, canDelete, isLoading:isLoadingPermissions } = usePermissions();
    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);
    useEffect(() => {
        if (data) {
            setMemberList(data?.data);
        }
    }, [data]);

    useEffect(() => {
        if (MemberList) {
            const filteredData = MemberList?.filter((item: any) => {
                const nameMatch = item?.name?.toLowerCase().includes(search.toLowerCase());
                const descMatch = item?.description?.toString().includes(search.toLowerCase());

                return nameMatch || descMatch
            });
            setFilteredItems(filteredData);
        }
    }, [search, MemberList]);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('OrganizationDirectors'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };


    // Image Upload
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);
        } else {
            setImage(null);
        }
    };

    const handleEdit = (member: any) => {
        setMemberId(member.id);
        setName(member.name);
        setDescription(member.description);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }

            if (editing && memberId) {
                const response = await updateNew({
                    Id: memberId,
                    formData: formData,
                }).unwrap();
                setModalOpen(false);
                showAlert("Edit", "تم التغيير بنجاح")
            } else {
                const response = await addNew(formData).unwrap();
            }

            clearForm();
        } catch (error) {
        }
    };
    const clearForm = () => {
        setName('');
        setDescription('');
        setImage(null);
        setEditing(false);
        setMemberId(null);
    };

    const HandleDeleteNew = async (id: any) => {
        swal({
            title: "هل انت متأكد من الحذف ؟",
            icon: "warning",
            buttons: ["الغاء", "حذف"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal(" تم الحذف", {
                        icon: "success",
                    });

                    try {
                        deleteNew(id).unwrap();
                        setMemberList(MemberList.filter((member: any) => member.id !== id));
                    } catch (error) {
                    }
                } else {
                    swal("لم يتم الحذف", {
                        icon: "info",
                    });
                }
            });
    };

    const addMember = () => {
        navigate('/home/mediaCenterNews/mediaCenterDetails');
        clearForm();
        setEditing(false);
    };


    if (isLoading || isLoadingGet || isLoadingEdit) {
        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        );
    }

    // if (!canRead('MediaCenter'))
    //     {
    //     return <Error404 />;
    //     }

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">المركز الإعلامي</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={addMember}>
                                إضافة خبـر
                            </button>
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
                                    <th>الاسم</th>
                                    <th>الصوره</th>
                                    <th>المحتوي</th>
                                    <th className="!text-center">التحكم</th>
                                    <th>التفاصيل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.length === 0 ? <h1 className=' flex justify-center items-center m-10'>لا يوجد نتائج بحث</h1> : " "}
                                {filteredItems &&
                                    filteredItems.map((member: any, index: number) => {
                                        return (
                                            <tr key={member.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div className="flex items-center w-max">
                                                        <div>{member?.name}</div>
                                                    </div>
                                                </td>
                                                <td> <div className="w-max flex justify-center items-center">
                                                    <img src={member?.image?.url} className="h-8 w-8 object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                    {member?.image?.name}
                                                </div>
                                                </td>
                                                <td>
                                                    {member?.description}
                                                </td>
                                                <td>
                                                    <div className="flex gap-4 items-center justify-center">
                                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(member)}>
                                                            تعديل
                                                        </button>
                                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => HandleDeleteNew(member.id)}>
                                                            حذف
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className='cursor-pointer'> <button onClick={() => {
                                                    setModalData(member);
                                                    setModalOpen1(true);
                                                }} type="button" className="btn btn-sm btn-outline-dark" >
                                                    العرض
                                                </button></td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>

                    <ModalNewDetailsModel modalData={modalData} modalOpen1={modalOpen1} setModalOpen1={setModalOpen1} />

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
                                        <h5 className="font-bold text-lg">تعديل الخبر</h5>
                                        <div className="p-5">
                                            <form className="space-y-5" onSubmit={handleSubmit}>
                                                <div className='mb-3'>
                                                    <label className='font-bold my-4 text-[20px]' htmlFor="name">العنوان</label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="write name"
                                                        className="form-input"
                                                        required
                                                    />
                                                </div>
                                                <h1 className="font-bold my-4 text-[20px]">وصف الخبر</h1>
                                                <textarea
                                                    name="description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="border rounded-lg p-4 w-[100%]"
                                                />

                                                <div>
                                                    <label htmlFor="image">تحميل الصوره(.png فقط)</label>
                                                    <input
                                                        id="image"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        className="form-input file:py-5 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                        required
                                                    />
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

export default MediaCenterNews;
