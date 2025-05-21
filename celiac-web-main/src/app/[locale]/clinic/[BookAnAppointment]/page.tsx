import { Button, Group, Stepper } from "@mantine/core";
import BookStepper from "./_components/bookStepper";

const BookAnAppointment = ({ params }: { params: { BookAnAppointment: string } }) => {
  return (
    <div className="container">
      <BookStepper BookAnAppointment={params.BookAnAppointment} />
    </div>
  );
};

export default BookAnAppointment;
