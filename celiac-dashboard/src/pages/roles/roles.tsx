import { Dialog, Transition } from '@headlessui/react';
import 'flatpickr/dist/flatpickr.css';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useAddCommitteeMemberMutation,
    useDeleteCommitteeMemberByIdMutation,
    useGetCommitteeMembersQuery,
    useGetCommitteesQuery,
    useGetPermissionsQuery,
    useGetPositionsQuery,
    useUpdateCommitteeMemberMutation,
} from '../../api/AboutUsSlice/CommitteesSlice';
import { FaAngleDown } from "react-icons/fa";

import { useAddOrganizationMemberMutation, useDeleteOrganizationMemberByIdMutation, useUpdateOrganizationMemberMutation } from '../../api/AboutUsSlice/OrganizationChartSlice';
import { showAlert } from '../../components/Error';
import IconListCheck from '../../components/Icon/IconListCheck';
import IconSearch from '../../components/Icon/IconSearch';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../types/type';
import Select from 'react-select';
import Loader from '../../components/Loader';
import Dropdown from '../../components/Dropdown';

const Roles = () => {
    // stateHooks
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState('');
    const [positionId, setPositionId] = useState('1');

    const [memberId, setMemberId] = useState<number | null>(null);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>('list');
    const [addUpdataCommiteValue, setUpdataCommiteValue] = useState(`1`);
    const [MemberList, setMemberList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(MemberList);
    const [currentMemberCommitteeType, setCurrentMemberCommitteeType] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [memberValue, setMemberValue] = useState<any>('');
    //   ...
    const { data: Permissions, isSuccess: permissionsIsSuccess } = useGetPermissionsQuery();
    const { data: committees, isSuccess: isCommitteeSuccess } = useGetCommitteesQuery();
    const { data: positions, isSuccess: position_idIsSuccess } = useGetPositionsQuery();
    const [deleteCommitteeMemberById] = useDeleteCommitteeMemberByIdMutation();
    const { data } = useGetCommitteeMembersQuery({ committeeId: memberValue });
    const [addCommitteeMember] = useAddCommitteeMemberMutation();
    const [addOrganizationMember, { isLoading: isLoadingGet }] = useAddOrganizationMemberMutation();
    const [deleteMemberById] = useDeleteOrganizationMemberByIdMutation();
    const [updateCommitteeMember, { isLoading: isLoadingEdit }] = useUpdateCommitteeMemberMutation();
    const [filteredPermissions, setFilteredPermissions] = useState([]);

    useEffect(() => {
        if (data) {
            setMemberList(data?.data);
        }
    }, [data]);

    useEffect(() => {
        setFilteredItems(() => {
            return MemberList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
        });
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
        setCurrentMemberCommitteeType({ value: member?.committee?.id, label: member?.committee?.name });
        setUpdataCommiteValue(member?.committee?.id);
        setMemberId(member.id);
        setName(member.name);
        setPositionId(member.position_id);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            // !editing && formData.append('position_id', positionId);
            if (image) {
                formData.append('image', image);
            }

            if (editing && memberId) {
                // formData.append = 'PUT';
                formData.append('_method', 'PUT');
                setShowLoader(true);
                const data = await updateCommitteeMember({
                    committeeId: addUpdataCommiteValue,
                    memberId: memberId,
                    formData: formData,
                });
                setShowLoader(false);
                //@ts-ignore
                if (data?.data?.status === 200) {
                    showAlert('Edit', 'تم التعديل بنجاح');
                    setModalOpen(false);
                    clearForm();
                }
            } else {
                setShowLoader(true);
                const data = await addCommitteeMember({ committeeId: addUpdataCommiteValue, formData });
                setShowLoader(false);
                //@ts-ignore
                if (data?.data?.status === 200) {
                    showAlert('Added', 'تم الاضافه بنجاح');
                    setModalOpen(false);
                    clearForm();
                }
            }
        } catch (error) {
            // console.error('Error:', error);
        }
    };
    const clearForm = () => {
        setName('');
        setPositionId('1');
        setImage(null);
        setEditing(false);
        setMemberId(null);
    };

    const deleteMember = async (id: any) => {
        try {
            setShowLoader(true);
            const data = await deleteCommitteeMemberById(id);
            setShowLoader(false);
            //@ts-ignore
            if (data?.data?.error?.status === 422) {
                //@ts-ignore
                showAlert('error', data?.error?.data?.message);
            }
            //@ts-ignore
            if (data?.data?.status === 200) {
                setMemberList(MemberList.filter((member: any) => member.id !== id));
                showAlert('error', 'تم الحذف بنجاح');
            }
        } catch (error) {
            // console.error('Error deleting user:', error);
        }
    };

    const addMember = () => {
        setModalOpen(true);
        clearForm();
        setEditing(false);
    };

    let options: any = [];
    // if (permissionsIsSuccess) {
    //     options = Object.entries(Permissions).forEach(([key, value]) => {
    //         return { value: key, label: key };
    //     });
    // }
    useEffect(() => {
    }, [memberValue, permissionsIsSuccess])
    if (permissionsIsSuccess) {
        options = Object.entries(Permissions).map(([key, value]) => {
            return { value: key, label: key };
        });
    }
    // options = permissionsIsSuccess && Permissions?.forea((Permission: any) => {
    //     // return { value: Permission.Object.key(), label: Permission.Object.key() };
    //     // return { value: `Permission.key`, label: 'Permission.key' };
    // });
    let positionOptions: any = [];

    positionOptions = positions?.data?.map((position: any) => {
        return { value: `${position.id}`, label: position.name };
    });
    useEffect(() => {
        if (memberValue) {
            const filteredPermissions = Permissions && Object.entries(Permissions).filter((permission: any) => {
                return permission[0] == memberValue;
            });

            setFilteredPermissions(filteredPermissions)
        }
        else {
            Permissions && setFilteredPermissions(Permissions)
        }
    }, [Permissions, memberValue]);
    return (
        <div>
            {showLoader && <Loader />}

            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">اعضاء اللجنه</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={addMember}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                اضافه عضو جديد
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        {isCommitteeSuccess && (
                            <div className="flex justify-center">
                                <Select onChange={(e) => setMemberValue(e.value)} className="w-[300px] rtl" defaultValue={options[0]} options={options} isSearchable={false} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2 my-4">
                {permissionsIsSuccess && Object.entries(filteredPermissions).map((value) => (
                    <div className="flex gap-8 flex-col w-full border shadow p-[20px] rounded-[6px]">
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col">
                                <p>{value[0]}</p>
                                <h3 className='text-[16px] font-bold text-[#001F15]'>test head</h3>
                            </div>
                            <div className="flex items-center justify-center -space-x-4 rtl:space-x-reverse text-white">
                                <span className="flex justify-center items-center w-8 h-8 text-center rounded-full object-cover bg-info text-base ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:hover:translate-y-2">
                                    AG
                                </span>
                                <span className="flex justify-center items-center w-8 h-8 text-center rounded-full object-cover bg-info text-base ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:hover:translate-y-2">
                                    AG
                                </span>
                                <span className="flex justify-center items-center w-8 h-8 text-center rounded-full object-cover bg-info text-base ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:hover:translate-y-2">
                                    AG
                                </span>
                                <span className="flex justify-center items-center w-8 h-8 text-center rounded-full object-cover bg-info text-base ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:hover:translate-y-2">
                                    AG
                                </span>
                                <span className="flex justify-center items-center w-8 h-8 text-center rounded-full object-cover bg-info text-base ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:hover:translate-y-2">
                                    AG
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between  w-full">
                            <p>View Permissions</p>
                            <div className="dropdown w-max">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="btn btn-primary dropdown-toggle"
                                    button={
                                        <>
                                            <span>
                                                <FaAngleDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[170px]">
                                        <li>
                                            <button type="button">
                                                Action
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                Another action
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                Something else here
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                Separated link
                                            </button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {value === 'list' && (
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>الاسم</th>
                                    <th>نوع اللجنه</th>
                                    <th className="!text-center">اجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
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
                                                <td>{member?.committee?.name}</td>
                                                <td>
                                                    <div className="flex gap-4 items-center justify-center">
                                                        <button disabled={isLoadingEdit} type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(member)}>
                                                            تعديل
                                                        </button>
                                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteMember(member.id)}>
                                                            حذف
                                                        </button>
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
                                        <h5 className="font-bold text-lg">{editing ? 'تعديل عضو ' : 'اضافه عضو'}</h5>
                                        <div className="p-5">
                                            <form className="space-y-5" onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="name">الاسم كاملا </label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="ادخل الاسم كاملا"
                                                        className="form-input"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="positionId">نوع اللجنه</label>
                                                    {isCommitteeSuccess && (
                                                        <div className="flex justify-start mb-[20px]">
                                                            <Select
                                                                onChange={(e) => setUpdataCommiteValue(e.value)}
                                                                className=" w-[100%] rtl"
                                                                defaultValue={editing ? currentMemberCommitteeType : options[0]}
                                                                options={options}
                                                                isSearchable={false}
                                                            />
                                                        </div>
                                                    )}
                                                    {/* </div> */}

                                                    {/* <div>
                                                        <label htmlFor="positionId"> المنصب</label>
                                                        {position_idIsSuccess && (
                                                            <div className="flex justify-start mb-[20px]">
                                                                <Select
                                                                    onChange={(e) => setPositionId(e.value)}
                                                                    className=" w-[100%] rtl"
                                                                    defaultValue={positionOptions[0]}
                                                                    options={positionOptions}
                                                                    isSearchable={false}
                                                                />
                                                            </div>
                                                        )}
                                                    </div> */}
                                                </div>
                                                <div>
                                                    <label htmlFor="image"> ارفاق صوره </label>
                                                    <input
                                                        id="image"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        className="form-input file:py-5 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                        required={!editing}
                                                    />
                                                </div>
                                                <div className="flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModalOpen(false)}>
                                                        الغاء
                                                    </button>

                                                    <button type="submit" disabled={isLoadingEdit} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                        حفظ
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

export default Roles;
