import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ChangeEvent, useState, useEffect } from 'react';

import { showAlert } from '../../components/Error';
import { useGetTreatmentQuery, useUpdateTreatmentMutation } from '../../api/ClinicSlice/InformationTreatmentSlice';

function InformationTreatment() {
    const [photo, setPhoto] = useState<File | string | null>(null);
    const [text, setText] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [updateTreatment] = useUpdateTreatmentMutation();
    const { data } = useGetTreatmentQuery();

    useEffect(() => {
        if (data) {
            setText(data.text);
            setPhoto(data.image?.url ? data.image.url : null);
        }
    }, [data]);

    const handleFileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPhoto(e.target.files[0]);
        } else {
            setPhoto(null);
        }
    };

    const renderError = (field: string) => {
        return fieldErrors[field] ? (
            <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
                {fieldErrors[field]}
            </div>
        ) : null;
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('text', text);
        if (photo && typeof photo !== 'string') {
            formData.append('photo', photo);
        }

        try {
            await updateTreatment(formData);
            showAlert("Added", "تم التعديل بنجاح");
        } catch (error:any) {
            if (error.status === 422) {
                const validationErrors = error.data.errors;
                setFieldErrors(validationErrors);
            } else {
                showAlert("error", "هناك خطأ غير معروف.");
            }
        }
    };

    return (
        <div className="p-6 mx-auto bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">العلاج</h2>
                <button
                    dir='ltr'
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    تــأكيد
                </button>
            </div>

            <label htmlFor="diseaseDescription" className="block text-xl font-semibold mb-2">أدخل وصفًا عن العلاج</label>


            <div className="mb-8" dir='ltr'>
                <ReactQuill
                    value={text}
                    onChange={setText}
                    className="w-full h-48 mb-4"
                />
                {renderError('text')}
            </div>

            <div className="mb-8 mt-24">
                <label htmlFor="imageUpload" className="block text-lg font-semibold">تحميل الصوره</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
                    <input
                        id="image"
                        type="file"
                        onChange={handleFileImageChange}
                        className="form-input text-blue-600 file:mr-2 file:py-2 file:px-4 file:border-0 file:font-semibold file:bg-blue-100 file:rounded-lg file:text-blue-600 hover:file:bg-blue-200 cursor-pointer mb-4"
                    />
                    {photo && (
                        typeof photo === 'string' ? (
                            <img src={photo} className="w-[50%] h-auto" alt="Uploaded" />
                        ) : (
                            <img src={URL.createObjectURL(photo)} className="w-[50%] " alt="Uploaded" />
                        )
                    )}
                </div>
                {renderError('photo')}
            </div>
        </div>
    );
}

export default InformationTreatment;
