import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDeleteUserByIdMutation, useGetUsersQuery, useToggleActiveUserByIdMutation } from '../../api/UserSlice';
import { showAlert } from '../../components/Error';
import IconSearch from '../../components/Icon/IconSearch';
import ModalUsers from './modalUsers';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Loader from '../../components/Loader';
import { usePermissions } from '../../utils/permissions';
import Error404 from '../../components/Layouts/Error404';

const Users = () => {
    const [modal2, setModal2] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [value, setValue] = useState<any>('list');
    const [search, setSearch] = useState<any>('');
    const [contactList, setContactList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(contactList);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading: isLoadingGet, status }: any = useGetUsersQuery(currentPage);
    const [toggleActiveUserById] = useToggleActiveUserByIdMutation();
    const [deleteUserById, { isLoading, isSuccess }] = useDeleteUserByIdMutation();
    const { canRead,canDelete, canUpdate, isLoading:isLoadingPermissions } = usePermissions();



    const navigate = useNavigate();
    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);
    useEffect(() => {
        if (data) {
            setContactList(data.data);
        }
    }, [data]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Contacts'));
    });


    useEffect(() => {
        if (contactList) {
            const filteredData = contactList?.filter((item: any) => {
                const nameMatch = item?.name?.toLowerCase().includes(search.toLowerCase());
                const ageMatch = item?.age?.toString().includes(search.toLowerCase());
                const emailMatch = item?.email?.toLowerCase().includes(search.toLowerCase());
                const phoneMatch = item?.phone?.toLowerCase().includes(search.toLowerCase());
                return nameMatch || ageMatch || emailMatch || phoneMatch;
            });
            setFilteredItems(filteredData);
        }
    }, [search, contactList]);





    const deleteUser = (user: any = null) => {
        const userId = user.id;
        swal({
            title: "هل انت متأكد ؟؟",
            icon: "warning",
            buttons: ["الغاء", "حذف"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {

                setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
                deleteUserById(userId)
                    .unwrap()
                    .then(() => {
                        showAlert("Deleted", "تم المسح")
                    })
                    .catch((error: any) => {
                    });
            } else {

                swal("لم يتم الحذف");
            }
        });
    };

    const toggleUserStatus = (user: any) => {
        const newStatus = user.active_status === "Active" ? "Inactive" : "Active";
        toggleActiveUserById({ userId: user.id })
            .then((response) => {
                setContactList((prevList: any) =>
                    prevList.map((item: any) =>
                        item.id === user.id ? { ...item, active_status: newStatus } : item
                    )
                );
            })
            .catch((error) => {
            });
    };






    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    if ( isLoading|| isLoadingGet  || isLoadingPermissions)
        {

            return (
             <div className="flex justify-center items-center mt-[50%]">
               <Loader />
                </div>
            )
        }



        if (!canRead('User'))
            {
            return <Error404 />;
            }

    return (
        <div>

            <div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">المستخدميـن</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">

                    <div className="relative">
                        <input type="text" placeholder="البحث عن المستخدمين" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    <th>السـن</th>
                                    <th>البريد الألكتروني</th>
                                    <th>رقم التليفون</th>
                                    <th className="!text-center">التحكم</th>

                                </tr>
                            </thead>
                            <tbody>

                                {filteredItems.length === 0 ? <h1 className=' flex justify-center items-center m-10'>لا يوجد نتائج بحث</h1> : " "}

                                {filteredItems && filteredItems.map((contact: any, index: number) => (
                                    <tr key={contact?.id}>
                                        <td>{index + 1}</td>
                                        <td >
                                            <div className="flex items-center w-max">
                                                <div>{contact?.name}</div>
                                            </div>
                                        </td>
                                        <td>{contact?.age}</td>
                                        <td>{contact?.email}</td>
                                        <td className="whitespace-nowrap">{contact?.phone}</td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                            {canDelete('User') &&
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(contact)} disabled={isLoading}>
                                                    حذف
                                                </button>
                                                 }
                                            {canUpdate('User') &&
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm ${contact.active_status === "Active" ? 'btn-outline-success' : 'btn-outline-warning'}`}
                                                    onClick={() => toggleUserStatus(contact)}>
                                                    {contact.active_status === "Active" ? 'نشط' : 'غير نشط'}
                                                </button>
                                            }

                                                <button onClick={() => {
                                                    setModalData(contact);
                                                    setModal2(true);
                                                }} type="button" className="btn btn-sm btn-outline-dark" >
                                                    العرض
                                                </button>
                                            </div>
                                        </td>




                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <ModalUsers modalData={modalData} modal2={modal2} setModal2={setModal2} />

            <div className="flex justify-between mt-4 m-7">
                <button className="btn btn-outline-primary mx-2" onClick={handlePrevPage} disabled={currentPage === 1}>
                    السابق
                </button>
                <button className="btn btn-outline-primary mx-2" onClick={handleNextPage} disabled={data?.meta.current_page === data?.meta.last_page}>
                    التالي
                </button>
            </div>
        </div>
    );
};

export default Users;
