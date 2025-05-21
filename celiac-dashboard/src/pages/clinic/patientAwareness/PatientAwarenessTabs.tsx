import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Loader from '../../../components/Loader';
import { usePermissions } from '../../../utils/permissions';
import Error404 from '../../../components/Layouts/Error404';
import { useGetGuidanceManualQuery } from '../../../api/ClinicSlice/GuidanceManualSlice';
import GenenralComponent from '../guidanceManual/GenenralComponent';
import GlutenSensitivityComponent from '../guidanceManual/GlutenSensitivityComponent';
import FilesPatient from './PatientAwarenessComponents/FilesPatient';
import ArticlesPatient from './PatientAwarenessComponents/ArticlesPatient';
import VideosPatient from './PatientAwarenessComponents/VideosPatient';

function PatientAwarenessTabs() {

    const {canRead , isLoading:isLoadingPermissions} = usePermissions();


    return (
        <>
            <Tab.Group>
                <Tab.List className="m-3 flex flex-wrap">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'border-b !border-secondary text-secondary !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:text-secondary`}
                            >
                                ملفات
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'border-b !border-secondary text-secondary !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:text-secondary`}
                            >
                                مقالات
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'border-b !border-secondary text-secondary !outline-none' : ''} -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:text-secondary`}
                            >
                                فيديوهات
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <FilesPatient />
                    </Tab.Panel>
                    <Tab.Panel>
                        <ArticlesPatient/>
                    </Tab.Panel>
                    <Tab.Panel>
                        <VideosPatient/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </>
    );
}

export default PatientAwarenessTabs;
