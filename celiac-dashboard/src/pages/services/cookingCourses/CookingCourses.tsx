import { useEffect, useState } from 'react';

import { Loader } from '@mantine/core';

import Main_list from '../../../components/reusableComponents/Main_list';

import CustomModal from '../../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../../components/reusableComponents/tabels';

import { useTranslation } from 'react-i18next';

// import usePermissionGurd from "../../hooks/permession/usePermissionGurd";
import SessionsForm from './CookingForm';
import { useGetRecordsQuery } from '../../../api/serveces';
import useDeleteConfirmation from '../../../hooks/useDeleteConfirmation';
import EventsForm from './CookingForm';
import EventsDetails from './EventsDetails';
import CookingCourseForm from './CookingForm';


// import useDeleteConfirmation from "../../hooks/useDeleteConfirmation";

export default function CookingCourses() {
    const [page, setPage] = useState(1);

    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [viewId, setViewId] = useState<string|null>(null);
    // const [skipedId, setSkipedId]  = useState(false)

    const { data, isLoading, isSuccess } = useGetRecordsQuery({
        page: Number(page),
        per_page: 10,
        url: 'cooking-courses',
        inValid: ['cooking-courses'],
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

    const deleteSubmitHandler = useDeleteConfirmation({ url: 'cooking-courses', inValid: 'cooking-courses' });
    const viewHander = (id: string) => {
        setViewId(id)
        setOpen(true)

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
        <Main_list title="برامج الطهي">
            {/* <div className="flex  w-full my-6 ">
                {' '}
                <button onClick={() => setOpen(true)} className="bg-primary text-white rounded-[8px] p-3">
                    اضف جلسة
                </button>
            </div> */}
            {open && !editData?.id &&!viewId && (
                <CustomModal openCloseModal={setOpen} title="اضافة برنامج طهي">
                    <SessionsForm openCloseModal={setOpen} editData={null} />
                </CustomModal>
            )}

            {open && editData?.id && !viewId && (
                <CustomModal openCloseModal={setOpen} title={`عرض تفاصيل برنامج الطهي`} resetEditData={setEditData}>
                    <EventsForm editData={editData} resetEditData={setEditData} openCloseModal={setOpen} />
                </CustomModal>
            )}
            {open && viewId && !editData?.id && (
                <CustomModal openCloseModal={setOpen} title={`عرض تفاصيل برنامج الطهي`} setViewId={setViewId}>
                    {/* @ts-ignore */}
                    <EventsDetails viewId={viewId}   openCloseModal={setOpen} setEditData={setEditData} />
                </CustomModal>
            )}

            {open && editData?.id && (
                <CustomModal openCloseModal={setOpen} title="تعديل برنامج الطهي" resetEditData={setEditData}>
                    <CookingCourseForm editData={editData} resetEditData={setEditData} openCloseModal={setOpen} />
                </CustomModal>
            )}
             <ColumnChooser
        setPage={setPage}
        page={page}
        //@ts-ignore
        pagination={data?.data?.pagination}


        //@ts-ignore
        TableBody={data?.data?.length > 0 ? data?.data : []}
        //@ts-ignore
        tabelHead = {[
            { accessor: "id", title: "الرمز" },
            { accessor: "name", title: "اسم البرنامج" },
            { accessor: "course_date", title: "تاريخ البرنامج" },
            { accessor: "starts_at", title: "وقت البدء" },
            { accessor: "ends_at", title: "وقت الانتهاء" },
            { accessor: "address", title: "العنوان" },
            { accessor: "max_attendees", title: "الحد الأقصى للحضور" },
            { accessor: "desc", title: "الوصف" },
            { accessor: "details", title: "التفاصيل" },
            { accessor: "price", title: "سعر البرنامج" },
            { accessor: "photo", title: "الصورة" },
            { accessor: "training_period", title: " مده التدريب" },
            { accessor: "certificate_fees", title: "رسوم الشهادة" },
            { accessor: "active_status", title: "الحالة" },
            { accessor: "action", title: "الإجراءات" }
          ]}

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

      />


    {/* @ts-ignore */}
            {/* <Calendar events={data?.data} onView={viewHander} setModalOpen={setOpen} /> */}
        </Main_list>
    );
}
