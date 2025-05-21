import React, { useEffect, useState } from 'react';
import { useGetVolunteerAcceptedQuery } from '../../../api/AboutUsSlice/CommitteesSlice';
import { Loader } from '@mantine/core';
import Main_list from '../../../components/reusableComponents/Main_list';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import UserModal from '../Components/user-modal';

export default function AcceptedVolunteer() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    // @ts-ignore
    const { data, isLoading, isSuccess } = useGetVolunteerAcceptedQuery(page);
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

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <Main_list title="الطلبات المقبولة">
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
                    Accept_button={false}
                    Reject_button={false}
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
                    onDelete={() => { }}
                    onUpdate={() => { }}
                    openCloseModal={setOpen}
                />
            </MainPageCard>
        </Main_list>
    );
}
