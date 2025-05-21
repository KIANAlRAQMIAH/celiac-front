import { Dialog, Transition } from '@headlessui/react';
import 'flatpickr/dist/flatpickr.css';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { showAlert } from '../../components/Error';
import IconSearch from '../../components/Icon/IconSearch';
import PdfFile from "../../../public/assets/images/pdfLofo.svg"
import { useAddBooksMutation, useDeleteBooksByIdMutation, useGetTranslatedBooksQuery, useUpdateBooksMutation } from '../../api/ClinicSlice/translatedBooksSlice';
import { Tab } from '@headlessui/react';
import FilesTab from './components/filesTab';
import ArticlesTab from './components/articlesTab';
const PatientAwareness = () => {
    // stateHooks
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [image, setImage] = useState<any>(null);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<any>(null);
    const [fileId, setfileId] = useState<number | null>(null);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState<any>('list');
    const [fileList, setfileList] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(fileList);
    //   ...
    const { data, status }: any = useGetTranslatedBooksQuery(0);
    const [addScientific, { isLoading: isLoadingGet }] = useAddBooksMutation();
    const [deletefileById] = useDeleteBooksByIdMutation();
    const [updateScientific, { isLoading: isLoadingEdit }] = useUpdateBooksMutation();
    const navigate = useNavigate()
    useEffect(() => {
        if (status === "rejected") {
            navigate("/");
        }
    }, [status, navigate]);

    useEffect(() => {
        if (data) {
            setfileList(data.data);
            setFilteredItems(data.data);
        }
    }, [data]);


    useEffect(() => {
        if (fileList.length > 0) {
            const filteredData = fileList.filter((item: any) => {
                const nameMatch = item.title.toLowerCase().includes(search.toLowerCase());
                return nameMatch;
            });
            setFilteredItems(filteredData);
        } else {
            setFilteredItems([]);
        }
    }, [search, fileList]);



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('OrganizationDirectors'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };




    const handleFilePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };


    const handleFileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiless = e.target.files[0];
            setImage(selectedFiless);
        } else {
            setImage(null);
        }
    };

    const handleEdit = (file: any) => {
        setfileId(file.id);
        setName(file.title);
        setDescription(file.description)
        setAuthorName(file.author_name)
        setImage(null);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', name);
            formData.append('author_name', authorName);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }
            if (file) {
                formData.append('file', file);
            }


            // for (let [key, value] of formData.entries()) {
            // }

            if (editing && fileId) {
                const response = await updateScientific({
                    FileId: fileId,
                    formData: formData,
                }).unwrap();
                showAlert("Edit", "تم التغيير بنجاح");
            } else {
                const response = await addScientific(formData).unwrap();
                showAlert("Added", "تم الاضافه بنجاح");
            }
            setModalOpen(false);
            clearForm();
        } catch (error) {
            // @ts-ignore
            showAlert("error", "هناك خطأ");
        }
    };


    const clearForm = () => {
        setName('');
        setDescription('')
        setAuthorName('')
        setName('');
        setFile(null);
        setImage(null)
        setfileId(null);
    };


    const deletefile = async (id: any) => {
        try {

            swal({
                title: "هل انت متأكد ؟؟",
                icon: "warning",
                buttons: ["الغاء", "حذف"],
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {

                    await deletefileById(id).unwrap();
                    setfileList(fileList.filter((file: any) => file.id !== id));
                    showAlert('Deleted', "تم المسح بنجاح");
                } else {

                    swal("لم يتم الحذف");
                }
            });
        } catch (error) {
            // console.error('Error deleting user:', error);
        }
    };


    const addfile = () => {
        setModalOpen(true);
        clearForm();
        setEditing(false);
    };
    return (
        <div>

            <Tab.Group>
                <Tab.List className="mt-3 flex flex-wrap border-b-solid border-b-[1px] border-b-[#E0E6ED]">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'border-b !border-[#019867] text-[#019867] !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:!border-[#019867] hover:text-[#019867]`}
                            >
                                الملفات
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'border-b !border-[#019867] text-[#019867] !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:!border-[#019867] hover:text-[#019867]`}
                            >
                                مقالات
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'border-b !border-[#019867] text-[#019867] !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:!border-[#019867] hover:text-[#019867]`}
                            >
                                مقاطع الفيديو
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <FilesTab />
                    </Tab.Panel>
                    <Tab.Panel>
                        <ArticlesTab />
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="pt-5">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum.
                            </p>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

        </div>
    );
};

export default PatientAwareness;
