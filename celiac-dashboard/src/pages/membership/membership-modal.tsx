import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useAddMemberShipMutation, useUpdateMemberShipMutation } from '../../api/AboutUsSlice/CommitteesSlice';
import { toast } from 'react-toastify';

type AddMembershipModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedMaterial?: any;
};

const AddMembershipModal: React.FC<AddMembershipModalProps> = ({ open, setOpen, selectedMaterial }) => {
    const [formData, setFormData] = useState({
        price: 100,
        names: [{ name: '' }],
        type: ''
    });

    const [addMemberShip] = useAddMemberShipMutation();
    const [updateMemberShip] = useUpdateMemberShipMutation();

    useEffect(() => {
        if (selectedMaterial) {
            setFormData({
                price: selectedMaterial.price || 100,
                names: selectedMaterial.names && selectedMaterial.names.length > 0 ? selectedMaterial.names : [{ name: '' }],
                type: selectedMaterial.type || ''
            });
        } else {
            setFormData({
                price: 100,
                names: [{ name: '' }],
                type: ''
            });
        }
    }, [selectedMaterial]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        const { name, value } = e.target;
        if (name === 'benefit' && index !== undefined) {
            const newnames = [...formData.names];
            newnames[index].name = value;
            setFormData({ ...formData, names: newnames });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddBenefit = () => {
        setFormData({ ...formData, names: [...formData.names, { name: '' }] });
    };

    const handleRemoveBenefit = (index: number) => {
        const newnames = formData.names.filter((_, i) => i !== index);
        setFormData({ ...formData, names: newnames });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                price: formData.price,
                type: formData.type,
                names: formData.names.map(benefit => benefit.name)
            };

            if (selectedMaterial) {
                // Update existing membership
                await updateMemberShip({ id: selectedMaterial.id, ...payload, price: String(payload.price) }).unwrap();
                toast.success('تم تحديث العضوية بنجاح');
            } else {
                // Add new membership
                await addMemberShip(payload).unwrap();
                toast.success('تم إضافة العضوية بنجاح');
            }
            setOpen(false);
        } catch (error) {
            toast.error('فشل في حفظ العضوية');
        }
    };

    return (
        <Transition show={open} as={Fragment}>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">نوع العضوية</label>
                                        <input
                                            type="text"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="form-input mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">رسوم العضوية</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="form-input mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">فوائد العضوية</label>
                                        {formData.names.map((benefit, index) => (
                                            <div key={index} className="flex items-center mb-2">
                                                <input
                                                    type="text"
                                                    name="benefit"
                                                    value={benefit.name}
                                                    onChange={(e) => handleChange(e, index)}
                                                    className="form-input mt-1 block w-full"
                                                    required
                                                />
                                                <button type="button" className="btn btn-outline-danger ml-2" onClick={() => handleRemoveBenefit(index)}>
                                                    حذف
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-outline-primary mt-2" onClick={handleAddBenefit}>
                                            إضافة فائدة
                                        </button>
                                    </div>
                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setOpen(false)}>
                                            إغلاق
                                        </button>
                                        <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            حفظ
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

export default AddMembershipModal;
