import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconHome from '../../components/Icon/IconHome';
import { Flex, Indicator } from '@mantine/core';
import IconSearch from '../../components/Icon/IconSearch';
import IconPlus from '../../components/Icon/IconPlus';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Modal from './Components/Modal/Modal';
import IconEdit from '../../components/Icon/IconEdit';
import IconTrash from '../../components/Icon/IconTrash';
import { useDeleteStrategicPartnershipsMutation, useGetStrategicPartnershipsQuery } from '../../api/AboutUsSlice/CommitteesSlice';
import { toast } from 'react-toastify';
import { usePermissions } from '../../utils/permissions';

type IpartnerShip = {
    id: number;
    name: string;
    bg_color: string;
    text_color: string;
    partnership_type: string;
    partnership_fees: string;
    partnership_benefits: string;
};

type Props = {};

const StrategicPartnerships = (props: Props) => {
    const [page, setPage] = useState<number>(1);
    const { canCreate, canRead, canUpdate, canDelete, isLoading: isLoadingPermissions } = usePermissions();//@ts-ignore
    const { data, isSuccess, refetch } = useGetStrategicPartnershipsQuery(page);
    const [deletePartnership] = useDeleteStrategicPartnershipsMutation();
    const { t } = useTranslation();

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [rowData, setRowData] = useState<IpartnerShip[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<IpartnerShip | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (isSuccess && data) {
            setRowData(data.data);
            setTotalRecords(data.meta.total);
            setTotalPages(data.meta.last_page);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);



    const fetchData = () => {
        refetch();
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePartnership({ id }).unwrap();
            toast.success('Partnership deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete partnership');
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <Modal open={open} setOpen={setOpen} material={selectedMaterial} onSave={fetchData} />
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/home" className="text-primary hover:underline">
                        <IconHome />
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('StrategicPartnerships')}</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="panel">
                    <div className='flex justify-between'>
                        <div className="relative">
                            {/* <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-[#2F70D2]">
                                <IconSearch className="mx-auto" />
                            </button> */}
                        </div>
                        <button type="button" className="btn btn-outline-primary flex flex-row gap-2" onClick={() => { setSelectedMaterial(undefined); setOpen(true); }}>
                            <IconPlus /> {t('AddStrategicPartnership')}
                        </button>
                    </div>
                    <div className="datatables mt-5">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th>{t('id')}</th>
                                    <th>{t('Partnership Type')}</th>
                                    <th>{t('Partnership Fees')}</th>
                                    <th>{t('partnership_benefits')}</th>
                                    <th>{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data.map((record: any) => (
                                    <tr key={record.id}>
                                        <td>{record.id}</td>
                                        <td>{record.partnership_type}</td>
                                        <td>{record.partnership_fees}</td>
                                        <td>{record.partnership_benefits}</td>

                                        <td>
                                            <button onClick={() => { setSelectedMaterial(record); setOpen(true); }}><IconEdit className="w-6 h-6" /></button>
                                            <button onClick={() => handleDelete(record.id)}><IconTrash className="w-6 h-6" /></button>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <span>{`Showing ${Math.min((page - 1) * pageSize + 1, totalRecords)} to ${Math.min(page * pageSize, totalRecords)} of ${totalRecords} entries`}</span>
                            </div>
                            <div className="flex justify-between mt-4 m-7">
                                <button className="btn btn-outline-primary mx-2" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                                    السابق
                                </button>
                                <button className="btn btn-outline-primary mx-2" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                                    التالي
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrategicPartnerships;
