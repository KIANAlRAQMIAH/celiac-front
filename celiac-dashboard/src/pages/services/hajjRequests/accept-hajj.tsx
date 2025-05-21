import { useEffect, useState } from 'react';
import { useGetAcceptHajjReqQuery } from '../../../api/serveces';
import Main_list from '../../../components/reusableComponents/Main_list';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import { Loader } from '@mantine/core';
import { MdOutlineFileDownload } from "react-icons/md";
import HajjModal from './hajj-modal';

export default function AcceptedHajj() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    const [modal2, setModal2] = useState(false);
    const { data, isLoading, isSuccess } = useGetAcceptHajjReqQuery(page);
    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [colKeys, setColKeys] = useState<string[]>([]);
    const [finslColsKeys, setFinalKeys] = useState<{ accessor: string; title: string }[]>([]);
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

    const columns = [
        { accessor: "id", title: "الرمز" },
        { accessor: "full_name", title: "الاسم الكامل" },
        { accessor: "dob", title: "تاريخ الميلاد" },
        { accessor: "gender", title: "الجنس" },
        { accessor: "phone", title: "الهاتف" },
        { accessor: "email", title: "البريد الإلكتروني" },
        {
            accessor: "is_visitor",
            title: " زائر",
            render: ({ is_visitor, passport_number }: any) => (
                is_visitor ? <p>{passport_number}</p> : '-'
            )
        },
        {
            accessor: "is_saudi",
            title: " سعودي",
            render: ({ is_saudi, national_id, residency_number }: any) => (
                is_saudi ? <p>{national_id}</p> : '-'
            )
        },
        {
            accessor: "file",
            title: "بطاقة سيلياك",
            render: ({ file }: any) => (
                file ? (
                    <a href={file} target="_blank" rel="noopener noreferrer">
                        <MdOutlineFileDownload size={24} />
                    </a>
                ) : "لا يوجد"
            )
        },
        { accessor: "action", title: "الاجراءات" },
    ];

    const filteredColumns = columns.filter(column => colKeys.includes(column.accessor.split('.')[0]));

    const viewHander = (id: string) => {
        setModal2(true);
        setUserId(id);
    };
    const deleteSubmitHandler = async (id: string) => { }
    const EditHandelr = (data: any) => {
        setEditData(data);
    };

    const updateHander = async (id: string, status: string) => {
    };

    const updateDeliveryHander = async (id: string, status: boolean) => {
    };

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <Main_list title="الطلبات المقبولة">
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
                    pagination={{
                        total: data?.meta?.total,
                        last_page: data?.meta.last_page,
                        per_page: data?.meta.per_page,
                        current_page: data?.meta?.current_page,
                    }}
                    onUpdateDelivery={updateDeliveryHander}
                    Enabel_edit={false}
                    Accept_button={false}
                    Reject_button={false}
                    Enabel_view={true}
                    Enabel_delete={false}
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
                <HajjModal id={userId} modal2={modal2} setModal2={setModal2} />
            </MainPageCard>
        </Main_list>
    );
}
