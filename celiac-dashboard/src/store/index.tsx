import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import boardApi from '../api/AboutUsSlice/BoardDirectorsSlice';
import authApi from '../api/Auth';
import AuthSlice from '../api/AuthSlice';
import aboutAssociationApi from '../api/AboutUsSlice/AboutAssociation';
import committessApi from '../api/AboutUsSlice/CommitteesSlice';
import generalAssemblyApi from '../api/AboutUsSlice/GeneralAssemblySlice';
import organiztionChartApi from '../api/AboutUsSlice/OrganizationChartSlice';
import userApi from '../api/UserSlice';
import themeConfigSlice from './themeConfigSlice';
import NewsApi from '../api/HomeSlice/MediaCenterSlice';
import PartnersApi from '../api/HomeSlice/PartnerSlice';
import contactApi from '../api/HomeSlice/ContactSlice';
import DonationApi from '../api/HomeSlice/DonationSlice';
import governanceApi from '../api/AboutUsSlice/GovernanceSlice';
import committeesSpecialtiesApi from '../api/AboutUsSlice/commitiesSpeciality';
import scientificResearchApi from '../api/ClinicSlice/scientificResearchSlice';
import TranslatedBooksApi from '../api/ClinicSlice/translatedBooksSlice';
import AdminsApi from '../api/Admins/AdminSlice';
import rolesApi from '../api/Admins/RolesSlice';
import GuidanceManualApi from '../api/ClinicSlice/GuidanceManualSlice';
import InquiriesApi from '../api/ClinicSlice/InquiriesSlice';
import PatientAwarenessApi from '../api/ClinicSlice/PatientAwarenessSlice';
import aboutDiseaseApi from '../api/ClinicSlice/AboutDiseaseSlice';
import treatmentApi from '../api/ClinicSlice/InformationTreatmentSlice';
import faqsApi from '../api/ClinicSlice/FAQSlice';
import reservationApi from '../api/ClinicSlice/reservation';
import servicesApi from '../api/serveces';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth: AuthSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [generalAssemblyApi.reducerPath]: generalAssemblyApi.reducer,
    [organiztionChartApi.reducerPath]: organiztionChartApi.reducer,
    [aboutAssociationApi.reducerPath]: aboutAssociationApi.reducer,
    [committessApi.reducerPath]: committessApi.reducer,
    [NewsApi.reducerPath]: NewsApi.reducer,
    [PartnersApi.reducerPath]: PartnersApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [DonationApi.reducerPath]: DonationApi.reducer,
    [governanceApi.reducerPath]: governanceApi.reducer,
    [committeesSpecialtiesApi.reducerPath]: committeesSpecialtiesApi.reducer,
    [scientificResearchApi.reducerPath]: scientificResearchApi.reducer,
    [TranslatedBooksApi.reducerPath]: TranslatedBooksApi.reducer,
    [GuidanceManualApi.reducerPath]: GuidanceManualApi.reducer,
    [InquiriesApi.reducerPath]: InquiriesApi.reducer,
    [AdminsApi.reducerPath]: AdminsApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [PatientAwarenessApi.reducerPath]: PatientAwarenessApi.reducer,
    [aboutDiseaseApi.reducerPath]: aboutDiseaseApi.reducer,
    [treatmentApi.reducerPath]: treatmentApi.reducer,
    [faqsApi.reducerPath]: faqsApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userApi.middleware,
            committessApi.middleware,
            boardApi.middleware,
            generalAssemblyApi.middleware,
            organiztionChartApi.middleware,
            aboutAssociationApi.middleware,
            NewsApi.middleware,
            PartnersApi.middleware,
            contactApi.middleware,
            DonationApi.middleware,
            governanceApi.middleware,
            committeesSpecialtiesApi.middleware,
            scientificResearchApi.middleware,
            TranslatedBooksApi.middleware,
            GuidanceManualApi.middleware,
            InquiriesApi.middleware,
            AdminsApi.middleware,
            rolesApi.middleware,
            PatientAwarenessApi.middleware,
            aboutDiseaseApi.middleware,
            treatmentApi.middleware,
            faqsApi.middleware,
            reservationApi.middleware,
            servicesApi.middleware
        ),
});

setupListeners(store.dispatch);
export default store;
export type IRootState = ReturnType<typeof rootReducer>;
