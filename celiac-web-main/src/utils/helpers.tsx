import { z } from "zod"

export const residencySchema =    z
.string().startsWith("1", { message: "رقم الاقامه لابد ان يبدا ب 1" })
.min(9, {message: "يجب إدخال رقم الاقامه مكون من تسعة أرقام"})
.max(15, "يجب إدخال 15 رقما فقط")
export const civilIdSchema =  z
.string().startsWith("2", " رقم الهوية لابد انا يبدا ب 2")
.min(10, "يجب إدخال رقم هويه لا يقل عن 10 أرقام ")
.max(10, "يجب إدخال 10 أرقام فقط")

export const cartPrice =  z
.string()
.min(1, "ادخل مبلغ التبرع ")



export const formSchema = z
  .object({
    name: z
      .string()
      .nonempty("يجب إدخال الإسم بشكل صحيح")
      .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
      .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
    address: z
      .string()
      .nonempty("يجب إدخال مكان الاقامه بشكل صحيح")
      .min(3, "مكان الاقامه يجب أن يكون أكبر من ثلاثة أحرف")
      .max(25, "مكان الاقامه يجب أن يكون أقل من 25 حرف"),
    phone: z
      .string()
      .min(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام").max(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام فقط")
      .startsWith("5", " 5xxxxxxxx   الرقم لابد أن يكون مثل ذلك "),
    email: z.string().email("يجب إدخال البريد الإلكتروني بشكل صحيح"),
    dob: z.date({
      required_error: "قم ب إدخال تاريخ الميلاد",
      invalid_type_error: "قم ب إدخال تاريخ الميلاد",
    }),
  
    is_saudi: z.boolean(),



  })


  export const validateSchema = (schema:any)=>{
    return z.object({
      full_name: z
      .string()
      .nonempty("يجب إدخال الإسم بشكل صحيح")
      .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
      .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
    // address: z
    //   .string()
    //   .nonempty("يجب إدخال مكان الاقامه بشكل صحيح")
    //   .min(3, "مكان الاقامه يجب أن يكون أكبر من ثلاثة أحرف")
    //   .max(25, "مكان الاقامه يجب أن يكون أقل من 25 حرف"),
    phone: z
      .string()
      .min(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام").max(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام فقط")
      .startsWith("5", " 5xxxxxxxx   الرقم لابد أن يكون مثل ذلك "),
    email: z.string().email("يجب إدخال البريد الإلكتروني بشكل صحيح"),
    dob: z.date({
      required_error: "قم ب إدخال تاريخ الميلاد",
      invalid_type_error: "قم ب إدخال تاريخ الميلاد",
    }),
  
    // is_saudi: z.boolean(),

    ...schema    })
  }

  export const formatDateToString = ((dob: Date | null) =>{

    const formattedDate = `${new Date(
        //@ts-ignore
       dob
      ).getFullYear()}-${
        //@ts-ignore
        new Date(dob).getMonth() + 1
        //@ts-ignore
        }-${new Date(dob).getDate()}`;
        return formattedDate
      
  })