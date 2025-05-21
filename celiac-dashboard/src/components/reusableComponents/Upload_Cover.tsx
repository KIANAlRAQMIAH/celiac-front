import React, { useRef, useState } from "react";


import uploadImg from '../../assets/img/upload-img-field-icon.svg'
import uploadPdf from '../../assets/img/upload-pdf-icon.svg'
import { IoClose } from "react-icons/io5";
import { PhotoView } from "react-photo-view";

type UploadImageProps = {
  user?: boolean;
  setFile: React.Dispatch<React.SetStateAction<File | File[] |null>>;
  editImgUrl?: string | null;
  cover?:boolean
  multi?:boolean
  label?:string
  acceptType?:string
};
const Upload_cover = (props: UploadImageProps) => {

 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
const imgPreview = useRef<HTMLImageElement>(null)
  const handleButtonClick = () => {
    
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImgPrevClick = () => {

    if (imgPreview.current) {
      imgPreview.current.click();
    }
  };

  const handleRemoveImg = (index:number) =>{
    setImageList(imageList.filter((_, i) => i !== index))

    const newFiles = files.filter((_, i) => i !== index)


    setFiles(newFiles)

    if (props.multi) {
      props.setFile(Array.from(newFiles));
    } else {
     
      props.setFile(newFiles[0]);
     
    }
  }

 
  console.log("imagurl files" , imageList)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files?.length > 0) {

      setFiles(Array.from(files))
      const file = files[0];
      if (props.multi) {
        props.setFile(Array.from(files));
      } else {
       
        props.setFile(file);
       
      }

      const urls =  Array.from(files).map((imgfile)=> {
       return URL.createObjectURL(imgfile)
       })
      //  const urls = Array.from(files).map(file => URL.createObjectURL(file));

       setImageList(urls)
     
    }
  };

  console.log(imageList)
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <input
        type="file"
        multiple={props.multi? true: false}
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept={`${props.acceptType? props.acceptType:"image/*"}`}
        
      />

      <div   className="flex gap-7">
        <div onClick={handleButtonClick} className="flex bg-white p-4 gap-4 items-center rounded-[8px] w-[300px] border border-gray-300">
        <img src={ props.acceptType === ".pdf" ? uploadPdf :uploadImg} alt="upload imag" className="w-5 h-5"   />
          {files.length > 0? <p>{files[0].name}</p> : "No file Chosen"}
        </div>

        {/* <button type="button"  onClick={handleButtonClick}  className="flex bg-[#f9f9f9] p-8 gap-4 items-center rounded-[8px] text-[#5079b8]"><IoMdAdd className="size-6" /></button> */}
      </div> 

{/* <div   className="flex gap-7">
        <div onClick={handleButtonClick} className="flex bg-[#f9f9f9] p-8 gap-4 items-center rounded-[8px] text-[#5079b8]">
        <IoCloudUploadOutline className="size-6"  />
          <p>Upload your data here with high quality</p>
        </div>

        <button type="button"  onClick={handleButtonClick}  className="flex bg-[#f9f9f9] p-8 gap-4 items-center rounded-[8px] text-[#5079b8]"><IoMdAdd className="size-6" /></button>
      </div>  */}

     <div className="flex gap-4 flex-wrap relative">

      {imageList.length > 0  && props.acceptType !== ".pdf" ? imageList.map((imgUrl, index:number)=>(
 <div key={imgUrl} className="rounded-[8px] w-[100px] h-[70px] relative">
  <div className="overlay  rounded-[8px]" onClick={handleImgPrevClick} ></div>
  <div className="z-50 absolute top-0 right-0 mx-2 my-2 " ><button type="button" onClick={ ()=>handleRemoveImg(index)} ><IoClose className="size-7 text-[red]" /></button></div>
 <PhotoView src={imgUrl}  >
   
   {/* <img src={layout?.original_url} alt="" className="w-[50px] text-left  h-[50px] rounded-full" /> */}
   <img ref={imgPreview} src={imgUrl} alt="uploaded image" className="w-full object-cover rounded-[8px] h-full object"/>
</PhotoView>
 </div>
      )) : props.editImgUrl && ( <div  className="rounded-[8px] w-[100px] h-[70px] relative">
        <div className="overlay  rounded-[8px]" onClick={handleImgPrevClick} ></div>
        <div className="z-50 absolute top-0 right-0 mx-2 my-2 " ><button type="button"  ></button></div>
       <PhotoView src={props.editImgUrl}  >
         
         {/* <img src={layout?.original_url} alt="" className="w-[50px] text-left  h-[50px] rounded-full" /> */}
         <img ref={imgPreview} src={props.editImgUrl} alt="uploaded image" className="w-full object-cover rounded-[8px] h-full object"/>
      </PhotoView>
       </div>)}
     
     </div>

      {/* <div
        onClick={handleButtonClick}
        className="flex cursor-pointer  lg:w-[220px] h-[120px] rounded-2xl border-[1px] border-black hover:border-[#EFB93F] border-solid justify-center items-center "
      >
        {props.editImgUrl? <img className="w-full h-full rounded-2xl object-cover" src={`${props?.editImgUrl}`}/> : <> {
          imageSrc ? (
            <img
              src={imageSrc}
              alt="Uploaded"
              className="w-full h-full rounded-2xl object-cover"
            />
          ) : (
            <img
              src={props.user ? uploadUser : uploadImg}
              alt=""
              className="w-[30%]"
            />
          )}
          </>
        }
      </div> */}

      {/* <button
        onClick={handleButtonClick}
        className="flex justify-between items-center  gap-[2px] "
      >
        <div className="flex flex-col">
          
          <div className="flex items-center gap-1  ">

            {props.label? (  <h5>{t(`${props.label}`)} </h5>):(  <h5>{t("tableForms.labels.upload")} </h5>)}
          
          
          </div>
        </div>
      </button> */}
    </div>
  );
};

export default Upload_cover;
