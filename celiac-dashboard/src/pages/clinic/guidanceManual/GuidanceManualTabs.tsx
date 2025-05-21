import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useGetGuidanceManualQuery } from '../../../api/ClinicSlice/GuidanceManualSlice';
import GenenralComponent from './GenenralComponent';
import GlutenSensitivityComponent from './GlutenSensitivityComponent';
import Loader from '../../../components/Loader';
import { usePermissions } from '../../../utils/permissions';
import Error404 from '../../../components/Layouts/Error404';

function GuidanceManualTabs() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetGuidanceManualQuery({currentPage});
    const {canRead , isLoading:isLoadingPermissions} = usePermissions();


    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };


    if (isLoading || isLoadingPermissions ) {
        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        );
    }
    if (!data || !data.meta) {
        return <p>No data available.</p>;
    }

     const GlutenSensitivityData = data.data.filter((item:any) => item.file_type_text === "حساسية الغلوتين");
     const GeneralData = data.data.filter((item:any) => item.file_type_text === "عام");

     if (!canRead('GuidanceManual')) {
        return <Error404 />;
      }
    return (
        <>
            <Tab.Group>
                <Tab.List className="m-3 flex flex-wrap">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'border-b !border-secondary text-secondary !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:text-secondary`}
                            >
                                عام
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'border-b !border-secondary text-secondary !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:text-secondary`}
                            >
                                حساسية الغلوتين
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <GenenralComponent GeneralData={GeneralData} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <GlutenSensitivityComponent GlutenSensitivityData={GlutenSensitivityData}  />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            <div className="flex justify-between mt-4 m-7">
                        <button className="btn btn-outline-primary mx-2" onClick={handlePrevPage} disabled={currentPage === 1}>
                            السابق
                        </button>
                        <button className="btn btn-outline-primary mx-2" onClick={handleNextPage} disabled={data?.meta.current_page === data?.meta.last_page}>
                            التالي
                        </button>
                    </div>
        </>
    );
}

export default GuidanceManualTabs;
