import React, { useRef, useState } from 'react';
import uploadImg from '../../../public/assets/images/upload-img.png';
import uploadUser from '../../../public/assets/images/upload-user.png';
type UploadImageProps = {
    user?: boolean;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    editImgUrl?: string | null;
};
const Upload = (props: UploadImageProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleButtonClick = () => {
        // Programmatically click the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files;
        if (files && files.length > 0) {
            const file = files[0];
            props.setFile(file);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setImageSrc(fileReader.result as string);
            };
            fileReader.readAsDataURL(file);
        }
    };
    return (
        <div className="flex flex-col items-center gap-[20px]">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            <div onClick={handleButtonClick} className="flex cursor-pointer  w-[120px] h-[120px] rounded-full border-[2px] border-[#F23F39] border-solid justify-center items-center ">
                {imageSrc ? <img src={imageSrc} alt="Uploaded" className="w-full h-full rounded-full object-cover" /> : <img src={props.user ? uploadUser : uploadImg} alt="" />}
            </div>
            <button onClick={handleButtonClick} className="flex justify-between items-center underline gap-[2px] text-[#F23F39]">
                <h5>Add Photo</h5>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.61996 11.375H3.37996C1.97996 11.375 1.08996 10.54 1.00996 9.145L0.749965 5.02C0.709965 4.395 0.924965 3.795 1.35496 3.34C1.77996 2.885 2.37996 2.625 2.99996 2.625C3.15996 2.625 3.31496 2.53 3.38996 2.38L3.74996 1.665C4.04496 1.08 4.78496 0.625 5.42996 0.625H6.57496C7.21996 0.625 7.95496 1.08 8.24996 1.66L8.60996 2.39C8.68496 2.53 8.83496 2.625 8.99996 2.625C9.61996 2.625 10.22 2.885 10.645 3.34C11.075 3.8 11.29 4.395 11.25 5.02L10.99 9.15C10.9 10.565 10.035 11.375 8.61996 11.375ZM5.42996 1.375C5.05996 1.375 4.58996 1.665 4.41996 2L4.05996 2.72C3.84996 3.125 3.44496 3.375 2.99996 3.375C2.57996 3.375 2.18996 3.545 1.89996 3.85C1.61496 4.155 1.46996 4.555 1.49996 4.97L1.75996 9.1C1.81996 10.11 2.36496 10.625 3.37996 10.625H8.61996C9.62996 10.625 10.175 10.11 10.24 9.1L10.5 4.97C10.525 4.555 10.385 4.155 10.1 3.85C9.80997 3.545 9.41996 3.375 8.99996 3.375C8.55496 3.375 8.14996 3.125 7.93996 2.73L7.57496 2C7.40996 1.67 6.93996 1.38 6.56996 1.38H5.42996V1.375Z"
                        fill="#F23F39"
                    />
                    <path
                        d="M6.75 4.375H5.25C5.045 4.375 4.875 4.205 4.875 4C4.875 3.795 5.045 3.625 5.25 3.625H6.75C6.955 3.625 7.125 3.795 7.125 4C7.125 4.205 6.955 4.375 6.75 4.375Z"
                        fill="#F23F39"
                    />
                    <path
                        d="M6 9.375C4.895 9.375 4 8.48 4 7.375C4 6.27 4.895 5.375 6 5.375C7.105 5.375 8 6.27 8 7.375C8 8.48 7.105 9.375 6 9.375ZM6 6.125C5.31 6.125 4.75 6.685 4.75 7.375C4.75 8.065 5.31 8.625 6 8.625C6.69 8.625 7.25 8.065 7.25 7.375C7.25 6.685 6.69 6.125 6 6.125Z"
                        fill="#F23F39"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Upload;
