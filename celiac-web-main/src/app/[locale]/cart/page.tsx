import React from 'react'

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { Divider } from '@mantine/core';
import CartProduct from './_components/cartSingleProduct';

function Clinic() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "السلة", link: "/ar/cart" },
    ];

    return (
        <div className='container pb-[50px]'>
            <Breadcrumb items={breadcrumbData} />
            <CartProduct />
        </div>
    )
}

export default Clinic
