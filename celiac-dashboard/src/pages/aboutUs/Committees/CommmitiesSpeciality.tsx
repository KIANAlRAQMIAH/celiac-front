// import 'easymde/dist/easymde.min.css';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetCommittiesQuery, useUpdateCommittiesMutation } from '../../../api/AboutUsSlice/commitiesSpeciality';
import { showAlert } from '../../../components/Error';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { usePermissions } from '../../../utils/permissions';
import Loader from '../../../components/Loader';
import Error404 from '../../../components/Layouts/Error404';

interface Committee {
    id: number;
    name: string;
    tasks: string;
}

interface FormData {
    id: number;
    tasks: string;
}

const CommitteesSpecialties = () => {
    const navigate = useNavigate();
    const { data, status, isLoading } = useGetCommittiesQuery();
    const [formData, setFormData] = useState<FormData[]>([]);
    const [formEdited, setFormEdited] = useState(false);
    const [updateForm, { isLoading: isLoadingEdit }] = useUpdateCommittiesMutation();
    const { canCreate, canRead, canDelete, canUpdate, isLoading: isLoadingPermissions } = usePermissions();


    useEffect(() => {
        if (status === 'rejected') {
            navigate('/');
        }
        if (data?.data && data?.data.length > 0) {
            const initialFormData: FormData[] = data.data.map((committee: Committee) => ({
                id: committee.id,
                tasks: committee.tasks,
            }));
            setFormData(initialFormData);
        }
    }, [status, navigate, data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formEdited) return;

        try {
            const updatedCommittiesData = {
                committees: formData.map((committee) => ({
                    id: committee.id,
                    tasks: committee.tasks,
                })),
            };
            const dispatch = useDispatch();
            useEffect(() => {
                dispatch(setPageTitle('اختصاصات اللجان'));
            });

            await updateForm(updatedCommittiesData).unwrap();
            setFormEdited(false);
            showAlert('Edit', 'تم التغيير بنجاح');
        } catch (error) {
            console.error('Error:', error);
            showAlert('error', 'هناك خطأ');
        }
    };

    const handleChange = (index: number, value: string) => {
        const updatedFormData = formData.map((item, idx) => {
            if (idx === index) {
                return { ...item, tasks: value };
            }
            return item;
        });
        setFormData(updatedFormData);
        setFormEdited(true);
    };

    if (isLoading || isLoadingEdit || isLoadingPermissions) {

        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        )
    }



    if (!canRead('Committee')) {
        return <Error404 />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="my-5" dir="rtl">
                {canUpdate('Committee') &&
                    <button disabled={isLoadingEdit} type="submit" className="btn btn-primary">
                        تــأكيد التغيير
                    </button>
                }
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 " dir="ltr">
                {formData.map((committee, index) => (
                    <div key={committee.id}>
                        <div className="p-5 bg-white border shadow-lg rounded-lg">
                            <h1 className="font-bold my-4 text-[20px]">{data?.data[index]?.name}</h1>
                            <ReactQuill theme="snow" value={committee.tasks} onChange={(value) => handleChange(index, value)} className="border rounded-lg p-4 w-[100%]" />
                        </div>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default CommitteesSpecialties;
