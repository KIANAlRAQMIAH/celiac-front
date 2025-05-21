import { useEffect, useState } from 'react';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import { showAlert } from '../../../components/Error';
import { useGetContactInfoQuery, useUpdateContactInfoMutation } from '../../../api/HomeSlice/ContactSlice';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Loader from '../../../components/Loader';
import { usePermissions } from '../../../utils/permissions';
import Error404 from '../../../components/Layouts/Error404';

const schema = z.object({
    email: z.string().email(),
    address: z.string().min(2).max(100),
    phone: z.string(),
    phone1: z.string(),
    tiktok: z.string().url(),
    twitter: z.string().url(),
    youtube: z.string().url(),
    whatsapp: z.string().url(),
    facebook: z.string().url(),
});

function SocialContact() {
    const { data, status,isLoading }: any = useGetContactInfoQuery();
    const [updateForm] = useUpdateContactInfoMutation();
    const [formEdited, setFormEdited] = useState(false);
    const navigate = useNavigate()
    const {  canRead,  isLoading:isLoadingPermissions } = usePermissions();
    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);



    const [formData, setFormData] = useState({
        email: data?.email,
        address: data?.address,
        phone: data?.phone,
        phone1: data?.phone1,
        tiktok: data?.tiktok,
        twitter: data?.twitter,
        youtube: data?.youtube,
        whatsapp: data?.whatsapp,
        facebook: data?.facebook,
    });


    useEffect(() => {
        if (data) {
            setFormData({
                email: data?.email || '',
                address: data?.address || '',
                phone: data?.phone || '',
                phone1: data?.phone1 || '',
                tiktok: data?.tiktok || '',
                twitter: data?.twitter || '',
                youtube: data?.youtube || '',
                whatsapp: data?.whatsapp || '',
                facebook: data?.facebook || '',
            });
        }
    }, [data]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!formEdited) return;
            schema.parse(formData);
            const result = await updateForm(formData);
            setFormEdited(false);
            showAlert("Edit", "تم التغيير بنجاح");
        } catch (error) {
            showAlert("error", "ادخل الصيغه الصحيحه");
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormEdited(true);
    };

    if (isLoading || isLoadingPermissions) {
        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        );
    }
    if (!canRead('ContactUs'))
        {
        return <Error404 />;
        }
    return (
        <form onSubmit={handleSubmit}>
            <div className=" my-5" dir="rtl">
                <button type="submit" className="btn btn-primary">

                    تــأكيد التغيير
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">الايميل</h1>
                    <textarea name="email" value={formData?.email} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">العنوان</h1>
                    <textarea name="address" value={formData?.address} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">رقم التليفون الاول</h1>
                    <textarea name="phone" value={formData?.phone} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">رقم التليفون الثاني</h1>
                    <textarea name="phone1" value={formData?.phone1} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">تيـكتوك</h1>
                    <textarea name="tiktok" value={formData?.tiktok} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">تويـتر</h1>
                    <textarea name="twitter" value={formData?.twitter} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>

                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">يوتيـوب</h1>
                    <textarea name="youtube" value={formData?.youtube} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>
                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">واتـساب</h1>
                    <textarea name="whatsapp" value={formData?.whatsapp} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>
                <div className="p-5 bg-white border shadow-lg rounded-lg">
                    <h1 className="font-bold my-4 text-[20px]">فيـسبوك</h1>
                    <textarea name="facebook" value={formData?.facebook} onChange={handleChange} className="border rounded-lg p-4 w-[100%]" />
                </div>
            </div>
        </form>
    );
}

export default SocialContact;
