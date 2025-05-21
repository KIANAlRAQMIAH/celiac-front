import axios from "axios";

const Api = axios.create({
  baseURL: "https://celiac-backend.oc.kian.work/api/v1",
});

Api.interceptors.request.use((req) => {
  //   if (localStorage.getItem("profile")) {
  //     req.headers.Authorization = `Bearer ${
  //       JSON.parse(localStorage.getItem("profile")).token
  //     }`;
  //   }
  return req;
});

export const fetchHome = () => Api.get(`/home`);
export const fetchBmi = () => Api.get(`/clinic-settings`);
export const fetchAboutDisease = () => Api.get(`/about-disease`);
export const fetchAbouttreatment = () => Api.get(`/information-about-treatment`);
export const fetchFAQ = () => Api.get(`/frequently-asked-questions`);
export const fetchPatientAwareness = () => Api.get(`/frequently-asked-questions`);
export const fetchAbout = () => Api.get(`/about`);
export const fetchBoardMembers = () => Api.get(`/members/board-of-directors`);
export const fetchBoardPdf = () => Api.get(`/files/meeting-board-of-directors`);


export const login = (formData: any) => Api.post(`/login`, formData);
export const fetchAllPost = (id: any) => Api.get(`/posts/getPost/${id}`);



export const fetchPostsBySearch = (searchQuery: any) =>
  Api.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags
    }`
  );

export const createPost = (newPost: any) => Api.post("/posts", newPost);
export const updatePost = (id: any, updatedPost: any) =>
  Api.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: any) => Api.delete(`/posts/${id}`);
export const updateLikeCount = (id: any) => Api.patch(`/posts/${id}/likeCount`);
export const comment = (value: any, id: any) =>
  Api.post(`/posts/${id}/comment`, { value: value });
