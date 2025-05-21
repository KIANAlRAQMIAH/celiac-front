
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useGetAcceptFoodBasketQuery } from '../../../api/serveces';
import Main_list from '../../../components/reusableComponents/Main_list';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import { Loader } from '@mantine/core';
import FoodBasketModal from './foodbasket-modal';

export default function AcceptFoodBasket() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [modal2, setModal2] = useState(false);
    const { data, isLoading, isSuccess } = useGetAcceptFoodBasketQuery(page);
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
            const formattedKey = key
                .replace(/_/g, ' ')
                .split(' ')
                .map((word: string) => word?.charAt(0).toUpperCase() + word?.slice(1))
                .join(' ');
            colss?.push({ accessor: key, title: formattedKey });
        });
        if (colss?.length > 0) {
            colss?.push({ accessor: 'action', title: 'الاجراءات' });
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
        const user = data?.data?.find((user: any) => user.id === id);
        setSelectedUser(user);
        setModal2(true);
    };

    const EditHandelr = (data: any) => {
        setEditData(data);
    };

    const updateHander = async (id: string, status: string) => { };

    const updateDeliveryHander = async (id: string, status: boolean) => { };

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <Main_list title=" السلال الغذائيه">
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
                    Accept_button={false}
                    Reject_button={false}
                    Enabel_view={true}
                    TableBody={data?.data?.length > 0 ? data?.data : []}
                    tabelHead={data?.data?.length > 0 ? [
                        { accessor: "cv", title: "السيرة الذاتية" },
                        { accessor: "user", title: "المستخدم" },
                        { accessor: "id", title: "الرمز" },
                        { accessor: "created_at", title: "تاريخ الإنشاء" },
                        { accessor: "status", title: "الحالة" },
                        { accessor: "full_name", title: "الاسم الكامل" },
                        { accessor: "email", title: "البريد الإلكتروني" },
                        { accessor: "phone", title: "الهاتف" },
                        { accessor: "dob", title: "تاريخ الميلاد" },
                        { accessor: "is_saudi", title: "سعودي" },
                        { accessor: "is_infected", title: "مصاب" },
                        { accessor: "residency_number", title: "رقم الإقامة" },
                        { accessor: "gender", title: "الجنس" },
                        { accessor: "action", title: "الاجراءات" }
                    ] : []}
                    Chcekbox={false}
                    Page_Add={false}
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onUpdate={updateHander}
                    onEdit={EditHandelr}
                    openCloseModal={setOpen}
                />
                {selectedUser && (
                    <FoodBasketModal
                        id={selectedUser?.id}
                        modal2={modal2}
                        setModal2={setModal2}
                        user={selectedUser}
                    />
                )}
            </MainPageCard>
        </Main_list>
    );
}
