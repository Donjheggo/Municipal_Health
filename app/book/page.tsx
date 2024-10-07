import BookingForm from "@/components/book/book-form";

export default function BookPage() {
  return (
    <div className="container max-w-screen-sm mx-auto">
      <h1 className="text-2xl text-center">Booking Page</h1>
      <div className="mt-5">
        <BookingForm />
      </div>
    </div>
  );
}
