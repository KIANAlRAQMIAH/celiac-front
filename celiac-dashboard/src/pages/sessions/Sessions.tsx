import { useEffect, useState } from 'react';

import { Loader } from '@mantine/core';

import Main_list from '../../components/reusableComponents/Main_list';

import CustomModal from '../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../components/reusableComponents/tabels';

import { useTranslation } from 'react-i18next';

// import usePermissionGurd from "../../hooks/permession/usePermissionGurd";
import SessionsForm from './SessionsForm';
import { useGetRecordsQuery } from '../../api/serveces';
import useDeleteConfirmation from '../../hooks/useDeleteConfirmation';
import Calendar from '../../components/reusableComponents/calender/Calender';
import SessionDetails from './SessionDetails';
// import useDeleteConfirmation from "../../hooks/useDeleteConfirmation";

export default function Sessions() {
    const [page, setPage] = useState(1);

    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [viewId, setViewId] = useState<string|null>(null);
    // const [skipedId, setSkipedId]  = useState(false)

    const { data, isLoading, isSuccess } = useGetRecordsQuery({
        page: Number(page),
        per_page: 10,
        url: 'therapy-sessions',
        inValid: ['therapy-sessions'],
    });
    // const { data, isLoading, isSuccess } = useGitDeveloperQuery({
    //   page: Number(page),
    //   per_page: 10,

    // });

    console.log(data);

    // const {refetch,data:recordUpdateData, isSuccess:recordIsSuccess} = useFindRecordQuery({id:editData.id, url:"admin/city"},{skip:!skipedId})

    // useEffect(()=>{
    //   if(skipedId === true){

    //     refetch()
    //   }

    // },[skipedId])

    // useEffect(()=>{
    //   if(recordIsSuccess){
    // setSkipedId(false)

    //   }

    // },[recordIsSuccess])

    // console.log(recordUpdateData)

    const [colKeys, setColKeys] = useState<string[]>([]);
    const [finslColsKeys, setFinalKeys] = useState<{ accessor: string; title: string }[]>([]);
    let keys: string[] = [];
    useEffect(() => {
        //@ts-ignore
        if (data?.data?.length > 0) {
            //@ts-ignore
            keys = Object?.keys(data?.data[0]);
            setColKeys(keys);
        }
    }, [isSuccess]);
    console.log(colKeys);
    const colss: { accessor: string; title: string }[] = [];
    useEffect(() => {
        colKeys?.map((key: any, i: number) => {
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

    const deleteSubmitHandler = useDeleteConfirmation({ url: 'therapy-sessions', inValid: 'therapy-sessions' });
    const viewHander = (id: string) => {
        setViewId(id)
    };
    const EditHandelr = (data: any) => {
        // setSkipedId(true)
        setEditData(data);
        console.log(data);
    };
   
    // const canDelete = usePermissionGurd('service', 'delete')
    // const canedit = usePermissionGurd('service', 'edit')
    // const canAdd = usePermissionGurd('service', 'create')
    if (isLoading) {
        return (
            <div>
                {' '}
                <Loader />
            </div>
        );
    }

    return (
        <Main_list title="الجلسات">
            <div className="flex  w-full my-6 ">
                {' '}
                <button onClick={() => setOpen(true)} className="bg-primary text-white rounded-[8px] p-3">
                    اضف جلسة
                </button>
            </div>
            {open && !editData?.id &&!viewId && (
                <CustomModal openCloseModal={setOpen} title="اضافة جلسة">
                    <SessionsForm openCloseModal={setOpen} editData={null} />
                </CustomModal>
            )}

            {/* {open && editData?.id && (
                <CustomModal openCloseModal={setOpen} title={`عرض تفاصيل الجلسه`} resetEditData={setEditData}>
                    <SessionsForm editData={editData} resetEditData={setEditData} openCloseModal={setOpen} />
                </CustomModal>
            )} */}
            {open && viewId && !editData?.id && (
                <CustomModal openCloseModal={setOpen} title={`عرض تفاصيل الجلسه`} setViewId={setViewId}>
                    <SessionDetails viewId={viewId} resetViewData={viewHander} openCloseModal={setOpen} setEditData={setEditData} />
                </CustomModal>
            )}

            {open && editData?.id && (
                <CustomModal openCloseModal={setOpen} title="تعديل الجلسه" resetEditData={setEditData}>
                    <SessionsForm editData={editData} resetEditData={setEditData} openCloseModal={setOpen} />
                </CustomModal>
            )}
            {/* <ColumnChooser
        setPage={setPage}
        page={page}
        //@ts-ignore
        pagination={data?.data?.pagination}
       
       
        //@ts-ignore
        TableBody={data?.data?.length > 0 ? data?.data : []}
        //@ts-ignore
        tabelHead={[
          { accessor: "id", title: "الرمز" },
          { accessor: "name", title: "اسم الجلسة" },
          { accessor: "session_date", title: "تاريخ الجلسة" },
          { accessor: "created_at", title: "تاريخ الإنشاء" },
          { accessor: "updated_at", title: "تاريخ التحديث" },
          { accessor: "starts_at", title: "وقت البدء" },
          { accessor: "ends_at", title: "وقت الانتهاء" },
          { accessor: "session_type_text", title: "نوع الجلسة" },
          { accessor: "address", title: "العنوان" },
          { accessor: "max_attendees", title: "الحد الأقصى للحضور" },
          { accessor: "desc", title: "الوصف" },
          { accessor: "details", title: "التفاصيل" },
          { accessor: "active_status", title: "الحالة" },
          { accessor: "action", title: "الإجراءات" }
      ]
      }
        Chcekbox={true}
        Page_Add={false}
       
        onDelete={deleteSubmitHandler}
        onView={viewHander}
        onEdit={EditHandelr}
        openCloseModal={setOpen}
        Enabel_view={true}
        // showAddButton={canAdd}
        // Enabel_edit={canedit}
        // Enabel_delete={canDelete}

        showAddButton={true}
        Enabel_edit={true}
        Enabel_delete={true}
        
      /> */}
    

    {/* @ts-ignore */}
            <Calendar events={data?.data} onView={viewHander} setModalOpen={setOpen} />
        </Main_list>
    );
}
