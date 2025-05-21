import { Dialog, Transition } from '@headlessui/react';
// import 'flatpickr/dist/flatpickr.css';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { showAlert } from '../../components/Error';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconSearch from '../../components/Icon/IconSearch';
import { useAddAdminMutation, useDeleteAdminByIdMutation, useGetAdminsQuery, useGetRolesQuery, useToggleActiveAdminAByIdMutation, useUpdateAdminByIdMutation } from '../../api/Admins/AdminSlice';
import swal from 'sweetalert';
import Loader from '../../components/Loader';
import { usePermissions } from '../../utils/permissions';
import Error404 from '../../components/Layouts/Error404';


const Admins = () => {
    // stateHooks
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [memberId, setMemberId] = useState<number | null>(null);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>('list');
    const [MemberList, setMemberList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(MemberList);
    const [roleOptions, setRoleOptions] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [roleOptions1, setRoleOptions1] = useState([]);
    const [selectedRoleId1, setSelectedRoleId1] = useState(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [deleteAdminById]: any = useDeleteAdminByIdMutation();
    const [toggleActiveUserById] = useToggleActiveAdminAByIdMutation();
    const [addsAdmin, { isLoading: isLoadingGet }] = useAddAdminMutation();
    const [updatesAdmin, { isLoading: isLoadingEdit }] = useUpdateAdminByIdMutation();
    const { data: Roles, isSuccess: Role_idIsSuccess, refetch: refetchRoles } = useGetRolesQuery();
    const { data, isLoading }: any = useGetAdminsQuery({ pageNumber: currentPage, selectedRoleId1 });
    const { canCreate, canRead, canUpdate, canDelete, isLoading: isLoadingPermissions } = usePermissions();

    // SELECT ROLE ID IN MODEL
    useEffect(() => {
        if (Role_idIsSuccess && Roles?.data) {
            const formattedRoles = Roles.data.map((role: any) => ({
                value: role.id,
                label: role.name,
            }));
            setRoleOptions(formattedRoles);
            setSelectedRoleId(formattedRoles[0]?.value);
        }
    }, [Role_idIsSuccess, Roles]);

    // SELECT ROLE ID TO FILTER ADMINS
    useEffect(() => {
        if (Role_idIsSuccess && Roles?.data) {
            const formattedRoles1 = Roles.data.map((role: any) => ({
                value: role.id,
                label: role.name,
            }));
            setRoleOptions1(formattedRoles1);
            setSelectedRoleId1(formattedRoles1[0]?.value);
        }
    }, [Role_idIsSuccess, Roles]);

    useEffect(() => {
        if (data) {
            setMemberList(data?.data);
            refetchRoles();
        }
    }, [data]);

    useEffect(() => {
        if (MemberList) {
            const filteredData = MemberList?.filter((item: any) => {
                const nameMatch = item?.name?.toLowerCase().includes(search.toLowerCase());
                const roleNameMatch = item?.role?.name?.toLowerCase().includes(search.toLowerCase());

                return nameMatch || roleNameMatch
            });
            setFilteredItems(filteredData);
        }
    }, [search, MemberList]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('المتحكمـين'));
    });



    const handleNextPage = () => setCurrentPage(currentPage + 1);
    const handlePrevPage = () => setCurrentPage(currentPage - 1);




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
        setSelectedRoleId(member?.role?.id)
        setName(member.name);
        setPassword('');
        setFieldErrors({})
        setEmail(member.email);
        setEditing(true);
        setModalOpen(true);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('role_id', selectedRoleId || "");
            if (image) {
                formData.append('image', image);
            }



            let response;
            if (editing && memberId) {
                response = await updatesAdmin({
                    id: memberId,
                    formData,
                }).unwrap();
                if (response?.status === 200) {
                    showAlert("Edit", "تم التعديل بنجاح");
                }
            } else {
                response = await addsAdmin(formData).unwrap();
                if (response?.status === 200) {
                    showAlert("Added", "تم الاضافة بنجاح");
                }
            }

            setModalOpen(false);
            clearForm();
        } catch (error: any) {
            if (error.status === 422) {
                const validationErrors = error.data.errors;
                setFieldErrors(validationErrors);
            } else {
                showAlert("error", "حدث خطأ غير معروف.");
            }
        }
    }
    const renderError = (field: string) => {
        return fieldErrors[field] ? (
            <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
                {fieldErrors[field]}
            </div>
        ) : null;
    };


    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setSelectedRoleId(null);
        setImage(null);
        setEditing(false);
        setMemberId(null);
        setFieldErrors({});
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
                    await deleteAdminById(id).unwrap();
                    setMemberList(MemberList.filter((member: any) => member.id !== id));
                    showAlert('Deleted', "تم المسح بنجاح");
                } else {

                    swal("لم يتم الحذف");
                }
            });
        } catch (error) {
            showAlert('Deleted', "هناك خطأ في الحذف");
        }
    };
    const addMember = () => {
        setModalOpen(true);
        clearForm();
        setEditing(false);
    };



    const toggleUserStatus = (user: any) => {
        const newStatus = user.active_status === "Active" ? "Inactive" : "Active";
        toggleActiveUserById({ admin_id: user.id })
            .then((response: any) => {
                setMemberList((prevList: any) =>
                    prevList.map((item: any) =>
                        item.id === user.id ? { ...item, active_status: newStatus } : item
                    )
                );

            })
            .catch((error) => {
            });
    };


    if (isLoading || isLoadingGet || isLoadingEdit || isLoadingPermissions) {
        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        );
    }
    if (!canRead('Admin')) {
        return <Error404 />;
    }
    return (
        <div>
            <div>
                <label htmlFor="positionId">الدور</label>
                {Role_idIsSuccess && (
                    <div className="flex justify-start mb-[20px] w-[250px] cursor-pointer">
                        <Select
                            placeholder="اختر"
                            onChange={(selectedOption1: any) => setSelectedRoleId1(selectedOption1?.value)}
                            className="w-[100%] rtl cursor-pointer"
                            value={roleOptions1.find((option: any) => option?.value === selectedRoleId1)}
                            options={roleOptions1}
                            isSearchable={false}
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">المتحكمـين</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            {canCreate('Admin') &&
                                <button type="button" className="btn btn-primary" onClick={addMember}>
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    اضافة متحـكم جديد
                                </button>
                            }
                        </div>

                    </div>
                    <div className="relative">
                        <input type="text" placeholder="البحث... " className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    <th>الايميل</th>
                                    <th>الدور</th>
                                    <th>الحاله</th>
                                    <th className="!text-center">التحكم</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems &&
                                    filteredItems.map((member: any, index: number) => {
                                        return (
                                            <tr key={member.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div className="flex items-center w-max">
                                                        <div className="w-max">
                                                            <img src={member?.image?.url} className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                        </div>
                                                        <div>{member?.name}</div>
                                                    </div>
                                                </td>
                                                <td>{member?.email}</td>
                                                <td>{member?.role?.name}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className={`btn btn-sm ${member.active_status === "Active" ? 'btn-outline-success' : 'btn-outline-warning'}`}
                                                        onClick={() => toggleUserStatus(member)}>
                                                        {member.active_status === "Active" ? 'نشط' : 'غير نشط'}
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className="flex gap-4 items-center justify-center">
                                                        {canUpdate('Admin') &&
                                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(member)}>
                                                                تعديل
                                                            </button>
                                                        }
                                                        {canDelete('Admin') &&
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
                                    <Dialog.Panel
                                        as="div"
                                        className="panel border-0 p-5 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark"
                                        style={{ maxHeight: '90vh' }}
                                    >
                                        <h5 className="font-bold text-lg">
                                            {editing ? 'تعديل' : 'إضافه'}
                                        </h5>
                                        <div
                                            className="p-5 overflow-y-auto"
                                            style={{ maxHeight: '75vh' }}
                                        >
                                            <form className="space-y-5" onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="name">الاسم</label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="الاسم"
                                                        className="form-input"
                                                        required
                                                    />
                                                    {renderError('name')}
                                                </div>
                                                <div>
                                                    <label htmlFor="email">الايميل</label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="الايميل"
                                                        className="form-input"
                                                        required
                                                    />
                                                    {renderError('email')}
                                                </div>
                                                <div>
                                                    <label htmlFor="password">{editing ? "الرمزالسري الجديد" : "الرمزالسري"}</label>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="الرمزالسري"
                                                        className="form-input"

                                                    />
                                                    {renderError('password')}
                                                </div>
                                                <div>
                                                    <label htmlFor="positionId">الدور</label>
                                                    {Role_idIsSuccess && (
                                                        <div className="flex justify-start mb-[20px]">
                                                            <Select
                                                                placeholder="اختر"
                                                                onChange={(selectedOption: any) => setSelectedRoleId(selectedOption?.value)}
                                                                className="w-[100%] rtl"
                                                                value={roleOptions.find((option: any) => option?.value === selectedRoleId)}
                                                                options={roleOptions}
                                                                isSearchable={false}
                                                            />
                                                        </div>
                                                    )}
                                                    {renderError('role_id')}
                                                </div>
                                                <div>
                                                    <label htmlFor="image">تحميل الصوره</label>
                                                    <input
                                                        id="image"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        className="form-input file:py-5 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                                                        required
                                                    />
                                                    {renderError('image')}
                                                </div>
                                                <div className="flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModalOpen(false)}>
                                                        الغاء
                                                    </button>

                                                    <button type="submit" disabled={isLoadingGet || isLoadingEdit} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                        Save
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

export default Admins;
