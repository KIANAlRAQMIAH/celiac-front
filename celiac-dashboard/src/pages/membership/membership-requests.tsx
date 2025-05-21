import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { MdOutlineFileDownload } from 'react-icons/md';
import { GoLinkExternal } from "react-icons/go";
import Main_list from '../../components/reusableComponents/Main_list';
import MainPageCard from '../../components/reusableComponents/MainPageCard';
import ColumnChooser from '../../components/reusableComponents/tabels';
import { Loader } from '@mantine/core';
import { useAcceptMembershipReqMutation, useGetMembershipRequestsQuery, useRejectMembershipReqMutation } from '../../api/AboutUsSlice/CommitteesSlice';
import { toast } from 'react-toastify';

export default function MembershipRequests() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
    const [modal2, setModal2] = useState(false);
    const [acceptMembershipReq, { isLoading: accLoading }] = useAcceptMembershipReqMutation();
    const [rejectMembershipReq, { isLoading: rejLoading }] = useRejectMembershipReqMutation();//@ts-ignore
    const { data, isLoading, isSuccess } = useGetMembershipRequestsQuery(page);
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
            colss?.push({ accessor: 'action', title: 'Action' });
        }
        setFinalKeys(colss);
    }, [colKeys, isSuccess]);

    const deleteSubmitHandler = async (id: string) => {
        swal({
            title: 'Are you sure you want to delete this request?',
            icon: 'error',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                // Handle delete request here
                // const data = await deleteCategory(id);
                // if (data?.error?.data?.status === 400) {
                //     toast.error(data?.error?.data?.message, {});
                //     setToastData({});
                // }
                // if (data?.data.status === 200) {
                //     showAlert('Deleted', data?.data.response?.message);
                //     setToastData({});
                // }
            } else {
                swal('Not deleted');
            }
        });

        setErrors({});
    };

    const viewHandler = (id: string) => {
        setModal2(true);
        setUserId(id);
    };

    const editHandler = (data: any) => {
        setEditData(data);
    };

    const acceptHandler = async (id: string) => {
        try {
            await acceptMembershipReq({ id, status: 'accepted' }).unwrap();
            toast.success('Membership request accepted successfully');
        } catch (error) {
            toast.error('Failed to accept membership request');
        }
    };

    const rejectHandler = async (id: string) => {
        try {
            await rejectMembershipReq({ id, status: 'rejected' }).unwrap();
            toast.success('Membership request rejected successfully');
        } catch (error) {
            toast.error('Failed to reject membership request');
        }
    };

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <Main_list title="الطلبات المقبولة">
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
                    onUpdateDelivery={() => { }}
                    Enabel_edit={false}
                    Accept_button={true}
                    Reject_button={true}
                    Enabel_delete={true}
                    TableBody={data?.data?.length > 0 ? data?.data : []}
                    tabelHead={data?.data?.length > 0 ? [
                        { accessor: "id", title: "الرمز" },
                        { accessor: "created_at", title: "تاريخ الإنشاء" },
                        { accessor: "full_name", title: "الاسم الكامل" },
                        { accessor: "email", title: "البريد الإلكتروني" },
                        { accessor: "phone", title: "الهاتف" },
                        { accessor: "dob", title: "تاريخ الميلاد" },
                        { accessor: "gender", title: "الجنس" },
                        { accessor: "is_saudi", title: "سعودي" },
                        { accessor: "national_id", title: "الهوية الوطنية" },
                        { accessor: "is_student", title: "طالب" },
                        { accessor: "study_field", title: "مجال الدراسة" },
                        { accessor: "job", title: "الوظيفة" },
                        {
                            accessor: "action",
                            title: "الاجراءات",
                            render: ({ id }: any) => (
                                <div className="flex space-x-2">
                                    <button onClick={() => acceptHandler(id)} className="btn btn-success">قبول</button>
                                    <button onClick={() => rejectHandler(id)} className="btn btn-danger">رفض</button>
                                </div>
                            )
                        }
                    ] : []}
                    Chcekbox={false}
                    Page_Add={false}
                    onDelete={deleteSubmitHandler}
                    onView={viewHandler}
                    onUpdate={() => { }}
                    onEdit={editHandler}
                    openCloseModal={setOpen}
                />
            </MainPageCard>
        </Main_list>
    );
}
