// import { useEffect, useState, ChangeEvent } from 'react';
// import swal from 'sweetalert';
// import MainPageCard from '../../../components/reusableComponents/MainPageCard';
// import { Loader } from '@mantine/core';
// import { GoLinkExternal } from "react-icons/go";
// import { useAddDonateMutation, useDeleteDonateByIdMutation, useGetDonationsQuery, useUpdateDonateMutation } from '../../../api/HomeSlice/DonationSlice';
// import Main_list from '../../../components/reusableComponents/Main_list';
// import { toast } from 'react-toastify';
// import ColumnChooser from '../../../components/reusableComponents/tabels';
// import DonationsModal from './DonationModal';

// export default function DonationRequests() {
//     const [page, setPage] = useState(1);
//     const [open, setOpen] = useState(false);
//     const [editData, setEditData] = useState<any>({});
//     const [modalOpen, setModalOpen] = useState(false);
//     const [donationId, setDonationId] = useState<number | null>(null);//@ts-ignore
//     const { data, isLoading, isSuccess } = useGetDonationsQuery(page);
//     const [addNew, { isLoading: isLoadingGet }] = useAddDonateMutation();
//     const [deleteNew] = useDeleteDonateByIdMutation();
//     const [updateNew, { isLoading: isLoadingEdit }] = useUpdateDonateMutation();
//     const [toastData, setToastData] = useState<any>({});
//     const [errors, setErrors] = useState<any>({});
//     const [colKeys, setColKeys] = useState<string[]>([]);
//     const [finalColsKeys, setFinalKeys] = useState<{ accessor: string; title: string }[]>([]);
//     const [loadingDelivery, setLoadingDelivery] = useState<{ [key: string]: boolean }>({});
//     const [userId, setUserId] = useState<string>('');
//     const [loadingStatus, setLoadingStatus] = useState<{ [key: string]: boolean }>({});

//     let keys: string[] = [];
//     useEffect(() => {
//         if (data?.data?.length > 0) {
//             keys = Object?.keys(data?.data[0]);
//             setColKeys(keys);
//             console.log(data);
//         }
//     }, [isSuccess]);

//     let cols: { accessor: string; title: string }[] = [];
//     useEffect(() => {
//         colKeys?.map((key: any) => {
//             if (key === "files") {
//                 return;
//             }

//             const formattedKey = key
//                 .replace(/_/g, ' ')
//                 .split(' ')
//                 .map((word: string) => word?.charAt(0).toUpperCase() + word?.slice(1))
//                 .join(' ');
//             cols?.push({ accessor: key, title: formattedKey });
//         });
//         if (cols?.length > 0) {
//             cols?.push({ accessor: 'action', title: 'الإجراءات' });
//         }
//         setFinalKeys(cols);
//     }, [colKeys, isSuccess]);

//     const deleteSubmitHandler = async (id: string) => {
//         swal({
//             title: 'هل أنت متأكد أنك تريد الحذف؟',
//             icon: 'error',
//             buttons: ['إلغاء', 'حذف'],
//             dangerMode: true,
//         }).then(async (willDelete: any) => {
//             if (willDelete) {
//                 try {
//                     const data = await deleteNew(id);
//                     //@ts-ignore
//                     if (data?.error?.data?.status === 400) {
//                         //@ts-ignore
//                         toast.error(data?.error?.data?.message, {});
//                         setToastData({});
//                     }
//                     //@ts-ignore
//                     if (data?.data.status === 200) {
//                         //@ts-ignore
//                         toast.success('تم الحذف بنجاح', {});
//                         setToastData({});
//                     }
//                 } catch (error) {
//                     //@ts-ignore
//                     toast.error(error?.data?.errors?.message?.[0] || 'حدث خطأ ما', {});
//                 }
//             } else {
//                 swal('لم يتم الحذف');
//             }
//         });
//         setErrors({});
//     };

//     const viewHandler = (id: string) => {
//         setModalOpen(true);//@ts-ignore
//         setDonationId(id);
//     };

//     const editHandler = (data: any) => {
//         setEditData(data);
//         setDonationId(data.id); // Ensure donationId is set correctly
//         setModalOpen(true);
//     };

//     const updateHandler = async (id: string, status: string) => {
//         setModalOpen(true);//@ts-ignore
//         setDonationId(id);
//     };

//     const updateDeliveryHandler = async (id: string, status: boolean) => {
//     };

//     if (isLoading) {
//         return <div><Loader /></div>;
//     }

//     return (
//         <Main_list title="التبرعات">
//             <MainPageCard>
//                 <ColumnChooser
//                     isLoading={loadingStatus}
//                     isLoadingDelivery={loadingDelivery}
//                     setPage={setPage}
//                     page={page}
//                     pagination={{
//                         total: data?.meta?.total,
//                         last_page: data?.meta.last_page,
//                         per_page: data?.meta.per_page,
//                         current_page: data?.meta?.current_page,
//                     }}
//                     onUpdateDelivery={updateDeliveryHandler}
//                     Enabel_edit={true}
//                     Accept_button={false}
//                     Enabel_view={false}
//                     Reject_button={false}
//                     Enabel_delete={true}
//                     TableBody={data?.data?.length > 0 ? data?.data : []}
//                     tabelHead={data?.data?.length > 0 ? [
//                         { accessor: "id", title: "الرمز" },
//                         {
//                             accessor: "image.url", title: "الصورة", render: ({ image }: any) => (
//                                 <img src={image.url} alt={image.name} className="w-16 rounded h-16 object-cover" />
//                             )
//                         },
//                         { accessor: "name", title: "الاسم" },
//                         { accessor: "destination_name", title: "جهة التبرع" },
//                         { accessor: "description", title: "الوصف" },
//                         { accessor: "action", title: "الإجراءات" }
//                     ] : []
//                     }
//                     Chcekbox={false}
//                     Page_Add={false}
//                     showAddButton={true}
//                     onDelete={deleteSubmitHandler}
//                     onView={viewHandler}
//                     onUpdate={updateHandler}
//                     onEdit={editHandler}
//                     openCloseModal={() => setModalOpen(true)}
//                 />
//                 <DonationsModal
//                     modalOpen={modalOpen}
//                     setModalOpen={setModalOpen}
//                     donationId={donationId}
//                     setDonationId={setDonationId}
//                     isLoadingGet={isLoadingGet}
//                     isLoadingEdit={isLoadingEdit}
//                 />
//             </MainPageCard>
//         </Main_list>
//     );
// }


import { useEffect, useState, ChangeEvent } from 'react';
import swal from 'sweetalert';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import { Loader } from '@mantine/core';
import { GoLinkExternal } from "react-icons/go";
import { useAddDonateMutation, useDeleteDonateByIdMutation, useGetDonationsQuery, useUpdateDonateMutation } from '../../../api/HomeSlice/DonationSlice';
import Main_list from '../../../components/reusableComponents/Main_list';
import { toast } from 'react-toastify';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import DonationsModal from './DonationModal';

export default function DonationRequests() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>({});
    const [modalOpen, setModalOpen] = useState(false);
    const [donationId, setDonationId] = useState<number | null>(null);//@ts-ignore
    const { data, isLoading, isSuccess } = useGetDonationsQuery(page);
    const [addNew, { isLoading: isLoadingGet }] = useAddDonateMutation();
    const [deleteNew] = useDeleteDonateByIdMutation();
    const [updateNew, { isLoading: isLoadingEdit }] = useUpdateDonateMutation();
    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [colKeys, setColKeys] = useState<string[]>([]);
    const [finalColsKeys, setFinalKeys] = useState<{ accessor: string; title: string }[]>([]);
    const [loadingDelivery, setLoadingDelivery] = useState<{ [key: string]: boolean }>({});
    const [userId, setUserId] = useState<string>('');
    const [loadingStatus, setLoadingStatus] = useState<{ [key: string]: boolean }>({});

    let keys: string[] = [];
    useEffect(() => {
        if (data?.data?.length > 0) {
            keys = Object?.keys(data?.data[0]);
            setColKeys(keys);
            console.log(data);
        }
    }, [isSuccess]);

    let cols: { accessor: string; title: string }[] = [];
    useEffect(() => {
        colKeys?.map((key: any) => {
            if (key === "files") {
                return;
            }

            const formattedKey = key
                .replace(/_/g, ' ')
                .split(' ')
                .map((word: string) => word?.charAt(0).toUpperCase() + word?.slice(1))
                .join(' ');
            cols?.push({ accessor: key, title: formattedKey });
        });
        if (cols?.length > 0) {
            cols?.push({ accessor: 'action', title: 'الإجراءات' });
        }
        setFinalKeys(cols);
    }, [colKeys, isSuccess]);

    const deleteSubmitHandler = async (id: string) => {
        swal({
            title: 'هل أنت متأكد أنك تريد الحذف؟',
            icon: 'error',
            buttons: ['إلغاء', 'حذف'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                try {
                    const data = await deleteNew(id);
                    //@ts-ignore
                    if (data?.error?.data?.status === 400) {
                        //@ts-ignore
                        toast.error(data?.error?.data?.message, {});
                        setToastData({});
                    }
                    //@ts-ignore
                    if (data?.data.status === 200) {
                        //@ts-ignore
                        toast.success('تم الحذف بنجاح', {});
                        setToastData({});
                    }
                } catch (error) {
                    //@ts-ignore
                    toast.error(error?.data?.errors?.message?.[0] || 'حدث خطأ ما', {});
                }
            } else {
                swal('لم يتم الحذف');
            }
        });
        setErrors({});
    };

    const viewHandler = (id: string) => {
        setModalOpen(true);//@ts-ignore
        setDonationId(id);
    };

    const editHandler = (data: any) => {
        setEditData(data);
        setDonationId(data.id); // Ensure donationId is set correctly
        setModalOpen(true);
    };

    const updateHandler = async (id: string, status: string) => {
        setModalOpen(true);//@ts-ignore
        setDonationId(id);
    };

    const updateDeliveryHandler = async (id: string, status: boolean) => {
    };

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <Main_list title="التبرعات">
            <MainPageCard>
                <ColumnChooser
                    isLoading={loadingStatus}
                    isLoadingDelivery={loadingDelivery}
                    setPage={setPage}
                    page={page}
                    pagination={{
                        total: data?.meta?.total,
                        last_page: data?.meta.last_page,
                        per_page: data?.meta.per_page,
                        current_page: data?.meta?.current_page,
                    }}
                    onUpdateDelivery={updateDeliveryHandler}
                    Enabel_edit={true}
                    Accept_button={false}
                    Enabel_view={false}
                    Reject_button={false}
                    Enabel_delete={true}
                    TableBody={data?.data?.length > 0 ? data?.data : []}
                    tabelHead={data?.data?.length > 0 ? [
                        { accessor: "id", title: "الرمز" },
                        {
                            accessor: "image.url", title: "الصورة", render: ({ image }: any) => (
                                <img src={image.url} alt={image.name} className="w-16 rounded h-16 object-cover" />
                            )
                        },
                        { accessor: "name", title: "الاسم" },
                        { accessor: "destination_name", title: "جهة التبرع" },
                        { accessor: "description", title: "الوصف" },
                        { accessor: "action", title: "الإجراءات" }
                    ] : []
                    }
                    Chcekbox={false}
                    Page_Add={false}
                    showAddButton={true}
                    onDelete={deleteSubmitHandler}
                    onView={viewHandler}
                    onUpdate={updateHandler}
                    onEdit={editHandler}
                    openCloseModal={() => setModalOpen(true)}
                />
                <DonationsModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    donationId={donationId}
                    setDonationId={setDonationId}
                    isLoadingGet={isLoadingGet}
                    isLoadingEdit={isLoadingEdit}
                />
            </MainPageCard>
        </Main_list>
    );
}
