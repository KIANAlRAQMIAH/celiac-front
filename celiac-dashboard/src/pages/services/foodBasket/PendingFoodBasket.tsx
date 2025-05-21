import React, { useEffect, useState } from 'react';
// import { Viewer } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import swal from 'sweetalert';
import { useAcceptFoodBasketMutation, useAcceptJobReqMutation, useGetPendingFoodBasketQuery, useRejectFoodBasketMutation, useRejecttJobReqMutation } from '../../../api/serveces';
import Main_list from '../../../components/reusableComponents/Main_list';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import { Loader } from '@mantine/core';


export default function PendingFoodBasket() {
    // const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [page, setPage] = useState(1);
    // const { refetch, data, isSuccess, isError } = useGetAllCategoriesQuery({ page });
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    // useEffect(() => {
    //     refetch();
    // }, [page]);

    // const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
    // const { data ,isSuccess } = useGetGovernanceListsQuery()

    const { data, isLoading, isSuccess } = useGetPendingFoodBasketQuery(page)

    const [acceptFoodBasket] = useAcceptFoodBasketMutation()
    const [rejectFoodBasket] = useRejectFoodBasketMutation()


    //    const data =[
    //         { id: 1, name: 'amr', age: 32, game:"yes" },
    //         { id: 2, name: 'yousif', age: 35, game:"yes" },
    //         { id: 3, name: 'amr', age: 32, game:"yes" },
    //         { id: 4, name: 'yousif', age: 35, game:"yes" },
    //         { id: 5, name: 'amr', age: 32, game:"yes" },
    //         { id: 6, name: 'yousif', age: 35, game:"yes" },
    //         { id: 7, name: 'amr', age: 32, game:"yes" },
    //         { id: 8, name: 'yousif', age: 35, game:"yes" },
    //         { id: 9, name: 'amr', age: 32, game:"yes" },
    //         { id: 10, name: 'yousif', age: 35, game:"yes" },
    //         { id: 11, name: 'amr', age: 32, game:"yes" },
    //         { id: 12, name: 'yousif', age: 35, game:"yes" },
    //         { id: 13, name: 'amr', age: 32, game:"yes" },
    //         { id: 14, name: 'yousif', age: 35, game:"yes" },
    //         { id: 15, name: 'amr', age: 32, game:"yes" },
    //         { id: 16, name: 'yousif', age: 35, game:"yes" },
    //         { id: 17, name: 'amr', age: 32, game:"yes" },
    //         { id: 18, name: 'yousif', age: 35, game:"yes" },
    //         { id: 19, name: 'amr', age: 32, game:"yes" },
    //         { id: 20, name: 'yousif', age: 35, game:"yes" }
    //       ];
    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [colKeys, setColKeys] = useState<string[]>([]);
    const [finslColsKeys, setFinalKeys] = useState<{ accessor: string; title: string }[]>([]);
    const [loadingDelivery, setLoadingDelivery] = useState<{ [key: string]: boolean }>({});

    const [loadingStatus, setLoadingStatus] = useState<{ [key: string]: boolean }>({});

    let keys: string[] = [];
    useEffect(() => {
        //@ts-ignore
        if (data?.data?.length > 0) {
            //@ts-ignore
            keys = Object?.keys(data?.data[0]);
            setColKeys(keys);

        }
    }, [isSuccess]);

    let colss: { accessor: string; title: string }[] = [];
    useEffect(() => {

        colKeys?.map((key: any) => {
            if (key === "files") {
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
    };
    const EditHandelr = (data: any) => {
        setEditData(data);
    };

    const [isTrue, setisTrue] = useState(false);
    const [isTrueFrommoale, setisTrueFrommoale] = useState(false);

    const updateHander = async (id: string, status: string) => {
        swal({
            title: ` هل انت متاكد من ${status === "2" ? 'الموافقه علي' : 'رفض'} هذا الطلب  `,
            icon: 'warning',
            buttons: ['الغاء', `${status === "2" ? 'قبول' : 'رفض'}`],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                const mutation = status === "2" ? acceptFoodBasket : rejectFoodBasket;
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
        return <div> <Loader /></div>
    }
    return (
        <Main_list title=" السلال الغذائيه">
            <MainPageCard>
                {open && (
                    <CustomModal openCloseModal={setOpen} title="Add Category">
                        <div> modal</div>
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
                    Enabel_view={true}
                    Reject_button={true}
                    //@ts-ignore
                    TableBody={data?.data?.length > 0 ? data?.data : []}
                    //@ts-ignore
                    tabelHead={data?.data?.length > 0 ? [
                        // { accessor: "cv", title: "السيرة الذاتية" },
                        // { accessor: "user", title: "المستخدم" },
                        { accessor: "id", title: "الرمز" },
                        { accessor: "created_at", title: "تاريخ الإنشاء" },


                        { accessor: "status", title: "الحالة" },
                        { accessor: "full_name", title: "الاسم الكامل" },
                        { accessor: "email", title: "البريد الإلكتروني" },
                        { accessor: "phone", title: "الهاتف" },
                        // { accessor: "city", title: "المدينة" },
                        { accessor: "dob", title: "تاريخ الميلاد" },
                        { accessor: "is_saudi", title: "سعودي" },
                        { accessor: "is_infected", title: "مصاب" },
                        { accessor: "residency_number", title: "رقم الإقامة" },
                        // { accessor: "national_id", title: "الهوية الوطنية" },
                        { accessor: "gender", title: "الجنس" },
                        { accessor: "action", title: "الاجراءات" }
                    ] : []
                    }
                    Chcekbox={false}
                    Page_Add={false}
                    // showAddButton={true}
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onUpdate={updateHander}
                    onEdit={EditHandelr}
                    openCloseModal={setOpen}
                />
                {/* <Viewer
                fileUrl='/assets/pdf-open-parameters.pdf'
                plugins={[
                    // Register plugins
                    defaultLayoutPluginInstance,

                ]}
                /> */}
            </MainPageCard>
        </Main_list>
    );
}
