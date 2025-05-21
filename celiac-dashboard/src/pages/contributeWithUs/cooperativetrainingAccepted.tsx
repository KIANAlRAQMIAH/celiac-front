import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useDeleteCooperativetrainingMutation, useGetCooperativetrainingAcceptedQuery } from '../../api/AboutUsSlice/CommitteesSlice';
import Main_list from '../../components/reusableComponents/Main_list';
import MainPageCard from '../../components/reusableComponents/MainPageCard';
import CustomModal from '../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../components/reusableComponents/tabels';
import { Loader } from '@mantine/core';
import { toast } from 'react-toastify';
import CoorperativeModal from './Components/Modal/coor-modal';

export default function CooperativetrainingAccepted() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    // @ts-ignore
    const { data, isLoading, isSuccess } = useGetCooperativetrainingAcceptedQuery(page);
    const [deletePartnership] = useDeleteCooperativetrainingMutation();
    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [colKeys, setColKeys] = useState<string[]>([]);
    const [modal2, setModal2] = useState(false);
    const [userId, setUserId] = useState<string>('');
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
            title: 'هل أنت متأكد أنك تريد حذف هذه الشراكة؟',
            icon: 'error',
            buttons: ['إلغاء', 'حذف'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                try {
                    await deletePartnership({ id }).unwrap();
                    toast.success('تم حذف الشراكة بنجاح');
                    setToastData({});
                } catch (error) {
                    toast.error('فشل في حذف الشراكة');
                }
            } else {
                swal('لم يتم الحذف');
            }
        });
        setErrors({});
    };

    const viewHander = (id: string) => {
        setUserId(id);
        setModal2(true);
    };
    const EditHandelr = (data: any) => {
        setEditData(data);
    };

    const updateDeliveryHander = async (id: string, status: boolean) => { };

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <Main_list title="الطلبات المقبولة">
            <CoorperativeModal id={userId} modal2={modal2} setModal2={setModal2} />
            <MainPageCard>
                {open && (
                    <CustomModal openCloseModal={setOpen} title="إضافة شراكة">
                        <div>modal</div>
                    </CustomModal>
                )}
                <ColumnChooser
                    isLoading={loadingStatus}
                    isLoadingDelivery={loadingDelivery}
                    setPage={setPage}
                    page={page}
                    pagination={{
                        total: data?.meta?.total || 0,
                        last_page: data?.meta?.last_page || 1,
                        per_page: data?.meta?.per_page || 10,
                        current_page: data?.meta?.current_page || 1
                    }}
                    onUpdateDelivery={updateDeliveryHander}
                    onUpdate={() => { }}
                    Enabel_edit={false}
                    Accept_button={false}
                    Enabel_view={true}
                    Reject_button={false}
                    TableBody={data?.data?.length > 0 ? data?.data : []}
                    tabelHead={data?.data?.length > 0 ? [
                        { accessor: "id", title: "الرمز" },
                        { accessor: "full_name", title: "الاسم الكامل" },
                        { accessor: "phone", title: "الهاتف" },
                        { accessor: "email", title: "البريد الإلكتروني" },
                        { accessor: "dob", title: "تاريخ الميلاد" },
                        { accessor: "gender", title: "الجنس" },
                        { accessor: "is_saudi", title: "سعودي" },
                        { accessor: "residency_number", title: "رقم الإقامة" },
                        { accessor: "national_id", title: "الهوية الوطنية" },
                        { accessor: "faculty_name", title: "اسم الكلية" },
                        // { accessor: "status", title: "الحالة" },
                        { accessor: "action", title: "الإجراءات" }
                    ] : []}
                    Chcekbox={false}
                    Page_Add={false}
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onEdit={EditHandelr}
                    openCloseModal={setOpen}
                />
            </MainPageCard>
        </Main_list>
    );
}
