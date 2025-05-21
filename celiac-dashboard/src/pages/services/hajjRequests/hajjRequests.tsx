import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Main_list from '../../../components/reusableComponents/Main_list';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import Loader from '../../../components/Loader';
import { useAcceptHajjReqMutation, useGetHajjRequestsQuery, useRejecttHajjReqMutation } from '../../../api/serveces';
import HajjModal from './hajj-modal';

export default function HajjRequests() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [userId, setUserId] = useState<string>('');
    const [editData, setEditData] = useState<any>([]);
    const { refetch, data, isLoading, isSuccess } = useGetHajjRequestsQuery({ page });
    const [acceptHajjReq, { isLoading: acceptLoading }] = useAcceptHajjReqMutation();
    const [rejectHajjReq, { isLoading: rejectLoading }] = useRejecttHajjReqMutation();

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
        { accessor: "is_visitor", title: "هل زائر" },
        { accessor: "passport_number", title: "رقم الجواز" },
        { accessor: "campaign_name", title: "اسم الحملة" },
        { accessor: "campaign_number", title: "رقم الحملة" },
        { accessor: "transaction_date", title: "تاريخ المعاملة" },
        { accessor: "gender", title: "الجنس" },
        { accessor: "status", title: "الحالة" },
        { accessor: "action", title: "الاجراءات" }
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
            colss?.push({ accessor: 'action', title: 'Action' });
        }
        setFinalKeys(colss);
    }, [colKeys, isSuccess]);

    const deleteSubmitHandler = async (id: string) => {
        swal({
            title: 'Are you sure you want to delete ADMIN?',
            icon: 'error',
            buttons: ['Cancel', 'Delete'],
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
                    showAlert('Added', data?.data.response?.message);
                    setToastData({});
                }
                // setToastData(data);
            } else {
                swal('Not deleted');
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
                const mutation = status === "2" ? acceptHajjReq : rejectHajjReq;
                const data = await mutation({ id, status: { status } });
                //@ts-ignore
                if (data?.data.status === 200) {
                    //@ts-ignore
                    showAlert('Added', data?.data.response?.message);
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
        <Main_list title="طلبات الحج">
            <MainPageCard>
                {open && (
                    <CustomModal openCloseModal={setOpen} title="Add Category">
                        <div>modal</div>
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
                    Enabel_view={true}
                    TableBody={data?.data?.length > 0 ? data?.data : []}
                    tabelHead={data?.data?.length > 0 ? columns : []}
                    Chcekbox={false}
                    Page_Add={false}
                    // showAddButton={true}
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onUpdate={updateHander}
                    onEdit={EditHandelr}
                    openCloseModal={setOpen}
                />
            </MainPageCard>
            <HajjModal id={userId} modal2={modal2} setModal2={setModal2} />
        </Main_list>
    );
}
