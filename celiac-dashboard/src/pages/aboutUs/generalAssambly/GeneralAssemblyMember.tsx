import { Dialog, Transition } from '@headlessui/react';
// import 'flatpickr/dist/flatpickr.css';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { useAddBoardMemberMutation, useDeleteMemberByIdMutation, useGetBoardMembersQuery, useUpdateBoardMemberMutation } from '../../../api/AboutUsSlice/BoardDirectorsSlice';
import { showAlert } from '../../../components/Error';
import IconListCheck from '../../../components/Icon/IconListCheck';
import IconSearch from '../../../components/Icon/IconSearch';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { IRootState } from '../../../types/type';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { format } from 'date-fns';
import { useAddGeneralMemberMutation, useDeleteGeneralMemberByIdMutation, useGetGeneralMembersQuery, useUpdateGeneralMemberMutation } from '../../../api/AboutUsSlice/GeneralAssemblySlice';
import { usePermissions } from '../../../utils/permissions';
import Loader from '../../../components/Loader';
import Error404 from '../../../components/Layouts/Error404';

const BoardDirectors = () => {
    // stateHooks
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState('');
    const [positionId, setPositionId] = useState("");
    const [positionName, setPositionName] = useState("")
    const [startDate, setStartDate] = useState<string>('');
    const [period, setPeriod] = useState('');
    const [memberId, setMemberId] = useState<number | null>(null);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>('list');
    const [MemberList, setMemberList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(MemberList);
    //   ...
    const { data, status, isLoading }: any = useGetGeneralMembersQuery({ page: currentPage, keyword: search });
    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);

    const [addBoardMember, { isLoading: isLoadingGet }] = useAddGeneralMemberMutation();
    const [deleteMemberById] = useDeleteGeneralMemberByIdMutation();
    const [updateBoardMember, { isLoading: isLoadingEdit }] = useUpdateGeneralMemberMutation();
    const { canCreate, canRead, canDelete, canUpdate, isLoading: isLoadingPermissions } = usePermissions();

    useEffect(() => {
        if (data) {
            setMemberList(data?.data);
        }
    }, [data]);

    useEffect(() => {
        if (MemberList) {
            const filteredData = MemberList?.filter((item: any) => {
                const nameMatch = item?.name?.toLowerCase().includes(search.toLowerCase());
                const positionMatch = item?.position_name?.toLowerCase().includes(search.toLowerCase());
                return nameMatch || positionMatch
            });
            setFilteredItems(filteredData);
        }
    }, [search, MemberList]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('BoardDirectors'));
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
        setMemberId(member?.id);
        setName(member?.name);
        setStartDate(member?.start_date);
        setImage(member?.image);
        setPeriod(member?.period);
        setPositionId(member?.position?.id);
        setPositionName(member?.position?.name);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('position_id', positionId);
            formData.append('start_date', startDate);
            formData.append('period', String(period));
            if (image) {
                formData.append('image', image);
            }

            if (editing && memberId) {
                const response = await updateBoardMember({
                    Id: memberId,
                    formData: formData,
                }).unwrap();
                showAlert("Edit", "تم التغيير بنجاح")
            } else {
                const response = await addBoardMember(formData).unwrap();
                showAlert("Added", "تم الاضافه بنجاح")
            }
            setModalOpen(false);
            clearForm();
        } catch (error) {
            console.error(error);
            // @ts-ignore
            if (error.data && error.data.errors) {
                // @ts-ignore
                if (error.data.errors.period && error.data.errors.period[0]) {
                    // @ts-ignore
                    showAlert("error", error.data.errors.period[0]);
                    // @ts-ignore
                } else if (error.data.errors.name && error.data.errors.name[0]) {
                    // @ts-ignore
                    showAlert("error", error.data.errors.name[0]);
                    // @ts-ignore
                } else if (error.data.errors.start_date && error.data.errors.start_date[0]) {
                    // @ts-ignore
                    showAlert("error", error.data.errors.start_date[0]);
                } else {
                    showAlert("error", "خطأ غير متوقع في التحقق من البيانات");
                }
            } else {
                showAlert("error", "خطأ غير متوقع في التحقق من البيانات");
            }
        }
    };
    const clearForm = () => {
        setName('');
        setStartDate('');
        setPositionId("")
        setPositionName("")
        setPeriod('');
        setImage(null);
        setEditing(false);
        setMemberId(null);
    };

    const deleteMember = async (id: any) => {
        try {
            swal({
                title: "هل انت متأكد ؟؟",
                icon: "warning",
                buttons: ["الغاء", "حذف"],
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                    await deleteMemberById(id).unwrap();
                    setMemberList(MemberList.filter((member: any) => member.id !== id));
                    showAlert('Deleted', "تم المسح بنجاح");
                } else {
                    swal("لم يتم الحذف");
                }
            });
        } catch (error) {
            // @ts-ignore
            showAlert("error", error?.data?.errors?.name?.[0]);
        }
    };

    const addMember = () => {
        setModalOpen(true);
        clearForm();
        setEditing(false);
    };

    if (isLoading || isLoadingGet || isLoadingEdit || isLoadingPermissions) {

        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        )
    }



    if (!canRead('GeneralAssemblyMember')) {
        return <Error404 />;
    }


    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">أعضاء الجميعه العموميه</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            {canCreate('GeneralAssemblyMember') &&
                                <button type="button" className="btn btn-primary" onClick={addMember}>
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    إضافة عضو جديد
                                </button>
                            }
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="البحث في الأعضاء" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    <th>الاسم</th>
                                    <th>نوع العضويه</th>
                                    <th>بداية العضوية</th>
                                    <th>المده</th>
                                    <th className="!text-center">التحكم</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.length === 0 ? <h1 className=' flex justify-center items-center m-10'>لا يوجد نتائج بحث</h1> : " "}
                                {filteredItems &&
                                    filteredItems.map((member: any) => {
                                        return (
                                            <tr key={member.id}>
                                                <td>
                                                    <div className="flex items-center w-max">
                                                        <div className="w-max">
                                                            <img src={member?.image?.url} className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                        </div>
                                                        <div>{member?.name}</div>
                                                    </div>
                                                </td>
                                                <td>{member?.position_name}</td>
                                                <td>{member?.start_date}</td>
                                                <td className="whitespace-nowrap">
                                                    {member?.period === 2 ? <span> شهرين </span> : `${member?.period} ${member?.period > 1 && member?.period <= 10 ? 'شهور' : 'شهر'}`}
                                                </td>
                                                <td>
                                                    <div className="flex gap-4 items-center justify-center">
                                                        {canUpdate('GeneralAssemblyMember') &&
                                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(member)}>
                                                                تعديل
                                                            </button>
                                                        }
                                                        {canDelete('GeneralAssemblyMember') &&
                                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteMember(member.id)}>
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
                                        <h5 className="font-bold text-lg">{editing ? 'تعديل العضو ' : 'اضافة عضو جديد'}</h5>
                                        <div className="p-5">
                                            <form className="space-y-5" onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="name">الاسم كاملا</label>
                                                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="ادخل الاسم هنا " className="form-input" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="positionId">نوع العضويه</label>
                                                    <select
                                                        id="positionId"
                                                        value={positionId}
                                                        onChange={(e) => {
                                                            setPositionId(e.target.value);
                                                            setPositionName(positionId);
                                                        }}
                                                        className="form-select text-dark"
                                                        required
                                                    >
                                                        <option disabled value="">
                                                            اختر نوع الوظيفه
                                                        </option>
                                                        <option value="1">رئيس مجلس الادارة</option>
                                                        <option value="2">مدير مالى</option>
                                                        <option value="3">مدير تنفيذى</option>
                                                        <option value="4">مدير المشروع</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="startDate">تاريخ بدأ العضويه</label>
                                                    <Flatpickr
                                                        placeholder='YYYY-mm-dd'
                                                        value={startDate}
                                                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                        className="form-input"
                                                        onChange={(dates) => setStartDate(format(dates[0], 'yyyy-MM-dd'))}
                                                    />

                                                </div>
                                                <div>
                                                    <label htmlFor="period">مدة العضويه</label>
                                                    <input
                                                        id="period"
                                                        type="number"
                                                        value={period}
                                                        onChange={(e) => setPeriod(e.target.value)}
                                                        placeholder="3 أشهر"
                                                        className="form-input"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="image">تحميل الصوره (.png فقط)</label>
                                                    <input
                                                        id="image"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:ml-5 file:text-white file:hover:bg-primary"
                                                        required
                                                        style={{ direction: 'rtl' }}
                                                    />
                                                    {/* {image && (
                                                        <img src={URL.createObjectURL(image.url)} className="w-[100%] object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                    )} */}
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

export default BoardDirectors;
