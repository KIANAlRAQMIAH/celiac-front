import { useEffect, useState } from 'react';
import { useGetAssociationQuery, useUpdateAssociationMutation } from '../../../api/AboutUsSlice/AboutAssociation';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import { showAlert } from '../../../components/Error';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { usePermissions } from '../../../utils/permissions';
import Loader from '../../../components/Loader';
import Error404 from '../../../components/Layouts/Error404';

const schema = z.object({
    establishment_of_the_association: z.string().trim().min(6),
    association_about_title: z.string().trim().min(6),
    association_about_description: z.string().trim().min(6),
    association_message: z.string().trim().min(6),
    association_visions: z.string().trim().min(6),
    association_objectives: z.string().trim().min(6),
    association_values: z.string().trim().min(6),
});
function AboutAssociation() {
    const navigate = useNavigate();
    const [formEdited, setFormEdited] = useState(false);
    const [updateForm, { isLoading: isLoadingEdit }] = useUpdateAssociationMutation();
    const { data, status, isError,isLoading: isLoadingGet }: any = useGetAssociationQuery();
    const { canRead, canUpdate, isLoading:isLoadingPermissions } = usePermissions();

    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);
    const [formData, setFormData] = useState({
        association_about_title: '',
        association_about_description: '',
        establishment_of_the_association: '',
        association_visions: '',
        association_message: '',
        association_objectives: '',
        association_values: '',
    });

    useEffect(() => {
        if (data) {
            setFormData({
                association_about_title: data.association_about_title || '',
                association_about_description: data.association_about_description || '',
                establishment_of_the_association: data.establishment_of_the_association || '',
                association_visions: data.association_visions || '',
                association_message: data.association_message || '',
                association_objectives: data.association_objectives || '',
                association_values: data.association_values || '',
            });
        }
    }, [data]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!formEdited) return;
            await schema.parseAsync(formData);
            const result = await updateForm(formData);
            setFormEdited(false);
            showAlert("Edit", 'تم التغيير بنجاح');
        } catch (error) {
            console.error(error)
            showAlert("error", 'يجب أن يكون طول النصوص على الأقل 6 حروفٍ/حرفًا');
        }
    };


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormEdited(true);
    };

    if ( isLoadingGet || isLoadingEdit || isLoadingPermissions)
        {

            return (
             <div className="flex justify-center items-center mt-[50%]">
               <Loader />
                </div>
            )
        }
        if (!canRead('AboutSettings'))
            {
            return <Error404 />;
            }

    return (
        <form onSubmit={handleSubmit}>
            <div className=" my-5" dir="rtl">
            {canUpdate('AboutSettings') &&
                <button disabled={isLoadingEdit} type="submit" className="btn btn-primary">
                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                    تــأكيد التغيير
                </button>
               }
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">تأسيس الجمعيه</h1>
                    <textarea name="establishment_of_the_association" value={formData.establishment_of_the_association} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">عنوان الجمعية</h1>
                    <textarea name="association_about_title" value={formData.association_about_title} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">وصف الجمعية</h1>
                    <textarea name="association_about_description" value={formData.association_about_description} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">رسالتنــــا</h1>
                    <textarea name="association_message" value={formData.association_message} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">رؤيتنــــــــا</h1>
                    <textarea name="association_visions" value={formData.association_visions} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">أهدافنــــا</h1>
                    <textarea name="association_objectives" value={formData.association_objectives} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">قيمتنـــــا</h1>
                    <textarea name="association_values" value={formData.association_values} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>
            </div>
        </form>
    );
}

export default AboutAssociation;
