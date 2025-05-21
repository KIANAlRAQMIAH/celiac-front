import { Dialog, Transition } from '@headlessui/react';
// import 'flatpickr/dist/flatpickr.css';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { showAlert } from '../../../components/Error';
import IconListCheck from '../../../components/Icon/IconListCheck';
import IconSearch from '../../../components/Icon/IconSearch';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { IRootState } from '../../../types/type';
import { useAddPartnerMutation, useDeletePartnerMutation, useGetPartnersQuery, useUpdatePartnerMutation } from '../../../api/HomeSlice/PartnerSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { usePermissions } from '../../../utils/permissions';
import Error404 from '../../../components/Layouts/Error404';

const Partners = () => {
    // stateHooks
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState('');
    const [partner_group_id, setPartner_group_id] = useState('');
    const [partnerId, setpartnerId] = useState<number | null>(null);
    const [positionId, setPositionId] = useState("");
    const [positionName, setPositionName] = useState("")
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>('list');
    const [partnerList, setpartnerList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(partnerList);
    const { data, status, isLoading } = useGetPartnersQuery();
    const [addPartner, { isLoading: isLoadingGet }] = useAddPartnerMutation();
    const [deletePartner] = useDeletePartnerMutation();
    const [updatePartner, { isLoading: isLoadingEdit }] = useUpdatePartnerMutation();
    const navigate = useNavigate();
    const { canCreate, canRead, canUpdate, canDelete, isLoading: isLoadingPermissions } = usePermissions();
    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);
    useEffect(() => {
        if (data) {
            setpartnerList(data?.data);
        }
    }, [data]);

    useEffect(() => {
        if (partnerList) {
            const filteredData = partnerList.filter((item: any) => {
                const nameMatch = item?.name?.toLowerCase().includes(search.toLowerCase());
                const PartnerTypeMatch = item?.partnerGroup?.name?.toString().includes(search.toLowerCase());
                return nameMatch || PartnerTypeMatch;
            });
            setFilteredItems(filteredData);
        }
    }, [search, partnerList]);



    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    const handleNextPage = () => setCurrentPage(currentPage + 1);
    const handlePrevPage = () => setCurrentPage(currentPage - 1);


    // Image Upload
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);
        } else {
            setImage(null);
        }
    };

    const handleEdit = (partner: any) => {
        setpartnerId(partner.id);
        setName(partner?.name);
        setPartner_group_id(partner?.partnerGroup?.id);
        setPositionName(partner?.partnerGroup?.name)
        setEditing(true);
        setModalOpen(true);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('partner_group_id', partner_group_id);
            if (image) {
                formData.append('image', image);
            }

            if (editing && partnerId) {
                const response = await updatePartner({
                    Id: partnerId,
                    formData: formData,
                }).unwrap();
                showAlert("Edit", "تم التغيير بنجاح")
            } else {
                const response = await addPartner(formData).unwrap();
                showAlert("Added", "تم الاضافه بنجاح")
            }
            setModalOpen(false);
            clearForm();
        } catch (error) {
        }
    };
    const clearForm = () => {
        setName('');
        setPartner_group_id('');
        setPositionName("")
        setImage(null);
        setEditing(false);
        setpartnerId(null);
    };



    const HandleDeletePartner = async (id: any) => {
        try {

            swal({
                title: "هل انت متأكد من المسح ؟؟",
                icon: "warning",
                buttons: ["الغاء", "حذف"],
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                    await deletePartner(id).unwrap();
                    setpartnerList(partnerList.filter((partner: any) => partner.id !== id));
                    showAlert('Deleted', "تم المسح بنجاح");
                    swal("تم المسح", {
                        icon: "success",
                    });
                } else {
                    swal("لم يتم المسح");
                }
            });
        } catch (error) {
            // console.error('Error deleting partner:', error);
        }
    };

    const HandleAddPartner = () => {
        setModalOpen(true);
        clearForm();
        setEditing(false);
    };

    if (isLoading || isLoadingGet || isLoadingEdit || isLoadingPermissions) {
        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        );
    }
    if (!canRead('Partner')) {
        return <Error404 />;
    }
    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">الشركــاء</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            {canCreate('Partner') &&
                                <button type="button" className="btn btn-primary" onClick={HandleAddPartner}>
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    أضف شريك جديد
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
                                    <th>الإسم</th>
                                    <th>نوع الشراكه</th>
                                    <th>اللوجو</th>
                                    <th className="!text-center">التحكم</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.length === 0 ? <h1 className=' flex justify-center items-center m-10'>لا يوجد نتائج بحث</h1> : " "}
                                {filteredItems &&
                                    filteredItems.map((partner: any, index: number) => {
                                        return (
                                            <tr key={partner.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div className="flex items-center w-max">
                                                        <div>{partner?.name}</div>
                                                    </div>
                                                </td>
                                                <td>{partner?.partnerGroup?.name}</td>
                                                <td>
                                                    <div className="w-max">
                                                        <img src={partner?.image?.url} className="h-8 w-8  object-cover ltr:mr-2 rtl:ml-2" alt="Logo Partner" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex gap-4 items-center justify-center">
                                                        {canUpdate('Partner') &&
                                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(partner)}>
                                                                تعديل
                                                            </button>
                                                        }
                                                        {canDelete('Partner') &&
                                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => HandleDeletePartner(partner.id)}>
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
                                        <h5 className="font-bold text-lg text-primary/90 my-[8px] ">{editing ? 'تعديل' : 'اضافه  '}</h5>
                                        <div className="p-5">
                                            <form className="space-y-5" onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="name">الإسم بالكامل</label>
                                                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب الاسم بالكامل" className="form-input" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="partner_group_id">نوع الشريك</label>
                                                    <select id="partner_group_id" value={partner_group_id}
                                                        onChange={(e) => {
                                                            setPartner_group_id(e.target.value);
                                                            setPositionName(partner_group_id);
                                                        }}
                                                        className="form-select text-dark" required>
                                                        <option defaultValue="">اختر نوع الشريك</option>
                                                        <option value="1">الشريك الذهبي</option>
                                                        <option value="2">الشريك الرسمي</option>
                                                        <option value="3">الشريك البلاتيني</option>
                                                    </select>
                                                </div>
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

export default Partners;
