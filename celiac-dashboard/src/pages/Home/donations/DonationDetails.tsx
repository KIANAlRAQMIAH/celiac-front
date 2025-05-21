import React, { ChangeEvent, useState } from 'react'
import { showAlert } from '../../../components/Error';
import { useNavigate } from 'react-router-dom';
import { useAddDonateMutation } from '../../../api/HomeSlice/DonationSlice';
import fileUpload from "../../../../public/assets/images/fileUpload.svg"
function DonationDetails() {

    const [addNew, { isLoading: isLoadingGet }]:any = useAddDonateMutation();

    const [destination, setDestination] = useState('');
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<any>(null);
    const navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('destination_name', destination );
            if (image) {
                formData.append('image', image);
            }
            const response = await addNew(formData).unwrap();
            showAlert("Added","تم الاضافه بنجاح")
            navigate('/home/donations');

            clearForm();
        } catch (error) {
             // @ts-ignore
            if (error?.data?.errors?.name && error.data.errors.name.length > 0) {
                // @ts-ignore
                  showAlert('error', error.data.errors.name[0]);
              }
                  // @ts-ignore
              if (error?.data?.errors?.description && error.data.errors.description.length > 0) {
                   // @ts-ignore
                  showAlert('error', error.data.errors.description[0]);
              }
        }
    };
    const clearForm = () => {
        setName('');
        setDescription('');
        setDestination('');
        setImage(null);
        setEditing(false);
    };
    //image upload
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);
        } else {
            setImage(null);
        }
    };
    const handleCancel = () => {
        clearForm();
        navigate('/home/donations');
    };
    return (
        <>
            <div className="p-5">
                <form className=" grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8" onSubmit={handleSubmit}>
                    <div className='mt-20'>
                        <div className='p-6 bg-white border shadow-lg rounded-lg'>
                            <div className='mb-3'>
                                <label className='font-bold my-4 text-[20px]' htmlFor="name">العنوان</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="اكتب العنوان"
                                    className="form-input"
                                    required
                                />
                            </div>
                            <h1 className="font-bold my-4 text-[20px]">الوصـف</h1>
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border rounded-lg p-4 w-[100%]"
                            />

                          <div className='mb-3'>
                                <label className='font-bold my-4 text-[20px]' htmlFor="name">جهة التبرع</label>
                                <input
                                    id="destination"
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="اكتب جهة التبرع"
                                    className="form-input"
                                    required
                                />
                            </div>

                        </div>
                    </div>
                    <div className=''>
                        <div className="flex justify-end items-center  mb-11">
                            <button type="button" className="btn btn-outline-danger" onClick={handleCancel} >
                                الغاء
                            </button>

                            <button type="submit" disabled={isLoadingGet} className="btn btn-primary ltr:ml-4 rtl:mr-4 w-[30%]">
                                تأكيد
                            </button>
                        </div>
                        <div className='p-6 bg-white border shadow-lg rounded-lg'>
                            <label htmlFor="image">تحميل الصوره(.png فقط)</label>
                            <input
                                id="image"
                                type="file"
                                onChange={handleFileChange}
                                className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                required

                            />
                            <img className='mt-4 w-[70%] mx-auto' src={fileUpload} />
                        </div>
                    </div>



                </form>
            </div>


        </>
    )
}

export default DonationDetails

