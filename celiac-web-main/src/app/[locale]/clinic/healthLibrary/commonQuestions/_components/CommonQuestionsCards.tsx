'use client'
import { Accordion } from "@mantine/core";
interface IData {
    id: string
    created_at: string
    updated_at: string
    question: string
    answer: string
}
const CommonQuestionsCards = ({ data }: any) => {
    const items = data.map((item: any) => (
        <Accordion.Item key={item.id} value={item.question} className="border rounded-lg mt-5">
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel className="text-[#869791]">{item.answer}</Accordion.Panel>
        </Accordion.Item>
    ));
    return (
        <div className="">
            <Accordion variant="white" radius="md"  >
                {items}
            </Accordion>
        </div>
    );
}

export default CommonQuestionsCards;