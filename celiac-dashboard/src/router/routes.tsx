import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../components/AuthProvider';
import Error404 from '../components/Layouts/Error404';
import { usePermissions } from '../utils/permissions';
import PatientAwareness from '../pages/clinic/patientAwareness/PatientAwarenessTabs';
import PatientAwarenessTabs from '../pages/clinic/patientAwareness/PatientAwarenessTabs';
import AboutDiseaseSettings from '../pages/clinic/AboutDiseaseSettings';

import Faq from '../pages/clinic/Faq';
import ScientificResearch from '../pages/clinic/scientificResearch';
import InformationTreatment from '../pages/clinic/InformationTreatment';
import CreateReservation from '../pages/clinic/reservation/createReservation/createReservation';

import CeliacCard from '../pages/services/celiacCard/CeliacCard';
import Hiring from '../pages/services/hiring/PendingHiring';
import PendingHiring from '../pages/services/hiring/PendingHiring';
import AcceptHiring from '../pages/services/hiring/AcceptHiring';

import StrategicPartnerships from '../pages/contributeWithUs/StrategicPartnerships';

import Cooperativetraining from '../pages/contributeWithUs/cooperativetraining';
import CelaicCardOwners from '../pages/services/celiacCard/celiac-card-owners';
import Sessions from '../pages/sessions/Sessions';
import HajjRequests from '../pages/services/hajjRequests/hajjRequests';
import AcceptedHajj from '../pages/services/hajjRequests/accept-hajj';
import AcceptFoodBasket from '../pages/services/foodBasket/AcceptFoodBasket';
import PendingFoodBasket from '../pages/services/foodBasket/PendingFoodBasket';
import CooperativetrainingAccepted from '../pages/contributeWithUs/cooperativetrainingAccepted';
import Volunteer from '../pages/contributeWithUs/volunteer/volunteer';
import MemberShips from '../pages/membership/memberShips';
import MembershipRequests from '../pages/membership/membership-requests';
import AcceptedVolunteer from '../pages/contributeWithUs/volunteer/accepted-volunteer';
import DonationRequests from '../pages/contributeWithUs/donnation/donations';
import Donations from '../pages/Home/donations/Donations';
import Events from '../pages/services/Events/Events';
import CookingCourses from '../pages/services/cookingCourses/CookingCourses';
import TrainingCourses from '../pages/services/TrainingCourses/TrainingCourses';
const Index = lazy(() => import('../pages/Index'));
const AboutAssociation = lazy(() => import('../pages/aboutUs/AboutAssociation/AboutAssociation'));
const BoardDirectors = lazy(() => import('../pages/aboutUs/boardDirectors/boardDirectors'));
const BoradDirectorsFiles = lazy(() => import('../pages/aboutUs/boardDirectors/boradDirectorsFiles'));
const GeneralAssemblyFiles = lazy(() => import('../pages/aboutUs/generalAssambly/GeneralAssemblyFiles'));
const GeneralAssemblyMember = lazy(() => import('../pages/aboutUs/generalAssambly/GeneralAssemblyMember'));
const OrganizationChart = lazy(() => import('../pages/aboutUs/organizationChart/OrganizationChart'));
const ForgetPassword = lazy(() => import('../pages/login/forgetPassword'));
const LoginBoxed = lazy(() => import('../pages/login/login'));
const ResetPassword = lazy(() => import('../pages/login/resetPassword'));
const Users = lazy(() => import('../pages/users/Users'));
const Banner = lazy(() => import('../pages/Home/banner/banner'));
const ContactTabs = lazy(() => import('../pages/Home/contactInfo/ContactTabs'));
const DonationDetails = lazy(() => import('../pages/Home/donations/DonationDetails'));
const MediaCenterNews = lazy(() => import('../pages/Home/mediaCenter/MediaCenterNews'));
const MediaNewsdDetails = lazy(() => import('../pages/Home/mediaCenter/MediaNewsdDetails'));
const Partners = lazy(() => import('../pages/Home/partners/Partners'));
const CommittieMembers = lazy(() => import('../pages/aboutUs/Committees/CommittieMembers'));
const CommitteesSpecialties = lazy(() => import('../pages/aboutUs/Committees/CommmitiesSpeciality'));
const Governance = lazy(() => import('../pages/aboutUs/Governance/Governance'));
const Admins = lazy(() => import('../pages/admins/admins'));
const TranslatedBooks = lazy(() => import('../pages/clinic/TranslatedBooks'));
// const ScientificResearch = lazy(() => import('../../src/pages/clinic/ScientificResearch'));
const OTP = lazy(() => import('../pages/login/OTP'));
const Roles = lazy(() => import('../pages/Roles&Permissons/roles/Roles'));
const GuidanceManualTabs = lazy(() => import('../pages/clinic/guidanceManual/GuidanceManualTabs'));
const Inquiries = lazy(() => import('../pages/clinic/Inquiries'));

export const routes = [
    {
        path: '/',
        element: <Outlet />,
        layout: 'blank',
        children: [
            { path: '/', element: <LoginBoxed /> },
            { path: '/auth/forgetPassword', element: <ForgetPassword /> },
            { path: '/auth/otp', element: <OTP /> },
            { path: '/auth/resetPassword', element: <ResetPassword /> },
        ],
    },
    {
        path: '/home',
        element: (
            <AuthProvider>
                <Index />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/users',
        element: (
            <AuthProvider>
                <Users />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/home/banner',
        element: (
            <AuthProvider>
                <Banner />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/Roles',
        element: (
            <AuthProvider>
                <Roles />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/Volunteer',
        element: (
            <AuthProvider>
                <Volunteer />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/AcceptedVolunteer',
        element: (
            <AuthProvider>
                <AcceptedVolunteer />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/DonationRequests',
        element: (
            <AuthProvider>
                <DonationRequests />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/aboutUs/boardDirector',
        element: (
            <AuthProvider>
                <BoardDirectors />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/aboutUs/boradDirectorsFiles',
        element: (
            <AuthProvider>
                <BoradDirectorsFiles />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/MemberShips',
        element: (
            <AuthProvider>
                <MemberShips />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/MembershipRequests',
        element: (
            <AuthProvider>
                <MembershipRequests />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/aboutUs/generalAssemblyMember',
        element: (
            <AuthProvider>
                <GeneralAssemblyMember />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/aboutUs/generalAssemblyFiles',
        element: (
            <AuthProvider>
                <GeneralAssemblyFiles />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/aboutUs/organizationChart',
        element: (
            <AuthProvider>
                <OrganizationChart />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/aboutUs/aboutAssociation',
        element: (
            <AuthProvider>
                <AboutAssociation />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/aboutUs/committieMembers',
        element: (
            <AuthProvider>
                <CommittieMembers />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/aboutUs/governance/:id',
        element: (
            <AuthProvider>
                <Governance />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/home/mediaCenterNews',
        element: (
            <AuthProvider>
                <MediaCenterNews />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/home/mediaCenterNews/mediaCenterDetails',
        element: (
            <AuthProvider>
                <MediaNewsdDetails />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/home/partners',
        element: (
            <AuthProvider>
                <Partners />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/home/donations',
        element: (
            <AuthProvider>
                <Donations />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/home/contact',
        element: (
            <AuthProvider>
                <ContactTabs />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/home/donations/donationDetails',
        element: (
            <AuthProvider>
                <DonationDetails />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/aboutUs/committeesSpecialties',
        element: (
            <AuthProvider>
                <CommitteesSpecialties />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/admins',
        element: (
            <AuthProvider>
                <Admins />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/clinic/scientificResearch',
        element: (
            <AuthProvider>
                <ScientificResearch />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/clinic/translatedBooks',
        element: (
            <AuthProvider>
                <TranslatedBooks />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/clinic/guidanceManual',
        element: (
            <AuthProvider>
                <GuidanceManualTabs />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/clinic/Inquiries',
        element: (
            <AuthProvider>
                <Inquiries />
            </AuthProvider>
        ),
        layout: 'default',
    },

    {
        path: '/clinic/patientAwareness',
        element: (
            <AuthProvider>
                <PatientAwarenessTabs />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/clinic/aboutDiseaseSettings',
        element: (
            <AuthProvider>
                <AboutDiseaseSettings />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/clinic/informationTreatment',
        element: (
            <AuthProvider>
                <InformationTreatment />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/clinic/faq',
        element: (
            <AuthProvider>
                <Faq />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/clinic/reservation',
        element: (
            <AuthProvider>
                <CreateReservation />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {

        path: '/StrategicPartnerships',
        element: (
            <AuthProvider>
                <StrategicPartnerships />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/celiacCard',
        element: (
            <AuthProvider>
                <CeliacCard />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/pendingHiring',
        element: (
            <AuthProvider>
                <PendingHiring />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/acceptHiring',
        element: (
            <AuthProvider>
                <AcceptHiring />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/CelaicCardOwners',
        element: (
            <AuthProvider>
                <CelaicCardOwners />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/HajjRequests',
        element: (
            <AuthProvider>
                <HajjRequests />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/cooperativeTraining',
        element: (
            <AuthProvider>
                <Cooperativetraining />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/CooperativetrainingAccepted',
        element: (
            <AuthProvider>
                <CooperativetrainingAccepted />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/AcceptedHajj',
        element: (
            <AuthProvider>
                <AcceptedHajj />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/acceptFoodBasket',
        element: (
            <AuthProvider>
                <AcceptFoodBasket />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/pendingFoodBasket',
        element: (
            <AuthProvider>
                <PendingFoodBasket />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/sessions',
        element: (
            <AuthProvider>
                <Sessions />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/events',
        element: (
            <AuthProvider>
                <Events />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/cooking',
        element: (
            <AuthProvider>
                <CookingCourses />
            </AuthProvider>
        ),
        layout: 'default',
    },
    {
        path: '/services/training',
        element: (
            <AuthProvider>
                <TrainingCourses />
            </AuthProvider>
        ),
        layout: 'default',
    },

    {
        path: '*',
        element: <Error404 />,
    },
];
