import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetContactFeedBackQuery ,useDeleteContactByIdMutation } from '../../../api/HomeSlice/ContactSlice';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconListCheck from '../../../components/Icon/IconListCheck';
import IconSearch from '../../../components/Icon/IconSearch';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Loader from '../../../components/Loader';

const ContactFeedBack = () => {
    const [value, setValue] = useState<any>('list');
    const [search, setSearch] = useState<any>('');
    const [contactList, setContactList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(contactList);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    const { data, status,isLoading }: any = useGetContactFeedBackQuery(currentPage);
    const[deleteNew]=useDeleteContactByIdMutation()



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
                const emailMatch = item?.email?.toLowerCase().includes(search.toLowerCase());
                const phoneMatch = item?.phone?.toLowerCase().includes(search.toLowerCase());
                const messageMatch = item?.message?.toLowerCase().includes(search.toLowerCase());
                return nameMatch || emailMatch || phoneMatch || messageMatch
            });
            setFilteredItems(filteredData);
        }
    }, [search, contactList]);

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
                        setContactList(contactList.filter((member: any) => member.id !== id));
                    } catch (error) {
                        // console.error('Error deleting news:', error);
                    }
                } else {
                    swal("لم يتم الحذف", {
                        icon: "info",
                    });
                }
            });
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };


    if (isLoading ) {
        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        );
    }
    return (
        <div>
            <div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">كل الرسائـل</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                    </div>
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
                                    <th>الاسم</th>
                                    <th>البريد الاكتروني</th>
                                    <th>رقم التليفون</th>
                                    <th>محتوي الرساله</th>
                                    <th>التحكم</th>
                                </tr>
                            </thead>
                            <tbody>
                            {filteredItems.length === 0 ? <h1 className=' flex justify-center items-center m-10'>لا يوجد نتائج بحث</h1> : " "}
                                {filteredItems && filteredItems.map((contact: any) => (
                                    <tr key={contact?.id}>

                                        <td className='cursor-pointer'>
                                            <div className="flex items-center w-max">
                                                <div>{contact?.name}</div>
                                            </div>
                                        </td>
                                        <td>{contact?.email}</td>

                                        <td className="whitespace-nowrap">{contact?.phone}</td>
                                        <td>{contact?.message}</td>
                                         <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => HandleDeleteNew(contact.id)}>
                                                حذف
                                                </button>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


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

export default ContactFeedBack;
