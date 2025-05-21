import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { useAcceptVolunteerMutation, useGetVolunteerQuery, useRejectVolunteerMutation } from '../../../api/AboutUsSlice/CommitteesSlice';
import { Loader } from '@mantine/core';
import Main_list from '../../../components/reusableComponents/Main_list';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import UserModal from '../Components/user-modal';

export default function Volunteer() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    // @ts-ignore
    const { data, isLoading, isSuccess } = useGetVolunteerQuery(page);
    const [acceptVolunteer] = useAcceptVolunteerMutation();
    const [rejectVolunteer] = useRejectVolunteerMutation();
    const [toastData, setToastData] = useState<any>({});
    const [modal2, setModal2] = useState(false);
    const [userId, setUserId] = useState<string>('');
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

    const viewHander = (id: string) => {
        setModal2(true);
        setUserId(id);
    };
    const EditHandelr = (data: any) => {
        setEditData(data);
    };

    const updateDeliveryHander = async (id: string, status: boolean) => { };

    const updateHandler = async (id: string, status: string) => {
        swal({
            title: `هل أنت متأكد أنك تريد ${status === "2" ? 'القبول' : 'الرفض'}؟`,
            icon: 'warning',
            buttons: ['إلغاء', `${status === "2" ? 'تاكيد' : 'رفض'}`],
            dangerMode: false,
        }).then(async (willUpdate: any) => {
            if (willUpdate) {
                const mutation = status === "2" ? acceptVolunteer : rejectVolunteer;
                try {
                    await mutation({ id, status: { status } }).unwrap();
                    toast.success(`تم ${status === "2" ? 'القبول' : 'الرفض'} بنجاح`);
                    setToastData({});
                } catch (error) {
                    toast.error(`فشل في ${status === "2" ? 'القبول' : 'الرفض'}`);
                }
            } else {
                swal(`لم يتم ${status === "2" ? 'القبول' : 'الرفض'}`);
            }
        });
    };

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <Main_list title="التطوع">
            <UserModal id={userId} modal2={modal2} setModal2={setModal2} />
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
                    Enabel_edit={false}
                    Accept_button={true}
                    Reject_button={true}
                    Enabel_view={true}
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
                    onView={viewHander}
                    onEdit={EditHandelr}
                    onUpdate={updateHandler}
                    onDelete={() => { }}
                    openCloseModal={setOpen}
                />
            </MainPageCard>
        </Main_list>
    );
}
