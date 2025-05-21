import { Dialog, Transition } from '@headlessui/react';
// import 'flatpickr/dist/flatpickr.css';
import { Fragment, useEffect, useState } from 'react';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { useAddRoleMutation, useDeleteRoleByIdMutation, useGetPermissionsQuery, useGetRolesQuery, useToggleActiveRoleByIdMutation, useUpdateRoleByIdMutation } from '../../../api/Admins/RolesSlice';
import Dropdown from '../../../components/Dropdown';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import Loader from '../../../components/Loader';
import { IRootState } from '../../../store';
import Admins from '../../admins/admins';
import { showAlert } from '../../../components/Error';
import swal from 'sweetalert';
import { usePermissions } from '../../../utils/permissions';
import Error404 from '../../../components/Layouts/Error404';

interface Permission {
    id: number;
    name: string;
    action: string;
}



function Roles() {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass === 'rtl');
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [viewOnly, setViewOnly] = useState(false);
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState<{ [key: string]: boolean }>({});
    const [selectAll, setSelectAll] = useState<{ [key: string]: boolean }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [memberId, setMemberId] = useState<number | null>(null);
    const [filteredItems, setFilteredItems] = useState<any>([]);
    const { data: RolesData, isLoading, refetch } = useGetRolesQuery(currentPage);
    const { data: permissionsData } = useGetPermissionsQuery();
    const [addRoleMutation, { isLoading: isLoadingAddRole }]: any = useAddRoleMutation();
    const [updateRolebyIdMutation, { isLoading: isLoadingUpdateRole }] = useUpdateRoleByIdMutation();
    const [deleteRoleById]: any = useDeleteRoleByIdMutation()
    const [toggleActiveUserById] = useToggleActiveRoleByIdMutation()
    const { canCreate, canRead, canUpdate, canDelete, isLoading: isLoadingPermissions } = usePermissions();

    useEffect(() => {
        if (RolesData) {
            setFilteredItems(RolesData.data);
        }
    }, [RolesData]);


    useEffect(() => {

        if (permissionsData) {
            Object.keys(permissionsData).forEach((permissionType) => {
                updateSelectAllState(permissionType);
            });
        }
    }, [permissions]);


    const handleNextPage = () => setCurrentPage(currentPage + 1);
    const handlePrevPage = () => setCurrentPage(currentPage - 1);



    const handlePermissionChange = (permissionName: string, checked: boolean) => {
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [permissionName]: checked,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedPermissions = Object.keys(permissions).filter((key) => permissions[key]);
        if (!name.trim()) {
            setFieldErrors({ name: 'الاسم مطلوب' });
            showAlert('error', 'الاسم مطلوب.');
            return;
        }

        if (selectedPermissions.length === 0) {
            setFieldErrors({ role_permissions: 'الصلاحيات مطلوبة' });
            showAlert('error', 'الصلاحيات مطلوبة.');
            return;
        }
        const data = {
            name: name.trim(),
            role_permissions: selectedPermissions,
        };

        try {
            if (editing && memberId) {

                const updatedRole = await updateRolebyIdMutation({
                    id: memberId,
                    data,
                }).unwrap();

                if (updatedRole?.status === 200) {
                    refetch()
                    showAlert("Edit", "تم التغيير بنجاح");
                }
            } else {

                const addedRole = await addRoleMutation(data).unwrap();

                if (addedRole?.status === 200) {
                    refetch()
                    showAlert("Added", "تم الاضافه بنجاح");
                }
            }
            setModalOpen(false);
            clearForm();
        } catch (error: any) {
            console.error('Error:', error);

            if (error.status === 422) {
                const validationErrors = error.data.errors;
                setFieldErrors(validationErrors);
                showAlert("error", "هناك خطأ");
            } else {
                showAlert("error", "هناك خطأ غير معروف.");
            }
        }
    };

    const renderError = (field: string) => {
        return fieldErrors[field] ? (
            <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
                {fieldErrors[field]}
            </div>
        ) : null;
    };

    // for select all
    const handleSelectAllChange = (permissionType: string, Checked: boolean) => {
        const updatedPermissions = { ...permissions };
        permissionsData[permissionType].forEach((permission: Permission) => {
            updatedPermissions[permission.name] = Checked;
        });
        setPermissions(updatedPermissions);
        setSelectAll((prevSelectAll) => ({
            ...prevSelectAll,
            [permissionType]: Checked,
        }));
    };

    const updateSelectAllState = (permissionType: string) => {
        const allSelected = permissionsData[permissionType].every(
            (permission: Permission) => permissions[permission.name]
        );
        setSelectAll((prevSelectAll) => ({
            ...prevSelectAll,
            [permissionType]: allSelected,
        }));
    };

    const handleEdit = (role: any, view?: string) => {

        setMemberId(role.id);
        setName(role.name);
        setEditing(true);
        setViewOnly(view === 'view');
        setFieldErrors({})

        const updatedPermissions: { [key: string]: boolean } = {};
        Object.keys(role.permissions).forEach((permissionType) => {
            role.permissions[permissionType].forEach((permission: string) => {
                updatedPermissions[permission] = true;
            });
        });
        setPermissions(updatedPermissions);
        setModalOpen(true);
    };

    const addRole = () => {
        setModalOpen(true);
        clearForm();
        setEditing(false);
        setViewOnly(false);
    };

    const clearForm = () => {
        setName('');
        setMemberId(null);
        setPermissions({});
        setFieldErrors({})
    };

    if (!RolesData) {
        return <p>No data available</p>;
    }

    const toggleUserStatus = (user: any) => {
        const newStatus = user.is_active === 1 ? 0 : 1;
        toggleActiveUserById({ role_id: user.id })
            .then((response: any) => {
                setFilteredItems((prevList: any) =>
                    prevList.map((item: any) =>
                        item.id === user.id ? { ...item, is_active: newStatus } : item
                    )
                );
                if (response?.status === 200) {
                    refetch()
                }
            })
            .catch((error) => {
            });
    };

    const deleteRole = async (id: any) => {
        try {
            swal({
                title: "هل انت متأكد ؟؟",
                icon: "warning",
                buttons: ["الغاء", "حذف"],
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                    await deleteRoleById(id).unwrap();
                    setFilteredItems(filteredItems.filter((role: any) => role.id !== id));
                    showAlert('Deleted', "تم المسح بنجاح");
                } else {
                    swal("لم يتم الحذف");
                }
            });
        } catch (error) {
            showAlert('Deleted', "هناك خطأ في الحذف");
        }
    };

    if (isLoading || isLoadingAddRole || isLoadingUpdateRole || isLoadingPermissions) {
        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        );
    }
    if (!canRead('Role')) {
        return <Error404 />;
    }

    return (
        <div>
            <div className="flex gap-3">
                <div>
                    {canCreate('Role') &&
                        <button type="button" className="btn btn-primary" onClick={addRole}>
                            <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                            اضافة دور جديد
                        </button>
                    }
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 my-4">
                {filteredItems.map((role: any) => (
                    <div key={role.id} className="flex gap-8 flex-col w-full border shadow-lg p-[20px] rounded-[6px]">
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col">
                                <div>
                                    الإجمالي <span className="mx-1">{role.users_count}</span>
                                    <span className="mx-1">مستخدمين الدور</span>


                                </div>
                                <h3 className="text-[16px] font-bold text-[#001F15]">{role.name}</h3>
                            </div>
                            <div className="flex items-center justify-center -space-x-4 rtl:space-x-reverse text-white">
                                {role.users &&
                                    role.users.slice(0, 3).map((user: any, index: number) => (
                                        <div


                                        >
                                            <img key={index} src={user?.avatar?.url} className="flex justify-center items-center w-8 h-8 text-center rounded-full object-cover bg-info text-base ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:translate-y-2" />
                                        </div>
                                    ))}
                                {role.users && role.users.length > 3 && (
                                    <span className="flex justify-center items-center w-8 h-8 text-center rounded-full object-cover bg-info text-base ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:translate-y-2">
                                        +{role.users.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between w-full">
                            {canRead('Role') &&
                                <p className="text-[#4361EE] cursor-pointer " onClick={() => handleEdit(role, "view")} >عرض سماحية الدور</p>
                            }
                            <div className="dropdown w-max">
                                <Dropdown placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<PiDotsThreeOutlineFill />}>
                                    <ul className="!min-w-[170px]">
                                        <li>
                                            {canUpdate('Role') &&
                                                <button type="button" onClick={() => handleEdit(role)}>
                                                    تعديل
                                                </button>
                                            }
                                        </li>
                                        <li>
                                            {canUpdate('Role') &&
                                                <button type="button"
                                                    className={`rounded-3xl text-end ${role.is_active === 1 ? 'bg-blue-400' : 'bg-blue-500'}`}
                                                    onClick={() => toggleUserStatus(role)}>
                                                    {role.is_active === 1 ? 'نشط' : 'غير نشط'}
                                                </button>
                                            }
                                        </li>
                                        <li>
                                            {canDelete('Role') &&
                                                <button type="button" onClick={() => deleteRole(role.id)}>حذف</button>
                                            }
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 m-7">
                <button className="btn btn-outline-primary mx-2" onClick={handlePrevPage} disabled={currentPage === 1}>
                    السابق
                </button>
                <button className="btn btn-outline-primary mx-2" onClick={handleNextPage} disabled={RolesData?.meta.current_page === RolesData?.meta.last_page}>
                    التالي
                </button>
            </div>
            <Admins />

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
                                    <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-x-auto w-full my-8 text-black dark:text-white-dark">
                                        {viewOnly ? <h5 className="font-bold text-lg">عرض سماحية الدور</h5> : <h5 className="font-bold text-lg">{editing ? ' تعديل' : 'إضافة دور'}</h5>}
                                        <div className="p-5">
                                            <form className="space-y-5" onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="name">اسم الدور</label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="اسم الدور"
                                                        className="form-input"
                                                        required
                                                        disabled={viewOnly}
                                                    />
                                                    {renderError('name')}
                                                </div>
                                                {permissionsData &&
                                                    Object.keys(permissionsData).map((permissionType) => (
                                                        <div key={permissionType}>
                                                            <div className="flex justify-between">
                                                                <div className="flex justify-center items-center gap-2">
                                                                    <div>أختر الكل</div>
                                                                    <input
                                                                        type="checkbox"
                                                                        className="size-4 rounded  border-blue-400 cursor-pointer form-checkbox outline-primary peer"
                                                                        id={`selectAll-${permissionType}`}
                                                                        checked={selectAll[permissionType] || false}
                                                                        onChange={(e) => handleSelectAllChange(permissionType, e.target.checked)}
                                                                        disabled={viewOnly}
                                                                    />
                                                                    {renderError('role_permissions')}
                                                                </div>
                                                                <div className="flex justify-center items-center gap-2">
                                                                    <div>{permissionType}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                {permissionsData[permissionType].map((permission: any) => (
                                                                    <div key={permission.id} className="flex justify-between items-center">
                                                                        <div className="flex items-center gap-2 mt-2">
                                                                            <p className="mx-2 my-0">{permission.action}</p>

                                                                            <input
                                                                                type="checkbox"
                                                                                color='black'
                                                                                className="size-4 rounded border-blue-400  cursor-pointer form-checkbox peer"
                                                                                id={`permission-${permission.id}`}
                                                                                checked={permissions[permission.name] || false}
                                                                                onChange={(e) => {
                                                                                    handlePermissionChange(permission.name, e.target.checked);
                                                                                    updateSelectAllState(permissionType);
                                                                                }}
                                                                                defaultChecked
                                                                                disabled={viewOnly}
                                                                            />
                                                                            {renderError('permissionType')}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                <div className="flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModalOpen(false)}>
                                                        الغاء
                                                    </button>
                                                    {!viewOnly && (
                                                        <button type="submit" disabled={isLoadingUpdateRole || isLoadingAddRole} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                            تأكيد
                                                        </button>
                                                    )}
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
}

export default Roles;
