"use client"
import React, { useEffect, useState } from 'react';
import { Button, Box, TextInput, Textarea } from '@mantine/core';
import Image from 'next/image';
import inputImg from "../../../public/saudiaFlag.png";
import { usePostContactUsMutation } from '@/api/HomeApiSlice';
import { CustomDropDown } from '../customDropDown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUsForm = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>(''); 
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submittedValues, setSubmittedValues] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countryCode, setCountryCode] = useState<string>("+966");


  

  const value = (
    <div className="flex justify-center items-center gap-1 ">
      <div className="text-[#001F15]">+966</div>
      <Image src={inputImg} alt="saudiaFlag" height={30} width={27} />
    </div>
  );

  const handleSelectedNumber = (countryCode: string) => {
    setCountryCode(countryCode);
  };

  const [postContactUsMutation ] = usePostContactUsMutation();

 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: { [key: string]: string } = {};
    if (!name.trim()) {
      errors['name'] = 'يجب إدخال الإسم بشكل صحيح';
    } else if (name.trim().length < 3 || name.trim().length > 25) {
      errors['name'] = 'ادخل الإسم كاملا';
    } else if (!/^[ء-يa-zA-Z\s]*$/.test(name.trim())) {
      errors['name'] = 'يجب إدخال الإسم بشكل صحيح';
    }
    if (!phone.trim()) {
      errors['phone'] = 'ادخل رقم الجوال';
    } else if (!/^\d{7,15}$/.test(phone.trim())) {
      errors['phone'] = 'يجب إدخال رقم الجوال بشكل صحيح';
    }
    if (!email.trim()) {
      errors['email'] = 'ادخل البريد الإلكتروني';
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errors['email'] = 'يجب إدخال البريد الإلكتروني بشكل صحيح';
    }
    if (!message.trim()) {
      errors['message'] = 'يجب كتابة استفسارك';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await postContactUsMutation({
        name,
        country_code: countryCode,
        phone: +phone,
        email,
        message,
      });

      if ('data' in response && response.data) {
        const responseData = {
          ...response.data,
          country_code: countryCode,
        };
  
        toast.success('تم الارسال بنجاح');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setErrors({});
      } else {
       
        toast.error('فشل في الإرسال, حاول مره أخري');
        console.error('Error:', response);
      }
    } catch (error) {
     
      toast.error('فشل في الإرسال , حاول مره أخري');
      console.error('Error:', error);
    }
  };

  return (
    <Box className='w-full'>
     
      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="ادخل الإسم كاملا"
          className='my-5'
          radius={40}
          size="lg"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors['name']}
        />

        <TextInput
          type='number'
          className="input_container"
          size="lg"
          radius={40}
          placeholder="ادخل رقم الجوال"
          value={phone}
          onChange={(event: any) => setPhone(event.target.value)}
          rightSection={<CustomDropDown initShowflagAndNum={value} onSelectNumber={handleSelectedNumber} />}
          error={errors['phone']}
        />

        <TextInput
          type="email"
          placeholder="ادخل البريد الإلكتروني"
          autoComplete="email"
          className='my-5'
          radius={40}
          size="lg"
          value={email}
          onChange={(event: any) => setEmail(event.target.value)}
          error={errors['email']}
        />

        <Textarea
          placeholder="أكتب نص الرسالة هنا"
          radius="lg"
          size="lg"
          value={message}
          onChange={(event: any) => setMessage(event.target.value)}
          error={errors['message']}
        />

        <Button radius={40} type="submit" mt="xl" size="xl" className='w-full border-[#019867] bg-[#019867] text-white hover:bg-white hover:text-[#019867]'>
          ارسال
        </Button>
      </form>

   
    </Box>
    
  );
}

export default ContactUsForm;
