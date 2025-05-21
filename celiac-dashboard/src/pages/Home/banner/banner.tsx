import { Dialog, Transition } from '@headlessui/react';
// import 'flatpickr/dist/flatpickr.css';
import swal from 'sweetalert';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../../components/Error';
import IconListCheck from '../../../components/Icon/IconListCheck';
import IconSearch from '../../../components/Icon/IconSearch';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { IRootState } from '../../../types/type';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPencil from '../../../components/Icon/IconPencil';
import IconSettings from '../../../components/Icon/IconSettings';
import FileUpload from "../../../../public/assets/images/fileUpload.svg"
import { useAddNewBannerMutation, useChangeBannerStatusMutation, useDeleteBannerMutation, useEditBannerMutation, useGetBannersQuery } from '../../../api/HomeSlice/MediaCenterSlice';
import Loader from '../../../components/Loader';
import { usePermissions } from '../../../utils/permissions';
import Error404 from '../../../components/Layouts/Error404';


const Banner = () => {
    // stateHooks
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [isUrlValid, setIsUrlValid] = useState(true);
    const [bannerId, setBannerId] = useState<number | null>(null);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>('list');
    const [bannerList, setBannerList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(bannerList);
    const [isChecked, setIsChecked] = useState(true);
    const [urlError, setUrlError] = useState("");
    const { data, status, isLoading }: any = useGetBannersQuery();
    const [addBanner, { isLoading: isLoadingGet }] = useAddNewBannerMutation();
    const [updateBanner, { isLoading: isLoadingEdit }] = useEditBannerMutation();
    const [toggleActiveUserById] = useChangeBannerStatusMutation();
    const [deleteUserById] = useDeleteBannerMutation();
    const navigate = useNavigate()
    const { canCreate, canRead, canUpdate, canDelete, isLoading: isLoadingPermissions } = usePermissions();
    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);



    const toggleUserStatus = (user: any, isChecked: boolean) => {
        const newStatus = isChecked ? "Active" : "Inactive";
        toggleActiveUserById({ userId: user.id })
            .then((response) => {
            })
            .catch((error) => {
            });
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle(' البنرات الإعلانيه'));
    });

    useEffect(() => {
        if (data) {
            setBannerList(data?.data);
        }
    }, [data]);


    useEffect(() => {
        if (bannerList) {
            const filteredData = bannerList?.filter((item: any) => {
                const nameMatch = item?.name?.toLowerCase().includes(search.toLowerCase());
                const urlMatch = item?.url?.toLowerCase().includes(search.toLowerCase());
                return nameMatch || urlMatch
            });
            setFilteredItems(filteredData);
        }
    }, [search, bannerList]);




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

    const handleEdit = (banner: any) => {
        setBannerId(banner.id);
        setName(banner.name);
        setImage(banner.image);
        setIsChecked(banner.active_status === "Inactive");
        setUrl(banner.url);
        setEditing(true);
        setModalOpen(true);
    };


    const handleUrlChange = (e: any) => {
        const value = e.target.value;
        setUrl(value);
        const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        setIsUrlValid(urlRegex.test(value));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!isUrlValid) {
            alert("يرجي ادخال صيغة لينك صحيحه");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('url', url);
            formData.append('is_active', isChecked ? "0" : "1");

            if (image) {
                formData.append('image', image);
            }
            if (editing && bannerId) {
                const response = await updateBanner({
                    Id: bannerId,
                    formData: formData,
                }).unwrap();
            } else {
                const response = await addBanner(formData).unwrap();
            }
            setModalOpen(false);
            clearForm();
        } catch (error) {
            // @ts-ignore
            showAlert("error", error?.data?.errors?.image[0])
        }
    };
    const clearForm = () => {
        setName('');
        setImage(null);
        setUrl('');
        setIsChecked(false);
        setEditing(false);
        setBannerId(null);
    };


    const handleDeleteBanner = async (id: any) => {
        try {

            swal({
                title: " هل انت متأكد من المسح ؟؟",
                icon: "warning",
                buttons: ["الغاء", "حذف"],
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {

                    showAlert('Deleted', "تم المسح بنجاح");
                    await deleteUserById(id).unwrap();
                    setBannerList(bannerList.filter((banner: any) => banner.id !== id));
                } else {

                    swal("لم يتم الحذف");
                }
            });
        } catch (error) {
            // console.error('Error deleting user:', error);
        }
    };

    const handleAddBanner = () => {
        setModalOpen(true)
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
    if (!canRead('Banner')) {
        return <Error404 />;
    }
    return (
        <div>


            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">البنرات الإعلانيه</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            {canCreate('Banner') &&
                                <button type="button" className="btn btn-primary" onClick={handleAddBanner}>
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    اضف اعـلان جديد
                                </button>
                            }
                        </div>

                    </div>
                    <div className="relative">
                        <input type="text" placeholder="ابحث..." className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    <th>اللينك</th>
                                    <th className='text-center'>الحـاله</th>
                                    <th className="!text-center">التحكم</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.length === 0 ? <h1 className=' flex justify-center items-center m-10'>لا يوجد نتائج بحث</h1> : " "}
                                {filteredItems &&
                                    filteredItems.map((banner: any, index: number) => {
                                        return (
                                            <tr key={banner.id}>
                                                <td>{index + 1}</td>
                                                <td>{banner?.name}</td>
                                                <td> <div className="w-max flex justify-center items-center">
                                                    <img src={banner?.image?.url} className="h-8 w-8 object-cover ltr:mr-2 rtl:ml-2" alt="ImageBanner" />
                                                </div>
                                                </td>
                                                <td>
                                                    {banner?.url}
                                                </td>
                                                <td>

                                                    <div className="flex  gap-1 items-center justify-center">
                                                        <div className=' ml-2 text-[16px] font-bold text-[#001F15]'>نشط</div>
                                                        <label className="w-12 h-6 relative">
                                                            <input
                                                                type="checkbox"
                                                                checked={banner?.active_status === "Active"}
                                                                onChange={(e) => toggleUserStatus(banner, e.target.checked)}
                                                                className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                                id="custom_switch_checkbox1"
                                                            />
                                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-[#019867] before:transition-all before:duration-300"></span>
                                                        </label>
                                                        <div className=' mr-2  text-[16px] font-bold text-[#001F15]'>غير نشط</div>
                                                    </div>

                                                </td>

                                                <td>
                                                    <ul className="flex items-center justify-center gap-2">
                                                        {canUpdate('Banner') &&
                                                            <li>
                                                                {/* <Tippy content="Edit"> */}

                                                                <button type="button" onClick={() => handleEdit(banner)}>
                                                                    <IconPencil className="text-success" />
                                                                </button>
                                                                {/* </Tippy> */}
                                                            </li>
                                                        }
                                                        {canDelete('Banner') &&
                                                            <li>
                                                                {/* <Tippy content="Delete"> */}
                                                                <button type="button" onClick={() => handleDeleteBanner(banner.id)}>
                                                                    <IconTrashLines className="text-danger" />
                                                                </button>
                                                                {/* </Tippy> */}
                                                            </li>
                                                        }
                                                    </ul>
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
                                    <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                        <h5 className="font-bold text-lg text-primary/90 my-[8px] ">{editing ? 'تعديل' : 'اضافه  '}</h5>
                                        <div className="">
                                            <form className=" " onSubmit={handleSubmit}>
                                                <div className='flex flex-col gap-4'>
                                                    <div className=' bg-white flex flex-col gap-3  rounded-lg'>
                                                        <label htmlFor="name">الاسم</label>
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder="اكتب الاســم"
                                                            className="form-input"
                                                            required
                                                        />
                                                    </div>
                                                    <div className=' bg-white flex flex-col gap-3  rounded-lg'>
                                                        <label htmlFor="image">اللينك</label>
                                                        <input
                                                            id="url"
                                                            type="text"
                                                            value={url}
                                                            onChange={handleUrlChange}
                                                            placeholder="اكتب الرابــط"
                                                            className={`form-input ${urlError ? 'border-red-500' : ''}`}
                                                            required
                                                        />
                                                        {!isUrlValid && <span style={{ color: 'red' }}>يرجي ادخال صيغة اللينك بطريقه صحيحه</span>}
                                                    </div>
                                                    <div className=' bg-white flex flex-col gap-3  rounded-lg'>
                                                        <input
                                                            id="image"
                                                            type="file"
                                                            onChange={handleFileChange}
                                                            className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                            required
                                                        />
                                                        <img className='mt-4 w-[70%] mx-auto' src={FileUpload} />
                                                    </div>

                                                    <div>
                                                        <div className="flex gap-1 items-center justify-center">
                                                            <span className='text-[16px] font-bold text-[#001F15]'>نشط</span>
                                                            <label className="w-12 h-6 relative">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                                    id="custom_switch_checkbox1"
                                                                    checked={!isChecked}
                                                                    onChange={() => setIsChecked(!isChecked)}
                                                                />
                                                                <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-[#019867] before:transition-all before:duration-300"></span>
                                                            </label>
                                                            <span className='text-[16px] font-bold text-[#001F15]'>غير نشط</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" disabled={isLoadingGet || isLoadingEdit} className="btn btn-primary ltr:ml-auto rtl:mr-auto w-[30%]">
                                                    تأكيد
                                                </button>
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
}

export default Banner;
