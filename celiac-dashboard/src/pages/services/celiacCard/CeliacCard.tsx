import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useAcceptRejectCeliacCardMutation, useGetCeliacCardsQuery } from '../../../api/serveces';
import Main_list from '../../../components/reusableComponents/Main_list';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import Loader from '../../../components/Loader';
import CardOwnerModal from './card-owner-modal';

export default function CeliacCard() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    const [modal2, setModal2] = useState(false);
    const [userId, setUserId] = useState<string>('');
    const { refetch, data, isLoading, isSuccess } = useGetCeliacCardsQuery({ page });
    const [acceptRejectCeliacCard, { isLoading: updateLoading }] = useAcceptRejectCeliacCardMutation();

    useEffect(() => {
        refetch();
    }, [page]);

    const columns = [
        { accessor: "id", title: "الرمز" },
        { accessor: "created_at", title: "تاريخ الإنشاء" },
        { accessor: "full_name", title: "الاسم الكامل" },
        { accessor: "phone", title: "الهاتف" },
        { accessor: "email", title: "البريد الإلكتروني" },
        { accessor: "dob", title: "تاريخ الميلاد" },
        { accessor: "is_saudi", title: "هل سعودي" },
        { accessor: "residency_number", title: "رقم الإقامة" },
        { accessor: "national_id", title: "الرقم الوطني" },
        { accessor: "address", title: "العنوان" },
        { accessor: "gender", title: "الجنس" },
        { accessor: "status", title: "الحالة" },
        { accessor: "action", title: "الإجراءات" }
    ];

    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [colKeys, setColKeys] = useState<string[]>([]);
    const [finslColsKeys, setFinalKeys] = useState<{ accessor: string; title: string }[]>([]);
    const [loadingDelivery, setLoadingDelivery] = useState<{ [key: string]: boolean }>({});
    const [loadingStatus, setLoadingStatus] = useState<{ [key: string]: boolean }>({});

    let keys: string[] = [];
    useEffect(() => {
        if (data?.data?.length > 0) {
            keys = Object?.keys(data?.data[0]);
            setColKeys(keys);
        }
    }, [isSuccess]);

    let colss: { accessor: string; title: string }[] = [];
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
            colss?.push({ accessor: key, title: formattedKey });
        });
        if (colss?.length > 0) {
            colss?.push({ accessor: 'action', title: 'الإجراءات' });
        }
        setFinalKeys(colss);
    }, [colKeys, isSuccess]);

    const deleteSubmitHandler = async (id: string) => {
        swal({
            title: 'هل أنت متأكد أنك تريد حذف المسؤول؟',
            icon: 'error',
            buttons: ['إلغاء', 'حذف'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                // const data = await deleteCategory(id);
                //@ts-ignore
                if (data?.error?.data?.status === 400) {
                    //@ts-ignore
                    toast.error(data?.error?.data?.message, {});
                    setToastData({});
                }
                //@ts-ignore
                if (data?.data.status === 200) {
                    //@ts-ignore
                    showAlert('تمت الإضافة', data?.data.response?.message);
                    setToastData({});
                }
                // setToastData(data);
            } else {
                swal('لم يتم الحذف');
            }
        });

        // if (data?.error) setToastData(data);
        setErrors({});
    };

    const viewHander = (id: string) => {
        setModal2(true);
        setUserId(id);
    };

    const EditHandelr = (data: any) => {
        setEditData(data);
    };

    const updateHander = async (id: string, status: string) => {
        swal({
            title: ` هل انت متاكد من ${status === "2" ? 'الموافقه علي' : 'رفض'} هذا الطلب  `,
            icon: 'warning',
            buttons: ['الغاء', `${status === "2" ? 'قبول' : 'رفض'}`],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                const data = await acceptRejectCeliacCard({ id, status: { status: status } });
                //@ts-ignore
                if (data?.data.status === 200) {
                    //@ts-ignore
                    showAlert('تمت الإضافة', data?.data.response?.message);
                    setToastData({});
                }
                // setToastData(data);
            } else {
                swal(`لم يتم  ${status === "2" ? 'القبول' : 'الرفض'}`);
            }
        });
    };

    const updateDeliveryHander = async (id: string, status: boolean) => {
    };

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <Main_list title="بطاقات سلياكي">
            <MainPageCard>
                {open && (
                    <CustomModal openCloseModal={setOpen} title="إضافة فئة">
                        <div> مودال</div>
                    </CustomModal>
                )}
                <ColumnChooser
                    isLoading={loadingStatus}
                    isLoadingDelivery={loadingDelivery}
                    setPage={setPage}
                    page={page}
                    pagination={data?.data?.length > 0 ? data.meta : {}}
                    onUpdateDelivery={updateDeliveryHander}
                    Enabel_edit={false}
                    Accept_button={true}
                    Reject_button={true}
                    TableBody={data?.data?.length > 0 ? data?.data : []}
                    tabelHead={data?.data?.length > 0 ? columns : []}
                    Chcekbox={false}
                    Enabel_view={true}
                    Page_Add={false}
                    // showAddButton={true}
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onUpdate={updateHander}
                    onEdit={EditHandelr}
                    openCloseModal={setOpen}
                />
            </MainPageCard>
            <CardOwnerModal id={userId} modal2={modal2} setModal2={setModal2} />
        </Main_list>
    );
}
