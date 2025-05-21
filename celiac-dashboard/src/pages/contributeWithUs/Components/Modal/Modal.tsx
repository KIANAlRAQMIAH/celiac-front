import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../../../components/Icon/IconX';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAddStrategicPartnershipsMutation, useUpdateStrategicPartnershipsMutation } from '../../../../api/AboutUsSlice/CommitteesSlice';

type Material = {
    id?: number;
    partnership_type: string;
    partnership_fees: string;
    partnership_benefits: string;
};

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    material?: Material;
    onSave: () => void;
};

const Modal = ({ open, setOpen, material, onSave }: Props) => {
    const [addPartnership, { isLoading: isLoadingAdd }] = useAddStrategicPartnershipsMutation();
    const [updatePartnership, { isLoading: isLoadingUpdate }] = useUpdateStrategicPartnershipsMutation();
    const { t } = useTranslation();

    const [formData, setFormData] = useState<Material>({
        partnership_type: '',
        partnership_fees: '',
        partnership_benefits: '',
    });

    useEffect(() => {
        if (material) {
            setFormData({
                partnership_type: material.partnership_type,
                partnership_fees: material.partnership_fees,
                partnership_benefits: material.partnership_benefits,
            });
        } else {
            setFormData({
                partnership_type: '',
                partnership_fees: '',
                partnership_benefits: '',
            });
        }
    }, [material]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!['Official Partner', 'Platinum Partner', 'Gold Partner'].includes(formData.partnership_type)) {
            toast.error('Invalid partnership type');
            return;
        }

        try {
            if (material?.id) {
                toast.info('Updating partnership...');
                await updatePartnership({ id: material.id, formData }).unwrap();
                toast.success('Partnership updated successfully');
            } else {
                toast.info('Adding partnership...');
                await addPartnership(formData).unwrap();
                toast.success('Partnership added successfully');
                setFormData({
                    partnership_type: '',
                    partnership_fees: '',
                    partnership_benefits: '',
                });
            }
            onSave();
            setOpen(false);
        } catch (error) {
            toast.error('Failed to save partnership');
        }
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" open={open} onClose={() => setOpen(false)}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[100] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h5 className="text-lg font-bold">{t(material ? 'تعديل' : 'اضافة ')}</h5>
                                    <button type="button" className="text-white-dark hover:text-dark" onClick={() => setOpen(false)}>
                                        <IconX />
                                    </button>
                                </div>

                                <form className="p-5 modal-form" onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">{t('Partnership Type')}</label>
                                        <select
                                            name="partnership_type"
                                            value={formData.partnership_type}
                                            onChange={handleChange}
                                            className="form-select mt-1 block w-full"
                                            required
                                        >
                                            <option value="">من فضلك اختر نوع الشراكة</option>
                                            <option value="Official Partner">الشركاء الرسميين</option>
                                            <option value="Platinum Partner">الشركاء البلاتينيين</option>
                                            <option value="Gold Partner">الشركاء الذهبيين</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">{t('Partnership Fees')}</label>
                                        <input
                                            type="text"
                                            name="partnership_fees"
                                            value={formData.partnership_fees}
                                            onChange={handleChange}
                                            className="form-input mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">المميزات</label>
                                        <textarea
                                            name="partnership_benefits"
                                            value={formData.partnership_benefits}
                                            onChange={handleChange}
                                            className="form-textarea mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setOpen(false)}>
                                            {t('Close')}
                                        </button>
                                        <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" disabled={isLoadingAdd || isLoadingUpdate}>
                                            {t('Save')}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
