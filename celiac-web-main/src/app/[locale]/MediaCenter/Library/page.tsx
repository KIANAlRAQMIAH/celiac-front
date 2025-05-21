import Breadcrumb from "@/components/Breadcrumb";
import LibraryPdfComponent from "./_components/pdfComponent";

function Library() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "المركز الاعلامي", link: "/ar/MediaCenter" },
        { title: "المكتبة", link: "/ar/MediaCenter/Library" },
    ];
    return (
        <div className="bg-[#F7F8FA] pb-[40px]">
            <div className="container" >
                <Breadcrumb items={breadcrumbData} />
                <div className="pb-5 grid md:grid-cols-2 grid-cols-1 gap-4">
                    <LibraryPdfComponent
                        // key={index}
                        title='الكتاب الاول فى علوم مرض السلياك وطرق الوقاية والعلاج للمصابين.pdf'
                        disc='كتاب  ينتج عن رد فعل جهاز المناعة في الجسم تجاه بروتين الغلوتين الموجود في الأطعمة المصنوعة'
                        writerName='محمد بن على'
                        publicationDate='22 مايو, 2023'
                        url='/ar/MediaCenter/Library'
                    />
                    <LibraryPdfComponent
                        // key={index}
                        title='الكتاب الاول فى علوم مرض السلياك وطرق الوقاية والعلاج للمصابين.pdf'
                        disc='كتاب  ينتج عن رد فعل جهاز المناعة في الجسم تجاه بروتين الغلوتين الموجود في الأطعمة المصنوعة'
                        writerName='محمد بن على'
                        publicationDate='22 مايو, 2023'
                        url='/ar/MediaCenter/Library'
                    />
                    <LibraryPdfComponent
                        // key={index}
                        title='الكتاب الاول فى علوم مرض السلياك وطرق الوقاية والعلاج للمصابين.pdf'
                        disc='كتاب  ينتج عن رد فعل جهاز المناعة في الجسم تجاه بروتين الغلوتين الموجود في الأطعمة المصنوعة'
                        writerName='محمد بن على'
                        publicationDate='22 مايو, 2023'
                        url='/ar/MediaCenter/Library'
                    />
                    <LibraryPdfComponent
                        // key={index}
                        title='الكتاب الاول فى علوم مرض السلياك وطرق الوقاية والعلاج للمصابين.pdf'
                        disc='كتاب  ينتج عن رد فعل جهاز المناعة في الجسم تجاه بروتين الغلوتين الموجود في الأطعمة المصنوعة'
                        writerName='محمد بن على'
                        publicationDate='22 مايو, 2023'
                        url='/ar/MediaCenter/Library'
                    />
                    <LibraryPdfComponent
                        // key={index}
                        title='الكتاب الاول فى علوم مرض السلياك وطرق الوقاية والعلاج للمصابين.pdf'
                        disc='كتاب  ينتج عن رد فعل جهاز المناعة في الجسم تجاه بروتين الغلوتين الموجود في الأطعمة المصنوعة'
                        writerName='محمد بن على'
                        publicationDate='22 مايو, 2023'
                        url='/ar/MediaCenter/Library'
                    />
                    <LibraryPdfComponent
                        // key={index}
                        title='الكتاب الاول فى علوم مرض السلياك وطرق الوقاية والعلاج للمصابين.pdf'
                        disc='كتاب  ينتج عن رد فعل جهاز المناعة في الجسم تجاه بروتين الغلوتين الموجود في الأطعمة المصنوعة'
                        writerName='محمد بن على'
                        publicationDate='22 مايو, 2023'
                        url='/ar/MediaCenter/Library'
                    />
                    <LibraryPdfComponent
                        // key={index}
                        title='الكتاب الاول فى علوم مرض السلياك وطرق الوقاية والعلاج للمصابين.pdf'
                        disc='كتاب  ينتج عن رد فعل جهاز المناعة في الجسم تجاه بروتين الغلوتين الموجود في الأطعمة المصنوعة'
                        writerName='محمد بن على'
                        publicationDate='22 مايو, 2023'
                        url='/ar/MediaCenter/Library'
                    />
                </div>
            </div>
        </div>
    );
}

export default Library;
