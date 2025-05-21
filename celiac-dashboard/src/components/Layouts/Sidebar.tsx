import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import { useGetGovernanceListsQuery } from '../../api/AboutUsSlice/GovernanceSlice';
import { usePermissions } from '../../utils/permissions';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [currentMenuHajj, setCurrentMenuHajj] = useState(false);
    const [currentMenuFoodBasket, setCurrentFoodMenue] = useState(false);
    const [errorSubMenu1, setErrorSubMenu1] = useState(false);
    const [errorSubMenu2, setErrorSubMenu2] = useState(false);
    const [errorSubMenu3, setErrorSubMenu3] = useState(false);
    const [errorSubMenu0, setErrorSubMenu0] = useState(false);
    const [errorSubMenu01, setErrorSubMenu01] = useState(false);
    const [errorSubMenu4, setErrorSubMenu4] = useState(false);
    const [errorSubMenu5, setErrorSubMenu5] = useState(false);
    const [errorSubMenu6, setErrorSubMenu6] = useState(false);
    const [errorSubMenu7, setErrorSubMenu7] = useState(false);
    const [errorSubMenu, setErrorSubMenu] = useState(false);

    const { data: GovernanceListData }: any = useGetGovernanceListsQuery();
    const { canRead } = usePermissions();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/home" className="main-logo flex items-center shrink-0">
                            <img className="w-36 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <NavLink to="/home">
                                    <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                        <div className="flex items-center">
                                            <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                        </div>
                                    </button>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <ul>
                                    {/* users */}
                                    {canRead('User') && (
                                        <li className="nav-item">
                                            <NavLink to="/users" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('users')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )}
                                    {/* ...About us */}
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'page' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('page')}>
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('ِAboutUS')}</span>
                                            </div>

                                            <div className={currentMenu !== 'page' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>
                                        <AnimateHeight duration={300} height={currentMenu === 'page' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-400">
                                                {canRead('AboutSettings') && (
                                                    <li>
                                                        <NavLink to="/aboutUs/aboutAssociation">{t('AboutTheAssociation')}</NavLink>
                                                    </li>
                                                )}
                                                {canRead('CommitteeMember') && (
                                                    <li>
                                                        <NavLink to="/aboutUs/committieMembers">{t('Committees')}</NavLink>
                                                    </li>
                                                )}
                                                <li className="menu nav-item">
                                                    <button
                                                        style={{ fontWeight: 'bold' }}
                                                        type="button"
                                                        className={`${errorSubMenu1 ? 'open' : ''
                                                            } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                        onClick={() => setErrorSubMenu1(!errorSubMenu1)}
                                                    >
                                                        {t('BoardOfDirectors')}
                                                        <div className={`${errorSubMenu1 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                            <IconCaretsDown fill={true} className="w-4 h-4" />
                                                        </div>
                                                    </button>
                                                    <AnimateHeight duration={300} height={errorSubMenu1 ? 'auto' : 0}>
                                                        <ul className="sub-menu text-gray-400">
                                                            {canRead('BoardDirectorMember') && (
                                                                <li>
                                                                    <NavLink to="/aboutUs/boardDirector">{t('directorsBoardMembers')}</NavLink>
                                                                </li>
                                                            )}
                                                            {canRead('BoardDirectorMeeting') && (
                                                                <li>
                                                                    <NavLink to="/aboutUs/boradDirectorsFiles">{t('directorsBoardMOM')}</NavLink>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </AnimateHeight>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                        {/* ... */}
                                        <AnimateHeight duration={300} height={currentMenu === 'page' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-400">
                                                <li className="menu nav-item">
                                                    <button
                                                        style={{ fontWeight: 'bold' }}
                                                        type="button"
                                                        className={`${errorSubMenu2 ? 'open' : ''
                                                            } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                        onClick={() => setErrorSubMenu2(!errorSubMenu2)}
                                                    >
                                                        {t('generalAssembly')}
                                                        <div className={`${errorSubMenu2 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                            <IconCaretsDown fill={true} className="w-4 h-4" />
                                                        </div>
                                                    </button>
                                                    <AnimateHeight duration={300} height={errorSubMenu2 ? 'auto' : 0}>
                                                        <ul className="sub-menu text-gray-400">
                                                            {canRead('GeneralAssemblyMember') && (
                                                                <li>
                                                                    <NavLink to="/aboutUs/generalAssemblyMember">{t('generalAssemblyMembers')}</NavLink>
                                                                </li>
                                                            )}
                                                            {canRead('GeneralAssemblyMeeting') && (
                                                                <li>
                                                                    <NavLink to="/aboutUs/generalAssemblyFiles">{t('generalAssemblyMOM')}</NavLink>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </AnimateHeight>
                                                </li>
                                                {canRead('OrganizationalStructureMember') && (
                                                    <li>
                                                        <NavLink to="/aboutUs/organizationChart">{t('organizationalChart')}</NavLink>
                                                    </li>
                                                )}
                                                {canRead('Committee') && (
                                                    <li>
                                                        <NavLink to="/aboutUs/committeesSpecialties">{t('committeesSpecialties')}</NavLink>
                                                    </li>
                                                )}
                                                <li className="menu nav-item">
                                                    <button
                                                        style={{ fontWeight: 'bold' }}
                                                        type="button"
                                                        className={`${errorSubMenu3 ? 'open' : ''
                                                            } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                        onClick={() => setErrorSubMenu3(!errorSubMenu3)}
                                                    >
                                                        {t('Governance')}
                                                        <div className={`${errorSubMenu3 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                            <IconCaretsDown fill={true} className="w-4 h-4" />
                                                        </div>
                                                    </button>

                                                    <AnimateHeight duration={300} height={errorSubMenu3 ? 'auto' : 0}>
                                                        {canRead('GovernanceList') && (
                                                            <ul className="sub-menu text-gray-400 ">
                                                                {GovernanceListData &&
                                                                    GovernanceListData.data.map((address: any) => (
                                                                        <li key={address.id}>
                                                                            <Link to={`/aboutUs/governance/${address.id}`}>{t(address?.name)}</Link>
                                                                        </li>
                                                                    ))}
                                                            </ul>
                                                        )}
                                                    </AnimateHeight>
                                                </li>
                                                <source />
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                </ul>
                            </li>
                            {/* ... */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'component' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component')}>
                                    <div className="flex items-center">
                                        <IconMenuComponents className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('homePage')}</span>
                                    </div>

                                    <div className={currentMenu !== 'component' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'component' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-400">
                                        {canRead('MedicalConsulting') && (
                                            <li>
                                                <NavLink to="/home/mediaCenterNews">{t('MediaCenterNews')}</NavLink>
                                            </li>
                                        )}
                                        {canRead('Partner') && (
                                            <li>
                                                <NavLink to="/home/partners">{t('Partners')}</NavLink>
                                            </li>
                                        )}
                                        {canRead('Banner') && (
                                            <li>
                                                <NavLink to="/home/banner">{t('banner')}</NavLink>
                                            </li>
                                        )}
                                        {canRead('ContactUs') && (
                                            <li>
                                                <NavLink to="/home/contact">{t('ContactUs')}</NavLink>
                                            </li>
                                        )}
                                        {canRead('Donation') && (
                                            <li>
                                                <NavLink to="/home/donations">{t('Donations')}</NavLink>
                                            </li>
                                        )}
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'component2' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component2')}>
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">الاعدادات</span>
                                    </div>

                                    <div className={currentMenu !== 'component2' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'component2' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-400">
                                        {canRead('Admin') && (
                                            <li>
                                                <NavLink to="/admins">المتحكمون</NavLink>
                                            </li>
                                        )}
                                        {canRead('Role') && (
                                            <li>
                                                <NavLink to="/Roles">الادوار والسماحيه</NavLink>
                                            </li>
                                        )}
                                    </ul>
                                </AnimateHeight>
                            </li>
                            {/* Clinic */}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'datalabel' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('datalabel')}>
                                    <div className="flex items-center">
                                        <IconMenuDatatables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('clinic')}</span>
                                    </div>

                                    <div className={currentMenu !== 'datalabel' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'datalabel' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-400">
                                        {canRead('ScientificResearch') && (
                                            <li>
                                                <NavLink to="/clinic/scientificResearch">{t('scientificResearch')}</NavLink>
                                            </li>
                                        )}
                                        {canRead('TranslatedBook') && (
                                            <li>
                                                <NavLink to="/clinic/translatedBooks">{t('TranslatedBooks')}</NavLink>
                                            </li>
                                        )}
                                        {/* <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${errorSubMenu ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu(!errorSubMenu)}
                                            >
                                                المكتبة الصحية
                                                <div className={`${errorSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">


                                                </ul>
                                            </AnimateHeight>
                                        </li> */}
                                        {canRead('PatientAwareness') && (
                                            <li>
                                                <NavLink to="/clinic/reservation"> انشاء حجز </NavLink>
                                            </li>
                                        )}

                                        {canRead('PatientAwareness') && (
                                            <li>
                                                <NavLink to="/clinic/patientAwareness">توعية المرضى</NavLink>
                                            </li>
                                        )}
                                        {canRead('AboutTheDiseaseSettings') && (
                                            <li>
                                                <NavLink to="/clinic/aboutDiseaseSettings">حول إعدادات المرض</NavLink>
                                            </li>
                                        )}
                                        {/* {canRead('informationTreatment') && ( */}
                                        <li>
                                            <NavLink to="/clinic/informationTreatment">العــلاج</NavLink>
                                        </li>
                                        {/* )} */}

                                        <li>
                                            <NavLink to="/clinic/Inquiries">الأستفسارات</NavLink>
                                        </li>
                                        {canRead('Faq') && (
                                            <li>
                                                <NavLink to="/clinic/faq">الأسألة الشائعه</NavLink>
                                            </li>
                                        )}
                                        {canRead('GuidanceManual') && (
                                            <li>
                                                <NavLink to="/clinic/guidanceManual">دليل التوجيه</NavLink>
                                            </li>
                                        )}
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'services' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('services')}>
                                    <div className="flex items-center">
                                        <IconMenuDatatables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">الخدمات</span>
                                    </div>

                                    <div className={currentMenu !== 'services' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'services' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        {canRead('ScientificResearch') && (
                                            <li>
                                                <NavLink to="/services/sessions">الجلسات</NavLink>
                                            </li>
                                        )}
                                             <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${errorSubMenu7 ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu7(!errorSubMenu7)}
                                            >
الانشطة والبرامج                                                <div className={`${errorSubMenu7 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu7 ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {canRead('BoardDirectorMeeting') && (
                                                        <li>
                                                            <NavLink to="/services/events">الفعاليات </NavLink>
                                                        </li>
                                                    )}
                                                    {canRead('BoardDirectorMeeting') && (
                                                        <li>
                                                            <NavLink to="/services/cooking">التدريب على الطهى </NavLink>
                                                        </li>
                                                    )}
                                                    {canRead('BoardDirectorMeeting') && (
                                                        <li>
                                                            <NavLink to="/services/training">  التدريب والتاهيل </NavLink>
                                                        </li>
                                                    )}

                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${errorSubMenu0 ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu0(!errorSubMenu0)}
                                            >
                                                بطاقة سيلياك
                                                <div className={`${errorSubMenu0 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu0 ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {/* {canRead('BoardDirectorMember') && ( */}
                                                    <li>
                                                        <NavLink to="/services/celiacCard">الطلبات المعلقه</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                    {/* {canRead('BoardDirectorMeeting') && ( */}
                                                    <li>
                                                        <NavLink to="/services/CelaicCardOwners">مُلاك بطاقة سلياك</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${errorSubMenu ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu(!errorSubMenu)}
                                            >
                                                التوظيف
                                                <div className={`${errorSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {canRead('BoardDirectorMember') && (
                                                        <li>
                                                            <NavLink to="/services/pendingHiring">الطلبات المعلقه</NavLink>
                                                        </li>
                                                    )}
                                                    {canRead('BoardDirectorMeeting') && (
                                                        <li>
                                                            <NavLink to="/services/acceptHiring">الطلبات المقبوله</NavLink>
                                                        </li>
                                                    )}
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${currentMenuFoodBasket ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setCurrentFoodMenue(!currentMenuFoodBasket)}
                                            >
                                                السلال الغذائيه
                                                <div className={`${currentMenuFoodBasket ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={currentMenuFoodBasket ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {canRead('BoardDirectorMember') && (
                                                        <li>
                                                            <NavLink to="/services/pendingFoodBasket">الطلبات المعلقه</NavLink>
                                                        </li>
                                                    )}
                                                    {canRead('BoardDirectorMeeting') && (
                                                        <li>
                                                            <NavLink to="/services/acceptFoodBasket">الطلبات المقبوله</NavLink>
                                                        </li>
                                                    )}
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${currentMenuHajj ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setCurrentMenuHajj(!currentMenuHajj)}
                                            >
                                                الحج
                                                <div className={`${currentMenuHajj ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={currentMenuHajj ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {canRead('BoardDirectorMember') && (
                                                        <li>
                                                            <NavLink to="/services/HajjRequests">الطلبات المعلقه</NavLink>
                                                        </li>
                                                    )}
                                                    {canRead('BoardDirectorMeeting') && (
                                                        <li>
                                                            <NavLink to="/services/AcceptedHajj">الطلبات المقبوله</NavLink>
                                                        </li>
                                                    )}
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'contributeWithus' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('contributeWithus')}>
                                    <div className="flex items-center">
                                        <IconMenuDatatables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">ساهم معنا</span>
                                    </div>

                                    <div className={currentMenu !== 'contributeWithus' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'contributeWithus' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-400">
                                        {/* {canRead('ScientificResearch') && (
                                            <li>
                                                <NavLink to="/services/celiacCard">بطاقه سيلياكي</NavLink>
                                            </li>
                                        )} */}
                                        <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${errorSubMenu0 ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu0(!errorSubMenu0)}
                                            >
                                                العضويات
                                                <div className={`${errorSubMenu0 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu0 ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {/* {canRead('BoardDirectorMember') && ( */}
                                                    <li>
                                                        <NavLink to="/MemberShips">كل العضويات</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                    {/* {canRead('BoardDirectorMeeting') && ( */}
                                                    <li>
                                                        <NavLink to="/MembershipRequests">الطلبات المعلقة</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                                <AnimateHeight duration={300} height={currentMenu === 'contributeWithus' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-400">
                                        <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${errorSubMenu01 ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu01(!errorSubMenu01)}
                                            >
                                                الشراكات الاستراتيجية
                                                <div className={`${errorSubMenu01 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu01 ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {/* {canRead('BoardDirectorMember') && ( */}
                                                    <li>
                                                        <NavLink to="/StrategicPartnerships"> كل الشراكات الاستراتيجية</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                    {/* {canRead('BoardDirectorMeeting') && ( */}
                                                    <li>
                                                        {/* <NavLink to="/MembershipRequests">الطلبات المعلقة</NavLink> */}
                                                    </li>
                                                    {/* )} */}
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                                <AnimateHeight duration={300} height={currentMenu === 'contributeWithus' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-400">
                                        <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${errorSubMenu4 ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu4(!errorSubMenu4)}
                                            >
                                                التدريب التعاوني
                                                <div className={`${errorSubMenu4 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu4 ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {/* {canRead('BoardDirectorMember') && ( */}
                                                    <li>
                                                        <NavLink to="/cooperativeTraining">الطلبات المعلقة</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                    {/* {canRead('BoardDirectorMeeting') && ( */}
                                                    <li>
                                                        <NavLink to="/CooperativetrainingAccepted">الطلبات المقبولة</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                                <AnimateHeight duration={300} height={currentMenu === 'contributeWithus' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-400">
                                        <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${errorSubMenu6 ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#363636] font-bold hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu6(!errorSubMenu6)}
                                            >
                                                التطوع
                                                <div className={`${errorSubMenu6 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu6 ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {/* {canRead('BoardDirectorMember') && ( */}
                                                    <li>
                                                        <NavLink to="/Volunteer" className='text-normal'>طلبات التطوع</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                    {/* {canRead('BoardDirectorMeeting') && ( */}
                                                    <li>
                                                        <NavLink to="/AcceptedVolunteer">الطلبات المقبولة</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                                <AnimateHeight duration={300} height={currentMenu === 'contributeWithus' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-400">
                                        <li className="menu nav-item">
                                            <button
                                                style={{ fontWeight: 'bold' }}
                                                type="button"
                                                className={`${errorSubMenu5 ? 'open' : ''
                                                    } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#363636] font-bold hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu5(!errorSubMenu5)}
                                            >
                                                التبرع
                                                <div className={`${errorSubMenu5 ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu5 ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-400">
                                                    {/* {canRead('BoardDirectorMember') && ( */}
                                                    <li>
                                                        <NavLink to="/DonationRequests" className='text-normal'>كل التبرعات</NavLink>
                                                    </li>
                                                    {/* )} */}
                                                    {/* {canRead('BoardDirectorMeeting') && ( */}
                                                    <li>
                                                        {/* <NavLink to="/AcceptedVolunteer">الطلبات المقبولة</NavLink> */}
                                                    </li>
                                                    {/* )} */}
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
