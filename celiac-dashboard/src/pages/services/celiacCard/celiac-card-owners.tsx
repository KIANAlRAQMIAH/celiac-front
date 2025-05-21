import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useDeleteCeliacCardMutation, useGetCeliacCardOwnersQuery } from '../../../api/serveces';
import Main_list from '../../../components/reusableComponents/Main_list';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomModal from '../../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../../components/reusableComponents/tabels';
import { Loader } from '@mantine/core';
import CardOwnerModal from './card-owner-modal';
import { GoLinkExternal } from "react-icons/go";

export default function CelaicCardOwners() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    const [modal2, setModal2] = useState(false);
    const [deleteCategory, { isLoading: isloadingDel }] = useDeleteCeliacCardMutation();
    const { data, isLoading, isSuccess } = useGetCeliacCardOwnersQuery(page);
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
            title: 'هل أنت متأكد أنك تريد الحذف ',
            icon: 'error',
            buttons: ['إلغاء', 'حذف'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                const data = await deleteCategory(id);
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
    };

    const updateDeliveryHander = async (id: string, status: boolean) => {
    };

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <Main_list title="مُلاك بطاقة سلياك">
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
                    onUpdateDelivery={updateDeliveryHander}
                    Enabel_edit={false}
                    Accept_button={false}
                    Reject_button={false}
                    Enabel_delete={true}
                    Enabel_view={true}
                    TableBody={data?.data?.length > 0 ? data?.data : []}
                    tabelHead={data?.data?.length > 0 ? [
                        { accessor: "user.id", title: "الرمز" },
                        { accessor: "created_at", title: "تاريخ الإنشاء" },
                        { accessor: "user.name", title: "الاسم الكامل" },
                        { accessor: "user.email", title: "البريد الإلكتروني" },
                        {
                            accessor: "medical_report.url",
                            title: "بطاقة سيلياك",
                            render: ({ medical_report }: any) => (
                                <a href={medical_report.url} target="_blank" rel="noopener noreferrer">
                                    <GoLinkExternal size={24} />
                                </a>
                            )
                        },
                        { accessor: "action", title: "الإجراءات" }
                    ] : []
                    }
                    Chcekbox={false}
                    Page_Add={false}
                    showAddButton={false}
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onUpdate={updateHander}
                    onEdit={EditHandelr}
                    openCloseModal={setOpen}
                />
                <CardOwnerModal id={userId} modal2={modal2} setModal2={setModal2} />
            </MainPageCard>
        </Main_list>
    );
}
