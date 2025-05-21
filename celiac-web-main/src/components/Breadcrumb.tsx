import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";

export default function Breadcrumb({ items = [{ title: "", link: "" }] }) {
    const breadcrumbItems = items.map((item, index) => (
        <span key={index} className={index === items.length - 1 ? 'text-gray-500' : 'text-[#001F15]'}>
            {index !== items.length - 1 ? (
                <Link href={item.link}>{item.title}</Link>
            ) : (
                item.title
            )}
        </span>
    ));

    return (
        <div className='py-[20px] '>
            <Breadcrumbs separator={<IoIosArrowBack color='#019867' />} separatorMargin="xs" className=' flex items-center text-[12px]  md:text-[16px] flex-wrap '>
                {breadcrumbItems}
            </Breadcrumbs>
        </div>
    );
}
